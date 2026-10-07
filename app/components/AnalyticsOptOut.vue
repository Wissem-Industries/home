<script setup lang="ts">
import type { PrivacyOptOutCopy } from '#shared/content'

defineProps<{ copy: PrivacyOptOutCopy }>()

// The Plausible tracker skips every event when this key is "true".
const STORAGE_KEY = 'plausible_ignore'
const ignored = ref(false)

function readFlag() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function writeFlag(value: boolean) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, 'true')
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    return
  }
}

onMounted(() => {
  ignored.value = readFlag()
})

function toggle() {
  writeFlag(!ignored.value)
  ignored.value = readFlag()
}
</script>

<template>
  <section class="space-y-4 py-8">
    <h2 class="text-lg font-medium text-highlighted">{{ copy.label }}</h2>
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <p class="text-sm leading-7 text-muted sm:text-base" aria-live="polite">
        {{ ignored ? copy.inactive : copy.active }}
      </p>
      <UButton
        :label="ignored ? copy.enable : copy.disable"
        color="neutral"
        variant="outline"
        class="min-h-11 justify-center sm:min-h-0"
        @click="toggle"
      />
    </div>
  </section>
</template>
