<script setup lang="ts">
import type { ProjectCategory } from '#shared/content'
import { PROJECT_CATEGORIES } from '#shared/content'

const { content } = usePortfolioContent()
const { canonicalUrl, siteUrl } = useSiteSeo()

usePageSeo(
  computed(() => ({
    title: content.value.pages.projects.title,
    description: content.value.pages.projects.description,
  })),
)

useBreadcrumbJsonLd(
  computed(() => [
    { name: content.value.navigation.home, item: siteUrl.value },
    { name: content.value.pages.projects.heading, item: canonicalUrl.value },
  ]),
)

type Filter = ProjectCategory | 'all'

const filter = ref<Filter>('all')

const filters = computed(() => [
  { value: 'all' as const, label: content.value.projectFilters.all },
  ...PROJECT_CATEGORIES.filter((category) =>
    content.value.projects.some((project) => project.category === category),
  ).map((category) => ({
    value: category,
    label: content.value.projectCategories[category],
  })),
])

const visible = computed(() =>
  content.value.projects.filter(
    (project) => filter.value === 'all' || project.category === filter.value,
  ),
)
</script>

<template>
  <UContainer>
    <PageHeader
      :eyebrow="content.pages.projects.eyebrow"
      :title="content.pages.projects.heading"
      :description="content.pages.projects.description"
    />

    <WAmbient as="section" :intensity="0.16" class="space-y-8 border-t border-default py-10 sm:py-14">
      <div
        role="group"
        :aria-label="content.projectFilters.label"
        class="wi-glass wi-glass--pill inline-flex max-w-full gap-1 overflow-x-auto p-1 [scrollbar-width:none]"
      >
        <UButton
          v-for="item in filters"
          :key="item.value"
          :label="item.label"
          :aria-pressed="filter === item.value"
          :color="filter === item.value ? 'primary' : 'neutral'"
          :variant="filter === item.value ? 'soft' : 'ghost'"
          size="sm"
          class="min-h-11 shrink-0 rounded-full px-3.5 sm:min-h-0 sm:px-4"
          @click="filter = item.value"
        />
      </div>

      <div class="relative isolate space-y-6">
        <GlassShapes layout="list" />
        <ProjectCard
          v-for="(project, index) in visible"
          :key="project.id"
          :project="project"
          :actions="content.projectActions"
          :reverse="index % 2 === 1"
          :eager="index === 0"
          heading-level="h2"
        />
      </div>
    </WAmbient>
  </UContainer>
</template>
