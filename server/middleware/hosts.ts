import {
  isUiHost,
  isUiPagePath,
  normalizePublicSiteUrl,
  SITE_ROUTES,
  toAbsoluteSiteUrl,
  toUiHostPath,
} from '#shared/utils/site'

// Pages of the main site, without their language prefix.
const SITE_PAGES = new Set<string>(
  SITE_ROUTES.map((route) => route.path).filter((path) => path !== '/'),
)

// The Wissem UI page lives on its own host, served by this same application: a page asked on the
// wrong host moves to the right one.
export default defineEventHandler((event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') return
  const url = getRequestURL(event)
  const path = url.pathname.replace(/\/+$/, '') || '/'
  const page = path.replace(/^\/en(?=\/|$)/, '') || '/'
  const config = useRuntimeConfig(event).public

  if (isUiHost(url.hostname)) {
    if (isUiPagePath(path)) return sendRedirect(event, toUiHostPath(path) + url.search, 301)
    if (SITE_PAGES.has(page)) {
      const target = toAbsoluteSiteUrl(path, normalizePublicSiteUrl(config.siteUrl))
      return sendRedirect(event, target + url.search, 301)
    }
    return
  }

  if (isUiPagePath(path)) {
    const target = toAbsoluteSiteUrl(toUiHostPath(path), normalizePublicSiteUrl(config.uiSiteUrl))
    return sendRedirect(event, target + url.search, 301)
  }
})
