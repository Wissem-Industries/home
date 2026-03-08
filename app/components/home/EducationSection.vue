<script setup lang="ts">
type EducationItem = {
	institution: string
	title: string
	period: string
	location?: string
	thumbnail?: string
	url?: string
	details: string[]
}

const props = defineProps<{
	title: string
	items: EducationItem[]
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
