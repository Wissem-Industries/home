<script setup lang="ts">
import { siteRoutes } from '#shared/utils/routes'

const content = useSiteContent()
const { buildBreadcrumbSchema, buildPageSchema } = useSiteSeo()
const page = computed(() => content.value.pages.projects)
const projects = computed(() => content.value.projects)
const projectActionLabels = computed(() => content.value.cv.projects.actions)
const { inViewOptions, revealInitial, revealTransition, revealVisible } = useMotionPresets()
const seoTitle = computed(() => page.value.seo?.title || page.value.title)
const seoDescription = computed(() => page.value.seo?.description || page.value.description)

useJsonLd(() => [
	buildPageSchema({
		type: 'CollectionPage',
		path: siteRoutes.projects,
		name: page.value.title,
		description: seoDescription.value
	}),
	buildBreadcrumbSchema([
		{ name: content.value.ui.navigation.home, path: siteRoutes.home },
		{ name: page.value.title, path: siteRoutes.projects }
	])
].filter(Boolean))

usePageSeo(computed(() => ({
	title: seoTitle.value,
	description: seoDescription.value
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
