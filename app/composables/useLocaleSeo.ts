// Alternate-language links and og:locale come from @nuxtjs/i18n. The canonical
// link and og:url stay with usePageSeo, so only those tags are kept.
// @nuxtjs/i18n builds them on the main site URL; on the UI host they move to that host.
export function useLocaleSeo() {
  const head = useLocaleHead({ lang: false, dir: false })
  const { onUiHost, siteUrl, uiSiteUrl } = useSiteHost()

  useHead(() => ({
    link: head.value.link
      ?.filter((link) => link.rel === 'alternate')
      .map((link) =>
        onUiHost && typeof link.href === 'string'
          ? { ...link, href: link.href.replace(siteUrl, uiSiteUrl) }
          : link,
      ),
    meta: head.value.meta?.filter(
      (meta) => meta.property === 'og:locale' || meta.property === 'og:locale:alternate',
    ),
  }))
}
