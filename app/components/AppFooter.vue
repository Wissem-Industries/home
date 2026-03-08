<script setup lang="ts">
import { getLinkTarget, isExternalLink } from '#shared/utils/links'

const content = useSiteContent()
const { footerLinks } = useContactLinks()

const footerCredits = computed(() => `© ${new Date().getFullYear()} ${content.value.ui.footer.creditsSuffix}`)
</script>

<template>
	<UFooter
		class="z-10 bg-default"
		:ui="{ left: 'text-muted text-xs' }"
	>
		<template #left>
			<span class="block text-center sm:text-left">
				{{ footerCredits }}
			</span>
		</template>

		<template #right>
			<div class="flex flex-wrap items-center justify-center gap-1 sm:justify-end">
				<UButton
					v-for="link in footerLinks"
					:key="link.id"
					size="sm"
					color="neutral"
					variant="ghost"
					:icon="link.icon"
					:to="link.to"
					:external="isExternalLink(link.to)"
					:target="getLinkTarget(link.to)"
					:aria-label="link.label"
				/>
			</div>
		</template>
	</UFooter>
</template>
