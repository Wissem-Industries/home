<script setup lang="ts">
type ProjectItem = {
	id: string
	title: string
	description: string
	image: string
	url?: string
	repo?: string
	tags: string[]
	date: string
}

defineProps<{
	title: string
	description: string
	projects: ProjectItem[]
}>()
</script>

<template>
	<UPageSection
		:title="title"
		:ui="{
			container: '!pt-0 !pb-16 !gap-6',
			title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
			description: 'text-left text-sm sm:text-base text-muted',
			links: 'justify-start'
		}"
	>
		<UCarousel
			v-slot="{ item: project }"
			:items="projects"
			loop
			:autoplay="{ delay: 4000 }"
			:ui="{
				item: 'basis-full',
				container: 'items-stretch'
			}"
			class="w-full"
		>
			<Motion
				:initial="{ opacity: 0, transform: 'translateY(10px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:in-view-options="{ once: true }"
				class="h-full p-1 "
			>
				<div class="space-y-4">
					<UBlogPost
						:title="project.title"
						:description="project.description"
						:image="project.image"
						orientation="horizontal"
						variant="outline"
						class="w-full"
					/>

					<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div class="flex flex-wrap gap-2">
							<UBadge
								v-for="tag in project.tags"
								:key="`${project.id}-${tag}`"
								:label="tag"
								color="neutral"
								variant="soft"
								size="sm"
							/>
						</div>

						<div class="flex flex-wrap items-center gap-3">
							<UButton
								v-if="project.url"
								variant="outline"
								size="sm"
								label="Voir le projet"
								trailing-icon="i-lucide-external-link"
								target="_blank"
								:to="project.url"
							/>

							<UButton
								v-if="project.repo"
								variant="ghost"
								color="neutral"
								size="sm"
								label="Code"
								icon="i-lucide-folder-git-2"
								target="_blank"
								:to="project.repo"
							/>

							<UButton
								v-if="!project.url && !project.repo"
								variant="soft"
								color="neutral"
								size="sm"
								label="Accès privé"
								icon="i-lucide-lock"
								disabled
							/>
						</div>
					</div>
				</div>
			</Motion>
		</UCarousel>
	</UPageSection>
</template>
