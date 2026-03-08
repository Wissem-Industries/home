<script setup lang="ts">
import type { ProjectActionLabelsContent, ProjectContent } from '~~/shared/content'

const { inViewOptions, reduceMotion, revealInitial, revealTransition, revealVisible } = useMotionPresets()

defineProps<{
	title: string
	description: string
	actions: ProjectActionLabelsContent
	projects: ProjectContent[]
}>()
</script>

<template>
	<UPageSection
		:title="title"
		:description="description"
	>
		<UCarousel
			v-slot="{ item: project }"
			:items="projects"
			:loop="projects.length > 1"
			:autoplay="reduceMotion ? false : { delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true }"
			:ui="{
				item: 'basis-full',
				container: 'items-stretch'
			}"
			class="w-full"
		>
			<Motion
				:initial="revealInitial"
				:while-in-view="revealVisible"
				:transition="revealTransition()"
				:in-view-options="inViewOptions"
				class="h-full p-1"
			>
				<ProjectShowcaseCard
					:project="project"
					:actions="actions"
					:eager-image="project.id === projects[0]?.id"
				/>
			</Motion>
		</UCarousel>
	</UPageSection>
</template>
