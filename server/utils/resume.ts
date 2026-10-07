import {
  buildResumeRelease,
  findResumeAsset,
  RESUME_BASE_URL,
  type ResumeKind,
  type ResumeLocale,
  type ResumeRelease,
} from './resume-release'

const CACHE_SECONDS = 15 * 60

const contentTypes: Record<ResumeKind, string> = {
  pdf: 'application/pdf',
  png: 'image/png',
  social: 'image/png',
}

export const fetchLatestRelease = defineCachedFunction(
  async (): Promise<ResumeRelease> => {
    const response = await fetch(`${RESUME_BASE_URL}/VERSION`, {
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`Resume storage returned ${response.status}`)
    const lastModified = response.headers.get('last-modified')
    const publishedAt = lastModified ? new Date(lastModified).toISOString() : ''
    return buildResumeRelease((await response.text()).trim(), publishedAt)
  },
  {
    name: 'wsm-resume-release',
    getKey: () => 'latest',
    maxAge: CACHE_SECONDS,
    staleMaxAge: 7 * 24 * 3600,
  },
)

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

    setResponseHeaders(event, {
      'content-type': contentTypes[kind],
      'content-disposition': `inline; filename="${asset.name}"`,
      'cache-control': `public, max-age=${CACHE_SECONDS}`,
      'x-wsm-cv-version': release.tag_name,
    })
    return body
  } catch (error) {
    console.error('Resume unavailable', error)
    throw createError({ statusCode: 502, statusMessage: 'Resume temporarily unavailable' })
  }
}
