<script setup lang="ts">
import { getLinkTarget, isExternalLink } from '#shared/utils/links'

const { content } = usePortfolioContent()
const localePath = useLocalePath()
const { canonicalUrl, siteUrl } = useSiteSeo()
const toast = useToast()
const interestIcons = [
  'i-ri-movie-2-line',
  'i-ri-gamepad-line',
  'i-ri-lifebuoy-line',
  'i-ri-plane-line',
  'i-ri-cpu-line',
]
const heroHighlight = computed(() =>
  content.value.seekingInternship ? content.value.profile.internship : content.value.profile.focus,
)
const featuredProjects = computed(() =>
  content.value.projects.filter((project) => project.featured),
)
const experience = computed(() =>
  content.value.profile.experience.map((item) => ({
    eyebrow: item.organization,
    title: item.title,
    period: item.period,
    location: item.location,
    thumbnail: item.thumbnail,
    bullets: item.bullets,
  })),
)
const education = computed(() =>
  content.value.profile.education.map((item) => ({
    eyebrow: item.institution,
    title: item.title,
    period: item.period,
    location: item.location,
    thumbnail: item.thumbnail,
    bullets: item.details,
  })),
)

function announceResumeDownload() {
  toast.add({
    title: content.value.resume.label,
    description: content.value.resume.started,
    color: 'success',
  })
}

usePageSeo(
  computed(() => ({
    title: content.value.pages.home.title,
    description: content.value.pages.home.description,
    type: 'profile' as const,
  })),
)

useJsonLd(
  'profile-page',
  computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${canonicalUrl.value}#profile-page`,
    url: canonicalUrl.value,
    name: content.value.pages.home.title,
    description: content.value.pages.home.description,
    isPartOf: { '@id': `${siteUrl.value}/#website` },
    mainEntity: { '@id': `${siteUrl.value}/#person` },
  })),
)
</script>

