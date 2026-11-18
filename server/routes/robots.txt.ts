import { isUiHost, normalizePublicSiteUrl, toAbsoluteSiteUrl } from '#shared/utils/site'

export default defineEventHandler((event) => {
  const { public: config } = useRuntimeConfig(event)
  const onUiHost = isUiHost(getRequestURL(event).hostname)
  const siteUrl = normalizePublicSiteUrl(onUiHost ? config.uiSiteUrl : config.siteUrl)
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /

Sitemap: ${toAbsoluteSiteUrl('/sitemap.xml', siteUrl)}
`
})
