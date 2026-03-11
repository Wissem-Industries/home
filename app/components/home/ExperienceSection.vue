<script setup lang="ts">
import type { ExperienceContent } from '~~/shared/content'

const props = defineProps<{
	title: string
	items: ExperienceContent[]
}>()

const timelineItems = computed(() => props.items.map(item => ({
	eyebrow: item.organization,
	title: item.title,
	period: item.period,
	location: item.location,
	thumbnail: item.thumbnail,
	url: item.url,
	bullets: item.bullets
})))
</script>

<template>
	<HomeTimelineSection
		:title="title"
		:items="timelineItems"
	/>
</template>