<template>
  <div>
    <UContainer>
      <WAmbient
        as="section"
        :intensity="0.14"
        class="grid min-h-[calc(100vh-7rem)] items-center gap-8 pb-16 lg:gap-16 lg:pb-24"
        :class="content.seekingInternship ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]' : 'justify-items-center'"
      >
        <div
          class="space-y-8"
          :class="content.seekingInternship ? '' : 'max-w-3xl text-center'"
        >
          <div class="space-y-5">
            <div
              class="wi-enter flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-green-700 dark:text-green-400"
              :class="content.seekingInternship ? '' : 'justify-center'"
            >
              <span class="relative flex size-2.5">
                <span class="availability-pulse absolute inline-flex size-full animate-ping rounded-full bg-success opacity-55" />
                <span class="relative inline-flex size-2.5 rounded-full bg-success" />
              </span>
              <span>{{ content.profile.availability }}</span>
            </div>

            <div class="space-y-4">
              <h1 style="--wi-enter-step: 1" class="wi-enter max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-highlighted sm:text-6xl lg:text-7xl">
                {{ content.profile.name }}
              </h1>
              <p style="--wi-enter-step: 2" class="wi-enter max-w-2xl text-lg font-medium leading-8 text-highlighted sm:text-xl">
                {{ content.profile.status }}
              </p>
              <p style="--wi-enter-step: 3" class="wi-enter max-w-2xl text-base leading-7 text-muted">
                {{ content.profile.description }}
              </p>
            </div>
          </div>

          <div
            style="--wi-enter-step: 4"
            class="wi-enter flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            :class="content.seekingInternship ? '' : 'justify-center'"
          >
            <UButton
              :label="content.resume.label"
              :to="content.resume.href"
              :download="content.resume.filename"
              external
              icon="i-ri-download-line"
              color="neutral"
              variant="outline"
              size="lg"
              class="min-h-11 justify-center sm:min-h-0"
              @click="announceResumeDownload"
            />
            <UButton
              :label="content.profile.contactCta"
              :to="localePath('/contact')"
              trailing-icon="i-ri-arrow-right-line"
              size="lg"
              class="min-h-11 justify-center sm:min-h-0"
            />
          </div>

          <div
            style="--wi-enter-step: 5"
            class="wi-enter flex flex-wrap items-center gap-1"
            :class="content.seekingInternship ? '' : 'justify-center'"
          >
            <UButton
              v-for="link in content.links"
              :key="link.id"
              :aria-label="link.label"
              :icon="link.icon"
              :to="link.to"
              :external="isExternalLink(link.to)"
              :target="getLinkTarget(link.to)"
              color="neutral"
              variant="ghost"
              class="size-11 justify-center p-0 sm:size-9"
            />
          </div>
        </div>

        <WGlassCard
          v-if="content.seekingInternship"
          style="--wi-enter-step: 3"
          class="wi-enter mx-auto w-full max-w-md lg:mx-0 lg:ml-auto"
          body-class="p-7 sm:p-8"
        >
            <div class="flex min-h-80 flex-col justify-between gap-9">
              <div class="flex items-start justify-between gap-6">
                <div class="flex size-16 items-center justify-center rounded-lg border border-default bg-elevated p-3">
                  <img
                    src="/images/Logo_Black.svg"
                    :alt="content.profile.avatarAlt"
                    width="40"
                    height="40"
                    class="size-10 object-contain dark:hidden"
                  >
                  <img
                    src="/images/Logo_White.svg"
                    alt=""
                    width="40"
                    height="40"
                    class="hidden size-10 object-contain dark:block"
                  >
                </div>
                <span class="font-mono text-xs text-muted">WISSEM.PRO</span>
              </div>

              <div class="space-y-5">
                <div class="space-y-2">
                  <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    {{ heroHighlight.eyebrow }}
                  </p>
                  <h2 class="text-2xl font-medium tracking-tight text-highlighted">
                    {{ heroHighlight.title }}
                  </h2>
                </div>
                <div class="divide-y divide-default border-y border-default">
                  <div
                    v-for="(detail, detailIndex) in heroHighlight.details"
                    :key="detailIndex"
                    class="grid grid-cols-[1.25rem_5rem_minmax(0,1fr)] items-center gap-3 py-3 text-sm"
                  >
                    <UIcon :name="detail.icon" class="size-4 text-primary" />
                    <span class="text-muted">{{ detail.label }}</span>
                    <span class="text-right font-medium text-highlighted">{{ detail.value }}</span>
                  </div>
                </div>
              </div>
            </div>
        </WGlassCard>
      </WAmbient>

      <section class="grid gap-8 border-t border-default py-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:py-24">
        <SectionHeading :title="content.profile.aboutTitle" eyebrow="01" />
        <div v-reveal class="space-y-5 text-lg leading-8 text-muted">
          <p v-for="(paragraph, paragraphIndex) in content.profile.about" :key="paragraphIndex">
            {{ paragraph }}
          </p>
        </div>
      </section>

      <section class="space-y-10 border-t border-default py-16 lg:py-24">
        <SectionHeading :title="content.profile.experienceTitle" eyebrow="02" />
        <TimelineList :items="experience" />
      </section>

      <section class="space-y-10 border-t border-default py-16 lg:py-24">
        <SectionHeading :title="content.profile.educationTitle" eyebrow="03" />
        <TimelineList :items="education" />
      </section>

      <section class="space-y-10 border-t border-default py-16 lg:py-24">
        <SectionHeading :title="content.profile.skillsTitle" eyebrow="04" />
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <UCard
            v-for="(group, index) in content.profile.skills"
            :key="index"
            class="motion-card h-full"
            v-reveal="index"
          >
            <div class="flex h-full flex-col gap-6">
              <div class="space-y-2">
                <h3 class="font-medium text-highlighted">{{ group.title }}</h3>
                <p class="text-sm leading-6 text-muted">{{ group.description }}</p>
              </div>
              <div class="mt-auto flex flex-wrap gap-2">
                <UBadge
                  v-for="(item, itemIndex) in group.items"
                  :key="itemIndex"
                  :label="item"
                  color="primary"
                  variant="subtle"
                  size="sm"
                />
              </div>
            </div>
          </UCard>
        </div>
      </section>

      <section class="space-y-10 border-t border-default py-16 lg:py-24">
        <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            :title="content.profile.projectsTitle"
            :description="content.profile.projectsDescription"
            eyebrow="05"
          />
          <UButton
            :label="content.profile.allProjects"
            :to="localePath('/projects')"
            color="neutral"
            variant="outline"
            trailing-icon="i-ri-arrow-right-line"
            class="min-h-11 justify-center sm:min-h-0"
          />
        </div>
        <div class="grid gap-5 lg:grid-cols-3">
          <div
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            v-reveal="index"
          >
            <ProjectCard
              :project="project"
              :actions="content.projectActions"
              :eager="index === 0"
              compact
            />
          </div>
        </div>
      </section>

      <section class="grid gap-5 border-t border-default py-16 lg:grid-cols-3 lg:py-24">
        <UCard class="motion-card h-full" v-reveal="0">
          <div class="space-y-6">
            <h2 class="text-lg font-medium text-highlighted">{{ content.profile.languagesTitle }}</h2>
            <div class="space-y-5">
              <div
                v-for="(language, languageIndex) in content.profile.languages"
                :key="languageIndex"
                class="space-y-2"
              >
                <div class="flex items-center justify-between gap-3 text-sm">
                  <span class="font-medium text-highlighted">{{ language.name }}</span>
                  <span class="text-muted">{{ language.level }}</span>
                </div>
                <UProgress :model-value="language.value" size="sm" />
              </div>
            </div>
          </div>
        </UCard>

        <UCard class="motion-card h-full" v-reveal="1">
          <div class="space-y-6">
            <h2 class="text-lg font-medium text-highlighted">{{ content.profile.interestsTitle }}</h2>
            <div class="interest-orbit" aria-hidden="true">
              <span class="interest-orbit__spin interest-orbit__spin--outer"><i /></span>
              <span class="interest-orbit__spin interest-orbit__spin--inner"><i /></span>
              <div class="interest-orbit__center">
                <UIcon name="i-ri-compass-3-line" class="interest-orbit__needle size-6 text-primary" />
              </div>
            </div>
            <ul class="interest-orbit__items">
              <li
                v-for="(interest, index) in content.profile.interests"
                :key="index"
                class="interest-orbit__item"
              >
                <span class="interest-orbit__icon">
                  <UIcon :name="interestIcons[index]" class="size-4 text-primary" />
                </span>
                <span>{{ interest }}</span>
              </li>
            </ul>
          </div>
        </UCard>

        <UCard class="motion-card h-full" v-reveal="2">
          <div class="space-y-5">
            <div class="space-y-2">
              <h2 class="text-lg font-medium text-highlighted">{{ content.profile.contactTitle }}</h2>
              <p class="text-sm leading-6 text-muted">{{ content.profile.contactDescription }}</p>
            </div>
            <ContactDetails
              :location-label="content.profile.locationLabel"
              :location="content.profile.location"
              :links="content.links.filter((link) => link.id === 'email')"
            />
            <UButton
              :label="content.profile.contactCta"
              :to="localePath('/contact')"
              trailing-icon="i-ri-arrow-right-line"
              class="min-h-11 w-full justify-center sm:min-h-0"
            />
          </div>
        </UCard>
      </section>
    </UContainer>
  </div>
</template>
