// Alternate-language links and og:locale come from @nuxtjs/i18n. The canonical
// link and og:url stay with usePageSeo, so only those tags are kept.
export function useLocaleSeo() {
  const head = useLocaleHead({ lang: false, dir: false })

  useHead(() => ({
    link: head.value.link?.filter((link) => link.rel === 'alternate'),
    meta: head.value.meta?.filter(
      (meta) => meta.property === 'og:locale' || meta.property === 'og:locale:alternate',
    ),
  }))
}
