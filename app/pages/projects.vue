<script setup lang="ts">
const content = useSiteContent()
const page = computed(() => content.value.pages.projects)
const projects = computed(() => content.value.projects)
const projectActionLabels = computed(() => content.value.cv.projects.actions)
const { inViewOptions, revealInitial, revealTransition, revealVisible } = useMotionPresets()

usePageSeo(computed(() => ({
	title: page.value.seo?.title || page.value.title,
	description: page.value.seo?.description || page.value.description
})))
</script>

<template>
	<UPage v-if="page">
		<UPageHero
			:title="page.title"
			:description="page.description"
			:ui="{
				title: '!mx-0 text-left',
				description: '!mx-0 text-left',
				container: 'pb-10 sm:pb-12'
			}"
		/>

		<UPageSection>
			<Motion
				v-for="(project, index) in projects"
				:key="project.id"
				:initial="revealInitial"
				:while-in-view="revealVisible"
				:transition="revealTransition(index)"
				:in-view-options="inViewOptions"
			>
				<ProjectShowcaseCard
					:project="project"
					:actions="projectActionLabels"
					:reverse="index % 2 === 1"
					:eager-image="index === 0"
				/>
			</Motion>
		</UPageSection>
	</UPage>
</template>
