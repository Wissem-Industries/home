import {
  DEFAULT_SITE_LOCALE,
  isUiHost,
  normalizePublicSiteUrl,
  SITE_LOCALES,
  SITE_ROUTES,
  toAbsoluteSiteUrl,
  toLocalizedPath,
} from '#shared/utils/site'

// The UI host lists its own page; the main site lists the others.
const UI_HOST_ROUTES = [{ path: '/', changefreq: 'monthly', priority: '0.5' }]

export default defineEventHandler((event) => {
  const { public: config } = useRuntimeConfig(event)
  const onUiHost = isUiHost(getRequestURL(event).hostname)
  const siteUrl = normalizePublicSiteUrl(onUiHost ? config.uiSiteUrl : config.siteUrl)
  const routes = onUiHost ? UI_HOST_ROUTES : SITE_ROUTES
  const urls = routes
    .flatMap((route) => {
      const alternates = [
        ...SITE_LOCALES.map(
          (locale) =>
            `    <xhtml:link rel="alternate" hreflang="${locale.hreflang}" href="${toAbsoluteSiteUrl(toLocalizedPath(route.path, locale.code), siteUrl)}" />`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${toAbsoluteSiteUrl(toLocalizedPath(route.path, DEFAULT_SITE_LOCALE), siteUrl)}" />`,
      ].join('\n')

      return SITE_LOCALES.map(
        (locale) => `  <url>
    <loc>${toAbsoluteSiteUrl(toLocalizedPath(route.path, locale.code), siteUrl)}</loc>
${alternates}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
      )
    })
    .join('\n')

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
})
