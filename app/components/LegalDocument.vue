<script setup lang="ts">
import type { LegalPageCopy, PageContent } from '#shared/content'

defineProps<{ page: PageContent; copy: LegalPageCopy }>()
</script>

<template>
  <UContainer>
    <header class="wi-enter max-w-3xl space-y-5 pb-12 pt-8 sm:pb-16 sm:pt-14">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {{ page.eyebrow }}
      </p>
      <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted sm:text-6xl">
        {{ page.heading }}
      </h1>
      <p class="max-w-2xl text-base leading-7 text-muted sm:text-lg">
        {{ copy.intro }}
      </p>
      <p class="font-mono text-xs text-muted">{{ copy.updatedLabel }} : {{ copy.updated }}</p>
    </header>

    <div class="max-w-3xl divide-y divide-default border-t border-default pb-16 sm:pb-24">
      <section
        v-for="section in copy.sections"
        :key="section.title"
        class="space-y-3 py-8 first:pt-10"
      >
        <h2 class="text-lg font-medium text-highlighted">{{ section.title }}</h2>
        <p
          v-for="paragraph in section.paragraphs"
          :key="paragraph"
          class="text-sm leading-7 text-muted sm:text-base"
        >
          {{ paragraph }}
        </p>
      </section>
      <slot />
    </div>
  </UContainer>
</template>
