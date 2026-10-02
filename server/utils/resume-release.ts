export type ResumeLocale = 'fr' | 'en'
export type ResumeKind = 'pdf' | 'png' | 'social'

export interface ReleaseAsset {
  name: string
  browser_download_url: string
}

export interface ResumeRelease {
  tag_name: string
  published_at: string
  assets: ReleaseAsset[]
}

export const RESUME_REPOSITORY = 'WissemBad/CV'

export function resumeAssetName(locale: ResumeLocale, kind: ResumeKind) {
  const base = `CV_Wissem_Badraoui_${locale.toUpperCase()}`
  return kind === 'social' ? `${base}_SOCIAL.png` : `${base}.${kind}`
}

export function findResumeAsset(release: ResumeRelease, locale: ResumeLocale, kind: ResumeKind) {
  const name = resumeAssetName(locale, kind)
  return release.assets.find((asset) => asset.name === name)
}
