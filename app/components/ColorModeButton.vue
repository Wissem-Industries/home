<script setup lang="ts">
const colorMode = useColorMode()
const content = useSiteContent()
const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))
const ariaLabel = computed(() => (
	colorMode.value === 'dark'
		? content.value.ui.colorMode.switchToLight
		: content.value.ui.colorMode.switchToDark
))

const switchTheme = () => {
	if (!import.meta.client) {
		colorMode.preference = nextTheme.value
		return
	}

	const overlay = document.createElement('div')
	const bodyStyles = getComputedStyle(document.body)
	const htmlStyles = getComputedStyle(document.documentElement)
	const background = bodyStyles.backgroundColor && bodyStyles.backgroundColor !== 'rgba(0, 0, 0, 0)'
		? bodyStyles.backgroundColor
		: htmlStyles.backgroundColor

	overlay.style.position = 'fixed'
	overlay.style.inset = '0'
	overlay.style.pointerEvents = 'none'
	overlay.style.zIndex = '9999'
	overlay.style.background = background
	overlay.style.opacity = '1'
	overlay.style.transition = 'opacity 180ms ease'
	document.body.appendChild(overlay)

	colorMode.preference = nextTheme.value

	requestAnimationFrame(() => {
		overlay.style.opacity = '0'
	})

	window.setTimeout(() => {
		overlay.remove()
	}, 220)
}
</script>

<template>
	<ClientOnly>
		<UButton
			:aria-label="ariaLabel"
			:icon="`i-lucide-${nextTheme === 'dark' ? 'sun' : 'moon'}`"
			color="neutral"
			variant="ghost"
			size="sm"
			class="rounded-full"
			@click="switchTheme"
		/>
		<template #fallback>
			<div class="size-4" />
		</template>
	</ClientOnly>
</template>
