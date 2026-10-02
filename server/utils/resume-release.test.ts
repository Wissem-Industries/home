import { describe, expect, test } from 'bun:test'
import { findResumeAsset, resumeAssetName } from './resume-release'

const release = {
  tag_name: 'v1.0.0',
  published_at: '2026-10-02T10:00:00Z',
  assets: [
    { name: 'CV_Wissem_Badraoui_FR.pdf', browser_download_url: 'https://example.test/fr.pdf' },
    { name: 'CV_Wissem_Badraoui_EN.png', browser_download_url: 'https://example.test/en.png' },
  ],
}

describe('resume release', () => {
  test('builds the asset names published by the CV repository', () => {
    expect(resumeAssetName('fr', 'pdf')).toBe('CV_Wissem_Badraoui_FR.pdf')
    expect(resumeAssetName('en', 'png')).toBe('CV_Wissem_Badraoui_EN.png')
    expect(resumeAssetName('fr', 'social')).toBe('CV_Wissem_Badraoui_FR_SOCIAL.png')
  })

  test('finds the matching asset', () => {
    expect(findResumeAsset(release, 'fr', 'pdf')?.browser_download_url).toBe(
      'https://example.test/fr.pdf',
    )
    expect(findResumeAsset(release, 'en', 'png')?.browser_download_url).toBe(
      'https://example.test/en.png',
    )
  })

  test('returns undefined when the release lacks the asset', () => {
    expect(findResumeAsset(release, 'en', 'pdf')).toBeUndefined()
  })
})
