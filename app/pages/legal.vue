<script setup lang="ts">
const { content } = usePortfolioContent()
const { canonicalUrl, homeUrl } = useSiteSeo()

usePageSeo(
  computed(() => ({
    title: content.value.pages.legal.title,
    description: content.value.pages.legal.description,
  })),
)

useBreadcrumbJsonLd(
  computed(() => [
    { name: content.value.navigation.home, item: homeUrl.value },
    { name: content.value.pages.legal.heading, item: canonicalUrl.value },
  ]),
)
</script>

<template>
  <LegalDocument :page="content.pages.legal" :copy="content.legal" />
</template>
