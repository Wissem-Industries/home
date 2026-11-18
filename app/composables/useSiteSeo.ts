import { normalizePublicSiteUrl, toAbsoluteSiteUrl } from '#shared/utils/site'

export function useSiteSeo() {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { content, locale } = usePortfolioContent()
  const { origin, sitePath } = useSiteHost()
  const siteUrl = computed(() => normalizePublicSiteUrl(config.public.siteUrl))
  const canonicalUrl = computed(() => toAbsoluteSiteUrl(route.path || '/', origin))
  // Home page of the main site in the page language, for the breadcrumbs.
  const homeUrl = computed(() => toAbsoluteSiteUrl(sitePath('/'), siteUrl.value))
  const socialImageUrl = computed(
    () =>
      `${toAbsoluteSiteUrl(`/images/og-${locale.value}.png`, siteUrl.value)}?v=${config.public.assetVersion}`,
  )

  return { content, locale, siteUrl, canonicalUrl, homeUrl, socialImageUrl }
}
