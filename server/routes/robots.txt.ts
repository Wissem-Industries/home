import { resolveSiteUrl } from '#shared/utils/seo'

export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event)
	const siteUrl = resolveSiteUrl(config.public.siteUrl)

	setHeader(event, 'content-type', 'text/plain; charset=utf-8')

	return `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', siteUrl).toString()}
`
})
