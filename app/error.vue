<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { content } = usePortfolioContent()
const localePath = useLocalePath()

const isNotFound = computed(() => props.error.statusCode === 404)
const title = computed(() =>
  isNotFound.value ? content.value.error.title : content.value.error.serverTitle,
)
const description = computed(() =>
  isNotFound.value ? content.value.error.description : content.value.error.serverDescription,
)

useSeoMeta({
  title,
  description,
  robots: 'noindex, nofollow',
})
</script>

<template>
  <UApp>
    <div class="flex min-h-screen items-center justify-center bg-default px-6">
      <div class="max-w-lg space-y-6 text-center">
        <p class="font-mono text-sm text-primary">{{ error.statusCode }}</p>
        <h1 class="text-4xl font-semibold tracking-tight text-highlighted">
          {{ title }}
        </h1>
        <p class="leading-7 text-muted">{{ description }}</p>
        <UButton
          :label="content.error.home"
          :to="localePath('/')"
          icon="i-ri-arrow-left-line"
          size="lg"
        />
      </div>
    </div>
  </UApp>
</template>
