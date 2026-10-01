export const SITE_LOCALES = [
  { code: 'fr', hreflang: 'fr-FR' },
  { code: 'en', hreflang: 'en-GB' },
] as const

export const DEFAULT_SITE_LOCALE = 'fr'

export const SITE_ROUTES = [
  { key: 'home', path: '/', icon: 'i-ri-home-4-line', changefreq: 'weekly', priority: '1.0' },
  {
    key: 'projects',
    path: '/projects',
    icon: 'i-ri-folder-line',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    key: 'contact',
    path: '/contact',
    icon: 'i-ri-chat-1-line',
    changefreq: 'monthly',
    priority: '0.7',
  },
] as const

export function normalizePublicSiteUrl(value?: string | null) {
  const candidate = (value || 'https://www.wissem.pro').trim()
  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`

  try {
    const url = new URL(withProtocol)
    return ['http:', 'https:'].includes(url.protocol)
      ? url.toString().replace(/\/+$/, '')
      : 'https://www.wissem.pro'
  } catch {
    return 'https://www.wissem.pro'
  }
}

export function toAbsoluteSiteUrl(path: string, siteUrl: string) {
  return new URL(path, normalizePublicSiteUrl(siteUrl)).toString()
}

// The default locale has no prefix: `/projects` in French, `/en/projects` in English.
export function toLocalizedPath(path: string, locale: string) {
  if (locale === DEFAULT_SITE_LOCALE) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}
