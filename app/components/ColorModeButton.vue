<script setup lang="ts">
const colorMode = useColorMode()
const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

const switchTheme = () => {
	colorMode.preference = nextTheme.value
}

const startViewTransition = () => {
	if (!document.startViewTransition) {
		switchTheme()
		return
	}

	const transition = document.startViewTransition(() => {
		switchTheme()
	})

	transition.ready.then(() => {
		const duration = 250
		document.documentElement.animate(
			[{ opacity: 0 }, { opacity: 1 }],
			{ duration, easing: 'ease', pseudoElement: '::view-transition-new(root)' }
		)
		document.documentElement.animate(
			[{ opacity: 1 }, { opacity: 0 }],
			{ duration, easing: 'ease', pseudoElement: '::view-transition-old(root)' }
		)
	})
}
</script>

<template>
	<ClientOnly>
		<UButton
			:aria-label="`Switch to ${nextTheme} mode`"
			:icon="`i-lucide-${nextTheme === 'dark' ? 'sun' : 'moon'}`"
			color="neutral"
			variant="ghost"
			size="sm"
			class="rounded-full"
			@click="startViewTransition"
		/>
		<template #fallback>
			<div class="size-4" />
		</template>
	</ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
  opacity: 0;
}
::view-transition-old(root) {
  z-index: 1;
  opacity: 1;
}
</style>
