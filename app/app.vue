<script setup lang="ts">
import { isExternalLink } from '#shared/utils/links'

const colorMode = useColorMode()
const { content, locale, siteUrl } = useSiteSeo()
const themeCookie = useCookie<'light' | 'dark' | undefined>('site_theme')
const themeColor = computed(() => (colorMode.value === 'dark' ? '#0a0a0a' : '#fafafa'))
const sameAs = computed(() =>
  content.value.links
    .map((link) => link.to)
    .filter((link) => isExternalLink(link) && link !== siteUrl.value),
)

useHead(() => ({
  titleTemplate: content.value.meta.titleTemplate,
  htmlAttrs: {
    lang: locale.value,
    class:
      themeCookie.value === 'light' || themeCookie.value === 'dark' ? themeCookie.value : undefined,
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: themeColor.value },
    { name: 'color-scheme', content: 'light dark' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
    { rel: 'icon', type: 'image/svg+xml', href: '/images/Logo_Violet.svg' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    ...sameAs.value.map((href) => ({ rel: 'me' as const, href })),
  ],
}))

useSeoMeta({
  applicationName: () => content.value.meta.applicationName,
  description: () => content.value.meta.defaultDescription,
  ogSiteName: () => content.value.meta.applicationName,
  ogLocale: () => (locale.value === 'fr' ? 'fr_FR' : 'en_GB'),
})

useJsonLd(
  'site-entities',
  computed(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl.value}/#website`,
        url: siteUrl.value,
        name: content.value.meta.applicationName,
        description: content.value.meta.defaultDescription,
        inLanguage: locale.value,
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl.value}/#person`,
        name: 'Wissem Badraoui',
        alternateName: 'Wissem',
        url: siteUrl.value,
        description: content.value.meta.personDescription,
        sameAs: sameAs.value,
      },
    ],
  })),
)
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
