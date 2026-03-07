<script setup lang="ts">
const { footer } = useAppConfig()
const { data: cv } = await useCvContent()

const footerLinks = computed(() => cv.value?.contact.links || [])
</script>

<template>
	<UFooter
		class="z-10 bg-default"
		:ui="{ left: 'text-muted text-xs' }"
	>
		<template #left>
			{{ footer.credits }}
		</template>

		<template #right>
			<UButton
				v-for="link in footerLinks"
				:key="link.to"
				size="sm"
				color="neutral"
				variant="ghost"
				:icon="link.icon"
				:to="link.to"
				:target="link.to.startsWith('http') ? '_blank' : undefined"
				:aria-label="link.label"
			/>
		</template>
	</UFooter>
</template>
