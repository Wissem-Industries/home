<script setup lang="ts">
import type { Project } from '#shared/content'
import { getLinkTarget, isExternalLink } from '#shared/utils/links'
import { formatProjectYear } from '#shared/utils/project-period'

const STATUS_DOTS = {
  live: 'bg-green-500',
  ongoing: 'bg-primary',
  finished: 'bg-neutral-400',
  archived: 'bg-neutral-300 dark:bg-neutral-600',
} as const

defineProps<{
  project: Project
  actions: { view: string; repo: string; private: string }
  reverse?: boolean
  compact?: boolean
  eager?: boolean
}>()

const { content } = usePortfolioContent()
</script>

<template>
  <UCard
    class="motion-card group h-full overflow-hidden"
    :ui="{ body: 'p-0 sm:p-0' }"
  >
    <article
      class="grid h-full"
      :class="compact ? 'grid-rows-[12rem_1fr]' : 'lg:grid-cols-2'"
    >
      <div
        class="relative min-h-48 overflow-hidden bg-muted"
        :class="!compact && reverse ? 'lg:order-2' : undefined"
      >
        <NuxtPicture
          :src="project.image"
          :alt="project.title"
          :sizes="compact ? 'sm:100vw lg:384px' : 'sm:100vw lg:560px'"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          width="960"
          height="600"
          :img-attrs="{
            class:
              'project-media size-full object-cover',
          }"
        />
        <span
          class="absolute left-3 top-3 rounded-full border border-white/15 bg-neutral-950/70 px-2.5 py-1 font-mono text-xs text-white backdrop-blur"
        >
          {{ formatProjectYear(project.period) }}
        </span>
      </div>

      <div class="flex min-w-0 flex-col p-5 sm:p-6 lg:p-8">
        <div class="space-y-3">
          <p class="flex items-center gap-2 font-mono text-xs text-muted">
            <span class="size-1.5 rounded-full" :class="STATUS_DOTS[project.status]" />
            {{ content.projectStatuses[project.status] }}
          </p>
          <h3 class="text-xl font-semibold tracking-tight text-highlighted">
            {{ project.title }}
          </h3>
          <p class="text-sm leading-6 text-muted">
            {{ project.description }}
          </p>
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
          <UBadge
            v-for="tag in project.tags"
            :key="`${project.id}-${tag}`"
            :label="tag"
            color="neutral"
            variant="soft"
            size="sm"
          />
        </div>

        <div class="mt-auto flex flex-wrap gap-2 pt-6">
          <UButton
            v-if="project.links.site"
            :label="actions.view"
            :to="project.links.site"
            :external="isExternalLink(project.links.site)"
            :target="getLinkTarget(project.links.site)"
            trailing-icon="i-ri-external-link-line"
            size="sm"
            class="min-h-11 sm:min-h-0"
          />
          <UButton
            v-if="project.links.code"
            :label="actions.repo"
            :to="project.links.code"
            :external="isExternalLink(project.links.code)"
            :target="getLinkTarget(project.links.code)"
            icon="i-ri-github-line"
            color="neutral"
            variant="outline"
            size="sm"
            class="min-h-11 sm:min-h-0"
          />
          <UButton
            v-if="!project.links.site && !project.links.code"
            :label="actions.private"
            icon="i-ri-lock-line"
            color="neutral"
            variant="soft"
            size="sm"
            disabled
            class="min-h-11 sm:min-h-0"
          />
        </div>
      </div>
    </article>
  </UCard>
</template>
