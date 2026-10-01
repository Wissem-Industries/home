<script setup lang="ts">
interface TimelineEntry {
  eyebrow: string
  title: string
  period: string
  location?: string
  thumbnail?: string
  bullets: string[]
}

defineProps<{ items: TimelineEntry[] }>()
</script>

<template>
  <div class="divide-y divide-default border-y border-default">
    <article
      v-for="(item, index) in items"
      :key="index"
      class="grid gap-6 py-9 lg:grid-cols-[11rem_minmax(0,1fr)_12rem] lg:items-start lg:gap-8"
      v-reveal="index"
    >
      <div class="flex items-start justify-between gap-4 lg:block">
        <div
          v-if="item.thumbnail"
          class="flex h-20 w-32 shrink-0 items-center justify-center p-2 lg:h-24 lg:w-44 lg:p-3"
        >
          <NuxtImg
            :src="item.thumbnail"
            :alt="item.eyebrow"
            width="176"
            height="88"
            format="webp"
            fit="inside"
            loading="lazy"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div class="space-y-2 text-right text-xs text-muted lg:hidden">
          <p class="flex items-center justify-end gap-2">
            <UIcon name="i-ri-calendar-line" class="size-4 text-primary" />
            <span>{{ item.period }}</span>
          </p>
          <p v-if="item.location" class="flex items-center justify-end gap-2">
            <UIcon name="i-ri-map-pin-line" class="size-4 text-primary" />
            <span>{{ item.location }}</span>
          </p>
        </div>
      </div>

      <div class="max-w-3xl space-y-4">
        <div class="space-y-2">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            {{ item.eyebrow }}
          </p>
          <h3 class="text-lg font-medium text-highlighted">
            {{ item.title }}
          </h3>
        </div>

        <ul class="space-y-2 text-sm leading-6 text-muted">
          <li v-for="bullet in item.bullets" :key="bullet" class="flex gap-3">
            <span class="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </div>

      <div class="hidden space-y-3 border-l border-default pl-6 text-xs text-muted lg:block">
        <div class="space-y-3">
          <p class="flex items-center justify-end gap-2">
            <UIcon name="i-ri-calendar-line" class="size-4 text-primary" />
            <span>{{ item.period }}</span>
          </p>
          <p v-if="item.location" class="flex items-center justify-end gap-2">
            <UIcon name="i-ri-map-pin-line" class="size-4 text-primary" />
            <span>{{ item.location }}</span>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>
