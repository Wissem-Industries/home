<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  eyebrow?: string
}>()
</script>

<template>
  <div v-reveal class="max-w-2xl space-y-3">
    <p v-if="eyebrow" class="font-mono text-xs uppercase tracking-[0.2em] text-primary">
      {{ eyebrow }}
    </p>
    <h2 class="text-2xl font-semibold tracking-tight text-highlighted sm:text-3xl">
      {{ title }}
    </h2>
    <p v-if="description" class="text-sm leading-7 text-muted sm:text-base">
      {{ description }}
    </p>
  </div>
</template>
