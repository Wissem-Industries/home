<script setup lang="ts">
import type { EducationContent } from '~~/shared/content'

const props = defineProps<{
	title: string
	items: EducationContent[]
}>()

const timelineItems = computed(() => props.items.map(item => ({
	eyebrow: item.institution,
	title: item.title,
	period: item.period,
	location: item.location,
	thumbnail: item.thumbnail,
	url: item.url,
	bullets: item.details
})))
</script>

<template>
	<HomeTimelineSection
		:title="title"
		:items="timelineItems"
	/>
</template>
