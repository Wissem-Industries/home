import {
  RESUME_BASE_URL,
  type ResumeKind,
  type ResumeLocale,
  resumeAssetName,
} from '../../shared/utils/resume'

export { RESUME_BASE_URL, type ResumeKind, type ResumeLocale, resumeAssetName }

export interface ReleaseAsset {
  name: string
  browser_download_url: string
}

export interface ResumeRelease {
  tag_name: string
  published_at: string
  assets: ReleaseAsset[]
}

const RESUME_VARIANTS: [ResumeLocale, ResumeKind][] = [
  ['fr', 'pdf'],
  ['en', 'pdf'],
  ['fr', 'png'],
  ['en', 'png'],
  ['fr', 'social'],
  ['en', 'social'],
]

export function findResumeAsset(release: ResumeRelease, locale: ResumeLocale, kind: ResumeKind) {
  const name = resumeAssetName(locale, kind)
  return release.assets.find((asset) => asset.name === name)
}

export function buildResumeRelease(
  tag: string,
  publishedAt: string,
  baseUrl = RESUME_BASE_URL,
): ResumeRelease {
  if (!/^v\d+\.\d+\.\d+$/.test(tag)) throw new Error(`Unexpected resume version: ${tag}`)
  return {
    tag_name: tag,
    published_at: publishedAt,
    assets: RESUME_VARIANTS.map(([locale, kind]) => {
      const name = resumeAssetName(locale, kind)
      return { name, browser_download_url: `${baseUrl}/${tag}/${name}` }
    }),
  }
}

// Reads the latest release on every call. The last valid release is only a fallback when a read fails.
export function createLatestReleaseReader(
  read: () => Promise<ResumeRelease>,
  warn: (message: string, error: unknown) => void = console.warn,
) {
  let lastKnown: ResumeRelease | undefined
  return async (): Promise<ResumeRelease> => {
    try {
      lastKnown = await read()
      return lastKnown
    } catch (error) {
      if (!lastKnown) throw error
      warn(`Resume version unreadable, serving ${lastKnown.tag_name}`, error)
      return lastKnown
    }
  }
}
