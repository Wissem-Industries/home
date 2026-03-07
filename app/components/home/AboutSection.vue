<script setup lang="ts">
defineProps<{
	title: string
	paragraphs: string[]
}>()
</script>

<template>
	<UPageSection
		:title="title"
		:ui="{
			container: '!pt-0',
			title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
			description: 'text-left mt-3 text-sm sm:text-md lg:text-sm text-muted'
		}"
	>
		<template #description>
			<div class="space-y-4">
				<p
					v-for="paragraph in paragraphs"
					:key="paragraph"
					class="text-sm sm:text-base text-muted"
				>
					{{ paragraph }}
				</p>
			</div>
		</template>
	</UPageSection>
</template>
