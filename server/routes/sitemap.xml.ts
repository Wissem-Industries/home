import {
  DEFAULT_SITE_LOCALE,
  isUiHost,
  normalizePublicSiteUrl,
  SITE_LOCALES,
  SITE_ROUTES,
  toAbsoluteSiteUrl,
  toLocalizedPath,
} from '#shared/utils/site'
import { fetchLatestRelease } from '../utils/resume'

// The UI host lists its own page; the main site lists the others.
const UI_HOST_ROUTES = [{ key: 'ui', path: '/', changefreq: 'monthly', priority: '0.5' }]

// The resume page changes with each resume release as well as with the site.
async function resumeDay() {
  try {
    return (await fetchLatestRelease()).published_at.slice(0, 10) || undefined
  } catch {
    return undefined
  }
}

export default defineEventHandler(async (event) => {
  const { public: config } = useRuntimeConfig(event)
  const onUiHost = isUiHost(getRequestURL(event).hostname)
  const siteUrl = normalizePublicSiteUrl(onUiHost ? config.uiSiteUrl : config.siteUrl)
  const routes = onUiHost ? UI_HOST_ROUTES : SITE_ROUTES
  const builtAt = config.builtAt as string
  const resumeUpdated = onUiHost ? undefined : await resumeDay()

  const urls = routes
    .flatMap((route) => {
      const lastmod =
        route.key === 'cv' && resumeUpdated && resumeUpdated > builtAt ? resumeUpdated : builtAt
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
    <lastmod>${lastmod}</lastmod>
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
