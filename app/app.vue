<script setup lang="ts">
const colorMode = useColorMode()
const locale = useSiteLocale()
const { buildPersonSchema, buildWebsiteSchema, defaultImageUrl, ogLocale, ogLocaleAlternates, siteMeta, siteSeo } = useSiteSeo()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useJsonLd(() => [
	buildWebsiteSchema(),
	buildPersonSchema()
], 'global-schema')

useHead(() => ({
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ key: 'theme-color', name: 'theme-color', content: color.value },
		{ key: 'content-language', httpEquiv: 'content-language', content: locale.value },
		{ key: 'language', name: 'language', content: locale.value }
	],
	link: [
		{ rel: 'icon', href: '/images/Logo_Black.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
		{ rel: 'icon', href: '/images/Logo_White.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
		{ rel: 'icon', href: '/favicon.ico', sizes: 'any' },
		{ rel: 'shortcut icon', href: '/favicon.ico' },
		{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
		{ rel: 'mask-icon', href: '/images/Logo_Black.svg', color: '#000000' },
		{ rel: 'manifest', href: '/site.webmanifest' }
	],
	htmlAttrs: {
		lang: locale.value
	}
}))

useSeoMeta({
	titleTemplate: () => siteMeta.value.titleTemplate,
	applicationName: () => siteMeta.value.applicationName,
	ogSiteName: () => siteMeta.value.ogSiteName,
	ogLocale: () => ogLocale.value,
	ogLocaleAlternate: () => ogLocaleAlternates.value,
	description: () => siteSeo.value.defaultDescription,
	ogDescription: () => siteSeo.value.defaultDescription,
	ogImage: () => defaultImageUrl.value,
	ogImageAlt: () => siteSeo.value.defaultImageAlt,
	twitterImage: () => defaultImageUrl.value,
	twitterImageAlt: () => siteSeo.value.defaultImageAlt,
	twitterCard: 'summary_large_image'
})
</script>

<template>
	<UApp>
		<NuxtLayout>
			<UMain class="relative">
				<NuxtPage />
			</UMain>
		</NuxtLayout>
	</UApp>
</template>
