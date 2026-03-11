import { resolveSiteUrl } from '#shared/utils/seo'
import { staticSiteRoutes } from '#shared/utils/routes'

export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event)
	const siteUrl = resolveSiteUrl(config.public.siteUrl)
	const lastModified = new Date().toISOString()
	const urls = staticSiteRoutes.map(route => `
  <url>
    <loc>${new URL(route, siteUrl).toString()}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`).join('')

	setHeader(event, 'content-type', 'application/xml; charset=utf-8')

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`
})
