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
const lead = computed(() => visible.value.find((project) => project.featured))
const others = computed(() => visible.value.filter((project) => project !== lead.value))
</script>

<template>
  <UContainer>
    <header
      class="wi-enter max-w-3xl space-y-5 pb-10 pt-8 sm:pb-14 sm:pt-14"
    >
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {{ content.pages.projects.eyebrow }}
      </p>
      <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted sm:text-6xl">
        {{ content.pages.projects.heading }}
      </h1>
      <p class="max-w-2xl text-base leading-7 text-muted sm:text-lg">
        {{ content.pages.projects.description }}
      </p>
    </header>

    <section class="space-y-8 border-t border-default py-10 sm:py-14">
      <div
        role="group"
        :aria-label="content.projectFilters.label"
        class="flex flex-wrap gap-2"
      >
        <UButton
          v-for="item in filters"
          :key="item.value"
          :label="item.label"
          :aria-pressed="filter === item.value"
          color="neutral"
          :variant="filter === item.value ? 'solid' : 'outline'"
          size="sm"
          class="min-h-11 rounded-full px-4 sm:min-h-0"
          @click="filter = item.value"
        />
      </div>

      <div class="space-y-6">
        <ProjectCard
          v-if="lead"
          :key="lead.id"
          :project="lead"
          :actions="content.projectActions"
          eager
        />
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in others"
            :key="project.id"
            :project="project"
            :actions="content.projectActions"
            compact
          />
        </div>
      </div>
    </section>
  </UContainer>
</template>
