import { describe, expect, test } from 'bun:test'
import { canonicalPagePath, toLocalizedPath } from './site'

describe('toLocalizedPath', () => {
  test('leaves the default locale unprefixed', () => {
    expect(toLocalizedPath('/', 'fr')).toBe('/')
    expect(toLocalizedPath('/projects', 'fr')).toBe('/projects')
  })

  test('prefixes the other locales', () => {
    expect(toLocalizedPath('/', 'en')).toBe('/en')
    expect(toLocalizedPath('/projects', 'en')).toBe('/en/projects')
  })
})

describe('canonicalPagePath', () => {
  test('drops the trailing slash and the capitals of a page', () => {
    expect(canonicalPagePath('/projects/')).toBe('/projects')
    expect(canonicalPagePath('/Projects')).toBe('/projects')
    expect(canonicalPagePath('/en/')).toBe('/en')
    expect(canonicalPagePath('/EN/CV/')).toBe('/en/cv')
  })

  test('leaves canonical addresses and other paths alone', () => {
    expect(canonicalPagePath('/')).toBeUndefined()
    expect(canonicalPagePath('/projects')).toBeUndefined()
    expect(canonicalPagePath('/_nuxt/Entry.js')).toBeUndefined()
    expect(canonicalPagePath('/unknown/')).toBeUndefined()
  })
})
