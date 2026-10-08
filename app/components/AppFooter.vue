<script setup lang="ts">
import { getLinkTarget, isExternalLink } from '#shared/utils/links'

const { content } = usePortfolioContent()
const localePath = useLocalePath()
const legalLinks = computed(() => [
  { to: localePath('/legal'), label: content.value.footerLinks.legal },
  { to: localePath('/privacy'), label: content.value.footerLinks.privacy },
])
const credits = computed(() => `© ${new Date().getFullYear()} ${content.value.footer}`)
</script>

<template>
  <UContainer>
    <footer
      class="flex flex-col items-center justify-between gap-4 border-t border-default py-6 sm:flex-row"
    >
      <div class="flex flex-col items-center gap-x-5 gap-y-1 sm:flex-row">
        <p class="text-center text-xs text-muted sm:text-left">
          {{ credits }}
        </p>
        <div class="flex items-center gap-5 text-xs">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.to"
            :to="link.to"
            class="inline-flex min-h-11 items-center text-muted underline-offset-4 transition-colors hover:text-highlighted hover:underline sm:min-h-0"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>

      <div class="flex items-center gap-1">
        <UButton
          v-for="link in content.links"
          :key="link.id"
          :aria-label="link.label"
          :icon="link.icon"
          :to="link.to"
          :external="isExternalLink(link.to)"
          :target="getLinkTarget(link.to)"
          color="neutral"
          variant="ghost"
          size="sm"
          class="size-11 justify-center rounded-full p-0 text-muted hover:bg-primary/10 hover:text-primary sm:size-9"
        />
      </div>
    </footer>
  </UContainer>
</template>
