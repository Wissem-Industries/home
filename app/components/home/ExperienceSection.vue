<script setup lang="ts">
type ExperienceItem = {
	title: string
	organization: string
	period: string
	location?: string
	thumbnail?: string
	url?: string
	bullets: string[]
}

const props = defineProps<{
	title: string
	items: ExperienceItem[]
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
