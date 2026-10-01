import {
  DEFAULT_SITE_LOCALE,
  normalizePublicSiteUrl,
  SITE_LOCALES,
  SITE_ROUTES,
  toAbsoluteSiteUrl,
  toLocalizedPath,
} from '#shared/utils/site'

export default defineEventHandler((event) => {
  const siteUrl = normalizePublicSiteUrl(useRuntimeConfig(event).public.siteUrl)
  const urls = SITE_ROUTES.flatMap((route) => {
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
  }).join('\n')

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
})
