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
	<div class="fixed inset-x-0 top-2 z-20 flex justify-center px-3 sm:top-4 sm:px-4">
		<UNavigationMenu
			:items="navigationItems"
			variant="link"
			color="neutral"
			class="max-w-full rounded-full border border-muted/50 bg-muted/40 px-1.5 shadow-lg shadow-neutral-950/5 backdrop-blur-sm sm:px-4"
			:ui="{
				list: 'gap-0.5 sm:gap-1',
				link: 'px-2.5 py-1.5 text-xs sm:px-3 sm:py-1 sm:text-sm',
				linkLeadingIcon: 'size-4 shrink-0 sm:hidden',
				linkLabel: 'hidden sm:inline'
			}"
		>
			<template #list-trailing>
				<div class="pl-0.5 sm:pl-1">
					<ColorModeButton />
				</div>
			</template>
		</UNavigationMenu>
	</div>
</template>
