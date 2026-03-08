<script setup lang="ts">
import { computed } from 'vue'
import { getLinkTarget, isExternalLink } from '~/utils/links'
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
			container: 'h-full items-stretch gap-5 sm:gap-6',
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

			<div class="mt-3 flex flex-wrap items-center gap-3">
				<UButton
					v-if="project.url"
					variant="outline"
					size="sm"
					:label="actions.view"
					trailing-icon="i-lucide-external-link"
					:to="project.url"
					:external="isExternalLink(project.url)"
					:target="getLinkTarget(project.url)"
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
				/>

				<UButton
					v-if="!project.url && !project.repo"
					variant="soft"
					color="neutral"
					size="sm"
					:label="actions.private"
					icon="i-lucide-lock"
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
			width="720"
			height="450"
			class="h-48 w-full rounded-xl object-cover sm:h-full sm:min-h-[220px] sm:max-w-[320px]"
		>
	</UPageCard>
</template>
