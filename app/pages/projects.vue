<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
})

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />
          <UButton
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ new Date(project.date).getFullYear() }}
            </span>
          </template>

          <template #footer>
            <div class="flex flex-wrap items-center mb-2">
              <UBadge
                v-for="tag in project.tags"
                :key="tag"
                :label="tag"
                class="mr-2"
                color="neutral"
                variant="soft"
                size="sm"
              />
            </div>

            <div class="flex flex-wrap items-center gap-3 mt-2">
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
                variant="soft"
                color="neutral"
                size="sm"
                label="Accéder au code"
                icon="i-lucide-folder-git-2"
                :to="project.repo"
              />

              <UButton
                v-if="!project.url && !project.repo"
                variant="soft"
                color="error"
                size="sm"
                label="Non disponible"
                icon="i-lucide-lock"
                disabled
              />
            </div>
          </template>

          <img
            :src="project.image"
            :alt="project.title"
            class="object-cover w-full h-48 rounded-lg"
          >
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
