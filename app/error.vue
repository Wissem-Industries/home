<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { content, locale } = usePortfolioContent()
const localePath = useLocalePath()
const route = useRoute()

const kind = computed(() => wiStatusKind(props.error.statusCode))
const homeTo = computed(() => localePath('/'))

const copy = computed(() => {
  if (kind.value === 'not-found') {
    return { title: content.value.error.title, description: content.value.error.description }
  }
  if (kind.value === 'server-error') {
    return {
      title: content.value.error.serverTitle,
      description: content.value.error.serverDescription,
    }
  }
  return { title: undefined, description: undefined }
})

// The error page replaces app.vue, which declares the language for every other page.
useHead({ htmlAttrs: { lang: locale } })

useSeoMeta({
  title: () => copy.value.title ?? String(props.error.statusCode),
  description: () => copy.value.description,
  robots: 'noindex, nofollow',
})

function goHome(event: MouseEvent) {
  event.preventDefault()
  clearError({ redirect: homeTo.value })
}
</script>

<template>
  <UApp>
    <WStatusPage
      :kind="kind"
      :code="error.statusCode"
      :title="copy.title"
      :description="copy.description"
      :detail="kind === 'not-found' ? route.path : undefined"
      :home-to="homeTo"
      @home="goHome"
    />
  </UApp>
</template>
