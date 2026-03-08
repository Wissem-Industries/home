<script setup lang="ts">
const content = useSiteContent()

const navigationItems = computed(() => {
	const navigation = content.value.ui.navigation

	return [{
		label: navigation.home,
		icon: 'i-lucide-home',
		to: '/'
	}, {
		label: navigation.projects,
		icon: 'i-lucide-folder',
		to: '/projects'
	}, {
		label: navigation.contact,
		icon: 'i-lucide-message-square',
		to: '/contact'
	}]
})
</script>

<template>
	<div class="fixed inset-x-0 top-3 z-20 flex justify-center px-4 sm:top-4">
		<UNavigationMenu
			:items="navigationItems"
			variant="link"
			color="neutral"
			class="max-w-max rounded-full border border-muted/50 bg-muted/40 px-2 shadow-lg shadow-neutral-950/5 backdrop-blur-sm sm:px-4"
			:ui="{ link: 'px-3 py-1', linkLeadingIcon: 'hidden' }"
		>
			<template #list-trailing>
				<ColorModeButton />
			</template>
		</UNavigationMenu>
	</div>
</template>
