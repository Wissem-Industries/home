<script setup lang="ts">
const colorMode = useColorMode()
const locale = useSiteLocale()
const content = useSiteContent()
const siteMeta = computed(() => content.value.ui.meta)
const ogLocaleBySiteLocale = {
	en: 'en_US',
	fr: 'fr_FR'
} as const

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead(() => ({
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ key: 'theme-color', name: 'theme-color', content: color.value },
		{ key: 'content-language', httpEquiv: 'content-language', content: locale.value },
		{ key: 'language', name: 'language', content: locale.value }
	],
	link: [
		{ rel: 'icon', href: '/favicon.ico' }
	],
	htmlAttrs: {
		lang: locale.value
	}
}))

useSeoMeta({
	titleTemplate: () => siteMeta.value.titleTemplate,
	applicationName: () => siteMeta.value.applicationName,
	ogSiteName: () => siteMeta.value.ogSiteName,
	ogLocale: () => ogLocaleBySiteLocale[locale.value as keyof typeof ogLocaleBySiteLocale] || ogLocaleBySiteLocale.en,
	description: () => content.value.pages.home.seo?.description || content.value.pages.home.description,
	ogDescription: () => content.value.pages.home.seo?.description || content.value.pages.home.description,
	twitterCard: 'summary'
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
