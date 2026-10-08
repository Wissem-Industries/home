<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <WAmbient as="header" :intensity="0.3" class="wi-enter pb-14 pt-8 sm:pb-20 sm:pt-14">
    <GlassShapes layout="page" />
    <div class="max-w-3xl space-y-5">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {{ eyebrow }}
      </p>
      <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted sm:text-6xl">
        {{ title }}
      </h1>
      <p class="max-w-2xl text-base leading-7 text-muted sm:text-lg">
        {{ description }}
      </p>
    </div>
  </WAmbient>
</template>
