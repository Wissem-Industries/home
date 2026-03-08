import { computed, toValue, type MaybeRefOrGetter } from 'vue'

type PageSeoInput = {
	title: string
	description: string
}

export function usePageSeo(input: MaybeRefOrGetter<PageSeoInput>) {
	const route = useRoute()
	const config = useRuntimeConfig()

	const resolvedInput = computed(() => toValue(input))
	const canonicalUrl = computed(() => {
		const siteUrl = config.public.siteUrl?.trim()
		if (!siteUrl) return undefined
		return new URL(route.path || '/', siteUrl).toString()
	})

	useSeoMeta({
		title: () => resolvedInput.value.title,
		ogTitle: () => resolvedInput.value.title,
		description: () => resolvedInput.value.description,
		ogDescription: () => resolvedInput.value.description,
		ogUrl: () => canonicalUrl.value
	})

	useHead({
		link: () => canonicalUrl.value
			? [{ rel: 'canonical', href: canonicalUrl.value }]
			: []
	})
}
