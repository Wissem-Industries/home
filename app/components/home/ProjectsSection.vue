<script setup lang="ts">
import type { ProjectActionLabelsContent, ProjectContent } from '~~/shared/content'
import { siteRoutes } from '#shared/utils/routes'

const { inViewOptions, reduceMotion, revealInitial, revealTransition, revealVisible } = useMotionPresets()

defineProps<{
	title: string
	description: string
	linkLabel: string
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
			:autoplay="reduceMotion ? false : {
				delay: 4500,
				playOnInit: true,
				stopOnInteraction: false,
				stopOnMouseEnter: true
			}"
			:ui="{
				item: 'basis-full',
				container: 'items-stretch'
			}"
			class="w-full"
			dots
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

		<div class="mt-0 flex justify-start">
			<UButton
				:to="siteRoutes.projects"
				variant="ghost"
				color="neutral"
				trailing-icon="i-lucide-arrow-right"
			>
				{{ linkLabel }}
			</UButton>
		</div>
	</UPageSection>
</template>
