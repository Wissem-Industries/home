<script setup lang="ts">
// Sharp violet shapes for a glass surface to refract: a blur needs edges to show.
// The hero gets the full composition; elsewhere a single accent is enough.
type Layout = 'hero' | 'page' | 'feature' | 'about' | 'grid' | 'card'

const props = withDefaults(defineProps<{ layout?: Layout }>(), { layout: 'card' })

const disc = 'rounded-full bg-linear-to-br from-violet-400 to-violet-700'
const dot = 'rounded-full bg-violet-300 dark:bg-violet-400'
const bar = 'rounded-full bg-linear-to-r from-purple-500 to-indigo-600'
const lens = 'wi-glass wi-glass--clear rounded-full'

const layouts: Record<Layout, string[]> = {
  hero: [
    `${disc} -right-10 -top-36 size-32 sm:-right-32 sm:-top-24 sm:size-64`,
    `${dot} wsm-float--late -bottom-6 -left-20 hidden size-28 sm:block`,
    `${bar} wsm-float--slow -left-16 top-4 hidden h-10 w-48 rotate-[24deg] sm:block`,
    // Glass lenses over the shapes, drifting at another pace.
    `${lens} wsm-float--slow -right-2 -top-24 size-20 sm:-right-16 sm:top-6 sm:size-40`,
    `${lens} wsm-float--late -left-24 top-12 hidden h-14 w-40 -rotate-[10deg] sm:block`,
    `${lens} bottom-4 -left-16 hidden size-16 sm:block`,
  ],
  page: [
    `${disc} -right-6 -top-4 size-24 lg:right-[4%] lg:top-6 lg:size-52`,
    `${bar} wsm-float--slow right-[26%] top-16 hidden h-9 w-40 -rotate-[20deg] lg:block`,
    `${lens} wsm-float--slow right-2 top-10 size-14 lg:right-[13%] lg:top-28 lg:size-32`,
    `${lens} wsm-float--late right-[30%] top-24 hidden h-12 w-32 rotate-[8deg] lg:block`,
  ],
  feature: [
    `${disc} -right-6 -top-10 size-64 sm:size-72`,
    `${dot} wsm-float--late -bottom-8 -left-8 size-32 sm:size-36`,
    `${bar} wsm-float--slow left-[-12%] top-[38%] h-14 w-60 -rotate-[24deg]`,
  ],
  about: [`${disc} -bottom-10 -right-6 size-40`, `${dot} wsm-float--late -left-5 -top-5 size-14`],
  grid: [
    `${disc} -top-16 right-[24%] hidden size-40 xl:block`,
    `${dot} wsm-float--late -bottom-6 -left-6 size-16`,
  ],
  card: [`${disc} -right-6 -top-8 size-36`, `${dot} wsm-float--late -bottom-5 -left-5 size-12`],
}

const shapes = computed(() => layouts[props.layout])
</script>

<template>
  <div class="wsm-shapes pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
    <span v-for="(shape, index) in shapes" :key="index" class="wsm-float absolute" :class="shape" />
  </div>
</template>
