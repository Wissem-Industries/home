import {
  buildResumeRelease,
  createLatestReleaseReader,
  findResumeAsset,
  RESUME_BASE_URL,
  type ResumeKind,
  type ResumeLocale,
  type ResumeRelease,
} from './resume-release'

const CACHE_SECONDS = 15 * 60

// Counted on the server: works without JavaScript, through content blockers and for direct links.
function trackDownload(
  event: Parameters<typeof setResponseHeader>[0],
  locale: ResumeLocale,
  version: string,
) {
  const { apiHost, domain } = useRuntimeConfig(event).public.plausible as {
    apiHost?: string
    domain?: string
  }
  if (!apiHost || !domain) return
  const ip =
    getRequestHeader(event, 'cf-connecting-ip') ?? getRequestIP(event, { xForwardedFor: true })
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'user-agent': getRequestHeader(event, 'user-agent') ?? 'unknown',
  }
  if (ip) headers['x-forwarded-for'] = ip
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true })
  const tracking = fetch(`${apiHost.replace(/\/$/, '')}/api/event`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: 'CV download',
      domain,
      url: url.href,
      referrer: getRequestHeader(event, 'referer') ?? null,
      props: { langue: locale, version },
    }),
    signal: AbortSignal.timeout(5000),
  }).catch((error) => console.warn('Resume download not tracked', error))
  event.waitUntil?.(tracking)
}

const contentTypes: Record<ResumeKind, string> = {
  pdf: 'application/pdf',
  png: 'image/png',
  social: 'image/png',
}

async function readLatestRelease(): Promise<ResumeRelease> {
  const response = await fetch(`${RESUME_BASE_URL}/VERSION`, {
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) throw new Error(`Resume storage returned ${response.status}`)
  const lastModified = response.headers.get('last-modified')
  const modified = lastModified ? new Date(lastModified) : undefined
  const publishedAt = modified && !Number.isNaN(modified.getTime()) ? modified.toISOString() : ''
  return buildResumeRelease((await response.text()).trim(), publishedAt)
}

export const fetchLatestRelease = createLatestReleaseReader(readLatestRelease)

// The download URL contains the release tag: a new release never serves the previous file.
const fetchAsset = defineCachedFunction(
  async (url: string): Promise<string> => {
    const response = await fetch(url, { signal: AbortSignal.timeout(20_000) })
    if (!response.ok) throw new Error(`Asset download returned ${response.status}`)
    return Buffer.from(await response.arrayBuffer()).toString('base64')
  },
  { name: 'wsm-resume-asset', getKey: (url) => url, maxAge: 30 * 24 * 3600 },
)

export async function serveResume(
  event: Parameters<typeof setResponseHeader>[0],
  locale: ResumeLocale,
  kind: ResumeKind,
) {
  try {
    const release = await fetchLatestRelease()
    const asset = findResumeAsset(release, locale, kind)
    if (!asset) throw new Error('Asset missing from the latest release')
    const body = Buffer.from(await fetchAsset(asset.browser_download_url), 'base64')

    // The PDF must reach this server on every download to be counted, so no shared cache keeps it.
    if (kind === 'pdf' && getMethod(event) === 'GET') trackDownload(event, locale, release.tag_name)
    setResponseHeaders(event, {
      'content-type': contentTypes[kind],
      'content-disposition': `inline; filename="${asset.name}"`,
      'cache-control': kind === 'pdf' ? 'private, no-cache' : `public, max-age=${CACHE_SECONDS}`,
      'x-wsm-cv-version': release.tag_name,
    })
    return body
  } catch (error) {
    console.error('Resume unavailable', error)
    throw createError({ statusCode: 502, statusMessage: 'Resume temporarily unavailable' })
  }
}
