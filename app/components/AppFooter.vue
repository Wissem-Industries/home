<script setup lang="ts">
import { getLinkTarget, isExternalLink } from '~/utils/links'

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
			{{ footerCredits }}
		</template>

		<template #right>
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
		</template>
	</UFooter>
</template>
