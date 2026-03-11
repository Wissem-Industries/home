import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { resolveAbsoluteUrl } from '#shared/utils/seo'

type PageSeoInput = {
	title: string
	description: string
	image?: string
	imageAlt?: string
	type?: 'website' | 'profile'
	robots?: string
}

export function usePageSeo(input: MaybeRefOrGetter<PageSeoInput>) {
	const { canonicalUrl, formatTitle, siteSeo, siteUrl } = useSiteSeo()

	const resolvedInput = computed(() => toValue(input))
	const resolvedTitle = computed(() => formatTitle(resolvedInput.value.title))
	const resolvedImage = computed(() => resolveAbsoluteUrl(siteUrl.value, resolvedInput.value.image || siteSeo.value.defaultImage))
	const resolvedImageAlt = computed(() => resolvedInput.value.imageAlt || siteSeo.value.defaultImageAlt)

	useSeoMeta({
		title: () => resolvedInput.value.title,
		ogTitle: () => resolvedTitle.value,
		twitterTitle: () => resolvedTitle.value,
		description: () => resolvedInput.value.description,
		ogDescription: () => resolvedInput.value.description,
		twitterDescription: () => resolvedInput.value.description,
		robots: () => resolvedInput.value.robots || 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
		ogUrl: () => canonicalUrl.value,
		ogType: () => resolvedInput.value.type || 'website',
		ogImage: () => resolvedImage.value,
		ogImageAlt: () => resolvedImageAlt.value,
		twitterImage: () => resolvedImage.value,
		twitterImageAlt: () => resolvedImageAlt.value,
		twitterCard: () => resolvedImage.value ? 'summary_large_image' : 'summary'
	})

	useHead({
		link: () => [{ rel: 'canonical', href: canonicalUrl.value }]
	})
}
