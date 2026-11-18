<script setup lang="ts">
const { content } = usePortfolioContent()
const { canonicalUrl, homeUrl } = useSiteSeo()

usePageSeo(
  computed(() => ({
    title: content.value.pages.privacy.title,
    description: content.value.pages.privacy.description,
  })),
)

useBreadcrumbJsonLd(
  computed(() => [
    { name: content.value.navigation.home, item: homeUrl.value },
    { name: content.value.pages.privacy.heading, item: canonicalUrl.value },
  ]),
)
</script>

<template>
  <LegalDocument :page="content.pages.privacy" :copy="content.privacy" />
</template>
