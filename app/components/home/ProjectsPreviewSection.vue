<script setup lang="ts">
type ProjectItem = {
	id: string
	title: string
	description: string
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
		:description="description"
		:links="[{ label: 'Voir tous les projets', to: '/projects', color: 'neutral', variant: 'subtle', trailingIcon: 'i-lucide-arrow-right' }]"
		:ui="{
			container: '!pt-0',
			title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
			description: 'text-left mt-2 text-sm sm:text-base text-muted',
			links: 'justify-start'
		}"
	>
		<UPageGrid>
			<Motion
				v-for="(project, index) in projects"
				:key="project.id"
				:initial="{ opacity: 0, transform: 'translateY(20px)' }"
				:while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
				:transition="{ delay: 0.1 * index }"
				:in-view-options="{ once: true }"
			>
				<UCard :ui="{ body: 'p-6 sm:p-7 space-y-4' }">
					<div class="space-y-1">
						<p class="text-xs uppercase tracking-wide text-muted">
							{{ new Date(project.date).getFullYear() }}
						</p>
						<h3 class="text-base font-medium text-highlighted">
							{{ project.title }}
						</h3>
						<p class="text-sm text-muted">
							{{ project.description }}
						</p>
					</div>

					<div class="flex flex-wrap gap-2">
						<UBadge
							v-for="tag in project.tags"
							:key="tag"
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
							variant="outline"
							color="neutral"
							size="sm"
							label="Accéder au code"
							icon="i-lucide-folder-git-2"
							target="_blank"
							:to="project.repo"
						/>
					</div>
				</UCard>
			</Motion>
		</UPageGrid>
	</UPageSection>
</template>
