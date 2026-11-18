export type ResumeLocale = 'fr' | 'en'
export type ResumeKind = 'pdf' | 'png' | 'social'

// Public bucket filled by the CV repository pipeline: `VERSION` holds the latest tag, `<tag>/` the files of that version.
export const RESUME_BASE_URL = 'https://cdn.wissem.pro/wissem-cv'

export function resumeAssetName(locale: ResumeLocale, kind: ResumeKind) {
  const base = `CV_Wissem_Badraoui_${locale.toUpperCase()}`
  return kind === 'social' ? `${base}_SOCIAL.png` : `${base}.${kind}`
}
