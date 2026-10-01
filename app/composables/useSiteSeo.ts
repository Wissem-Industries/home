import { normalizePublicSiteUrl, toAbsoluteSiteUrl } from '#shared/utils/site'

export function useSiteSeo() {
  const config = useRuntimeConfig()
  const route = useRoute()
  const { content, locale } = usePortfolioContent()
  const siteUrl = computed(() => normalizePublicSiteUrl(config.public.siteUrl))
  const canonicalUrl = computed(() => toAbsoluteSiteUrl(route.path || '/', siteUrl.value))
  const socialImageUrl = computed(() =>
    toAbsoluteSiteUrl(`/images/og-${locale.value}.png`, siteUrl.value),
  )

  return { content, locale, siteUrl, canonicalUrl, socialImageUrl }
}
