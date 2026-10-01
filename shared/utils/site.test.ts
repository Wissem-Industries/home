import { describe, expect, test } from 'bun:test'
import { toLocalizedPath } from './site'

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
