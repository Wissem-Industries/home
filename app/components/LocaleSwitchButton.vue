<script setup lang="ts">
const locale = useSiteLocale()
const content = useSiteContent()

const nextLocale = computed(() => locale.value === 'fr' ? 'en' : 'fr')
const currentIcon = computed(() => locale.value === 'fr' ? 'i-circle-flags-fr' : 'i-circle-flags-gb')
const ariaLabel = computed(() => (
	locale.value === 'fr'
		? content.value.ui.localeSwitcher.switchToEnglish
		: content.value.ui.localeSwitcher.switchToFrench
))

function switchLocale() {
	locale.value = nextLocale.value
}
</script>

<template>
	<ClientOnly>
		<UButton
			:aria-label="ariaLabel"
			:icon="currentIcon"
			color="neutral"
			variant="ghost"
			size="sm"
			class="rounded-full"
			@click="switchLocale"
		/>
		<template #fallback>
			<div class="size-4" />
		</template>
	</ClientOnly>
</template>
