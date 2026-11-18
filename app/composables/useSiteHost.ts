import {
  isUiHost,
  normalizePublicSiteUrl,
  toAbsoluteSiteUrl,
  toLocalizedPath,
} from '#shared/utils/site'

/** Which host serves the page: the main site or the Wissem UI host. */
export function useSiteHost() {
  const config = useRuntimeConfig()
  const localePath = useLocalePath()
  const { locale } = useI18n()
  const onUiHost = isUiHost(useRequestURL().hostname)
  const siteUrl = normalizePublicSiteUrl(config.public.siteUrl)
  const uiSiteUrl = normalizePublicSiteUrl(config.public.uiSiteUrl)

  /**
   * Link to a page of the main site. The UI host has no route for those pages, so the link is
   * built from the language there instead of the router.
   */
  function sitePath(path: string) {
    if (!onUiHost) return localePath(path)
    return toAbsoluteSiteUrl(toLocalizedPath(path, locale.value), siteUrl)
  }

  return { onUiHost, siteUrl, uiSiteUrl, origin: onUiHost ? uiSiteUrl : siteUrl, sitePath }
}
