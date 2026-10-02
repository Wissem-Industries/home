import type { SeoContent } from '#shared/content'

export function usePageSeo(
  input: MaybeRefOrGetter<
    SeoContent & { type?: 'website' | 'profile'; image?: { url: string; alt: string } }
  >,
) {
  const { canonicalUrl, content, socialImageUrl } = useSiteSeo()
  const page = computed(() => toValue(input))
  const imageUrl = computed(() => page.value.image?.url ?? socialImageUrl.value)
  const imageAlt = computed(() => page.value.image?.alt ?? content.value.meta.socialImageAlt)

  useSeoMeta({
    title: () => page.value.title,
    description: () => page.value.description,
    author: 'Wissem Badraoui',
    robots: 'index, follow, max-image-preview:large',
    ogTitle: () => page.value.title,
    ogDescription: () => page.value.description,
    ogUrl: () => canonicalUrl.value,
    ogType: () => page.value.type || 'website',
    ogImage: () => imageUrl.value,
    ogImageAlt: () => imageAlt.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/png',
    twitterTitle: () => page.value.title,
    twitterDescription: () => page.value.description,
    twitterCard: 'summary_large_image',
    twitterImage: () => imageUrl.value,
    twitterImageAlt: () => imageAlt.value,
  })

  useHead({
    link: [{ rel: 'canonical', href: () => canonicalUrl.value }],
  })
}
