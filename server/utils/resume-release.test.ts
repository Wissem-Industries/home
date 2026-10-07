import { describe, expect, test } from 'bun:test'
import {
  buildResumeRelease,
  createLatestReleaseReader,
  findResumeAsset,
  resumeAssetName,
} from './resume-release'

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

  test('builds the versioned release from the stored version', () => {
    const built = buildResumeRelease('v1.2.0', '2026-10-02T10:00:00Z', 'https://cdn.test/cv')
    expect(built.tag_name).toBe('v1.2.0')
    expect(built.assets).toHaveLength(6)
    expect(findResumeAsset(built, 'en', 'social')?.browser_download_url).toBe(
      'https://cdn.test/cv/v1.2.0/CV_Wissem_Badraoui_EN_SOCIAL.png',
    )
  })

  test('rejects an unexpected stored version', () => {
    expect(() => buildResumeRelease('<html>', '')).toThrow()
  })
})

describe('latest release reader', () => {
  const v1 = buildResumeRelease('v1.0.0', '')
  const v2 = buildResumeRelease('v1.1.0', '')

  test('reads the version on every call', async () => {
    const versions = [v1, v2]
    let calls = 0
    const read = createLatestReleaseReader(async () => versions[calls++] as ResumeRelease)
    expect((await read()).tag_name).toBe('v1.0.0')
    expect((await read()).tag_name).toBe('v1.1.0')
    expect(calls).toBe(2)
  })

  test('falls back to the last known release when a read fails', async () => {
    let fail = false
    const warnings: string[] = []
    const read = createLatestReleaseReader(
      async () => {
        if (fail) throw new Error('storage down')
        return v1
      },
      (message) => warnings.push(message),
    )
    await read()
    fail = true
    expect((await read()).tag_name).toBe('v1.0.0')
    expect(warnings).toHaveLength(1)
  })

  test('throws when a read fails and no release is known', async () => {
    const read = createLatestReleaseReader(
      async () => {
        throw new Error('storage down')
      },
      () => {},
    )
    await expect(read()).rejects.toThrow('storage down')
  })
})
