<script setup lang="ts">
defineProps<{
	title: string
	paragraphs: string[]
}>()
</script>

<template>
	<UPageSection :title="title">
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
