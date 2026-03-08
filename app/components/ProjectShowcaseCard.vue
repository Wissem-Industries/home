<script setup lang="ts">
import { computed } from 'vue'
import { getLinkTarget, isExternalLink } from '#shared/utils/links'
import type { ProjectActionLabelsContent, ProjectContent } from '~~/shared/content'

const props = withDefaults(defineProps<{
	project: ProjectContent
	actions: ProjectActionLabelsContent
	reverse?: boolean
	eagerImage?: boolean
}>(), {
	reverse: false,
	eagerImage: false
})

const projectYear = computed(() => props.project.date.split('-')[0] || props.project.date)
</script>

<template>
	<UPageCard
		:title="project.title"
		:description="project.description"
		orientation="horizontal"
		variant="outline"
		:reverse="reverse"
		:ui="{
			root: 'h-full rounded-2xl',
			container: 'h-full items-stretch gap-4 sm:gap-6',
			wrapper: 'max-sm:order-last',
			footer: 'pt-4'
		}"
	>
		<template #leading>
			<span class="text-sm text-muted">
				{{ projectYear }}
			</span>
		</template>

		<template #footer>
			<div class="flex flex-wrap items-center gap-2">
				<UBadge
					v-for="tag in project.tags"
					:key="`${project.id}-${tag}`"
					:label="tag"
					color="neutral"
					variant="soft"
					size="sm"
				/>
			</div>

			<div class="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
				<UButton
					v-if="project.url"
					variant="outline"
					size="sm"
					:label="actions.view"
					trailing-icon="i-lucide-external-link"
					:to="project.url"
					:external="isExternalLink(project.url)"
					:target="getLinkTarget(project.url)"
					class="w-full justify-center sm:w-auto"
				/>

				<UButton
					v-if="project.repo"
					variant="outline"
					color="neutral"
					size="sm"
					:label="actions.repo"
					icon="i-lucide-folder-git-2"
					:to="project.repo"
					:external="isExternalLink(project.repo)"
					:target="getLinkTarget(project.repo)"
					class="w-full justify-center sm:w-auto"
				/>

				<UButton
					v-if="!project.url && !project.repo"
					variant="soft"
					color="neutral"
					size="sm"
					:label="actions.private"
					icon="i-lucide-lock"
					class="w-full justify-center sm:w-auto"
					disabled
				/>
			</div>
		</template>

		<img
			:src="project.image"
			:alt="project.title"
			:loading="eagerImage ? 'eager' : 'lazy'"
			:fetchpriority="eagerImage ? 'high' : 'auto'"
			decoding="async"
			referrerpolicy="no-referrer"
			class="h-44 w-full rounded-xl object-cover sm:h-56"
		>
	</UPageCard>
</template>
