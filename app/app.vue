<script setup lang="ts">
const colorMode = useColorMode()
const locale = useSiteLocale()
const content = useSiteContent()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ key: 'theme-color', name: 'theme-color', content: color }
	],
	link: [
		{ rel: 'icon', href: '/favicon.ico' }
	],
	htmlAttrs: {
		lang: locale.value
	}
})

useSeoMeta({
	titleTemplate: '%s • Wissem.',
	applicationName: 'Wissem.',
	ogSiteName: 'Wissem.',
	ogLocale: () => locale.value === 'fr' ? 'fr_FR' : undefined,
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
