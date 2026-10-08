<script setup lang="ts">
import type { LegalPageCopy, PageContent } from '#shared/content'

defineProps<{ page: PageContent; copy: LegalPageCopy }>()
</script>

<template>
  <UContainer>
    <PageHeader
      :eyebrow="page.eyebrow"
      :title="page.heading"
      :description="copy.intro"
      :shapes="false"
    >
      <p class="font-mono text-xs text-muted">{{ copy.updatedLabel }} : {{ copy.updated }}</p>
    </PageHeader>

    <WAmbient :intensity="0.16" class="border-t border-default pb-16 pt-10 sm:pb-24">
      <WGlassCard :halo="false" class="max-w-3xl" body-class="divide-y divide-default px-6 py-2 sm:px-9">
        <section
          v-for="section in copy.sections"
          :key="section.title"
          class="space-y-3 py-7"
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
      </WGlassCard>
    </WAmbient>
  </UContainer>
</template>
