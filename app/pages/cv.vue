<script setup lang="ts">
import { toAbsoluteSiteUrl } from '#shared/utils/site'

const { content, locale } = usePortfolioContent()
const { canonicalUrl, siteUrl } = useSiteSeo()
const localePath = useLocalePath()

const { data: release } = await useFetch('/api/cv', { key: 'cv-release' })

const isFrench = computed(() => locale.value === 'fr')
// Images only: the version in the query gives each release its own URL in the Cloudflare cache.
const versionQuery = computed(() => (release.value?.version ? `?v=${release.value.version}` : ''))
const pdfPath = computed(() => (isFrench.value ? '/cv.pdf' : '/en/cv.pdf'))
const previewPath = computed(
  () => `${isFrench.value ? '/cv.png' : '/en/cv.png'}${versionQuery.value}`,
)
const updated = computed(() => {
  if (!release.value?.publishedAt) return null
  return new Intl.DateTimeFormat(locale.value === 'fr' ? 'fr-FR' : 'en-GB', {
    dateStyle: 'long',
  }).format(new Date(release.value.publishedAt))
})

usePageSeo(
  computed(() => ({
    title: content.value.pages.cv.title,
    description: content.value.pages.cv.description,
    image: {
      url: `${toAbsoluteSiteUrl(
        isFrench.value ? '/cv-social.png' : '/en/cv-social.png',
        siteUrl.value,
      )}${versionQuery.value}`,
      alt: content.value.resumePage.previewAlt,
    },
  })),
)

useBreadcrumbJsonLd(
  computed(() => [
    { name: content.value.navigation.home, item: siteUrl.value },
    { name: content.value.pages.cv.heading, item: canonicalUrl.value },
  ]),
)
</script>

<template>
  <UContainer>
    <div class="grid items-center gap-12 pb-16 pt-8 sm:pb-24 sm:pt-14 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-20">
      <div class="space-y-8">
        <header class="wi-enter space-y-5">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {{ content.pages.cv.eyebrow }}
          </p>
          <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted sm:text-6xl">
            {{ content.pages.cv.heading }}
          </h1>
          <p class="max-w-xl text-base leading-7 text-muted sm:text-lg">
            {{ content.resumePage.intro }}
          </p>
        </header>

        <ul
          style="--wi-enter-step: 1"
          class="wi-enter flex flex-wrap gap-2"
        >
          <li
            v-for="item in content.resumePage.contents"
            :key="item"
            class="rounded-full border border-default px-3 py-1 font-mono text-xs text-muted"
          >
            {{ item }}
          </li>
        </ul>

        <div style="--wi-enter-step: 2" class="wi-enter flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <UButton
            :label="isFrench ? content.resumePage.downloadFr : content.resumePage.downloadEn"
            :to="pdfPath"
            external
            download
            icon="i-ri-download-line"
            size="lg"
            class="min-h-11 justify-center sm:min-h-0"
          />
          <UButton
            :label="isFrench ? content.resumePage.downloadEn : content.resumePage.downloadFr"
            :to="isFrench ? '/en/cv.pdf' : '/cv.pdf'"
            external
            download
            icon="i-ri-translate-2"
            color="neutral"
            variant="outline"
            size="lg"
            class="min-h-11 justify-center sm:min-h-0"
          />
        </div>

        <div style="--wi-enter-step: 3" class="wi-enter space-y-4 border-t border-default pt-6">
          <p class="max-w-xl text-sm leading-6 text-muted">
            {{ content.resumePage.note }}
          </p>
          <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
            <UButton
              :label="content.resumePage.contactCta"
              :to="localePath('/contact')"
              trailing-icon="i-ri-arrow-right-line"
              color="neutral"
              variant="link"
              class="px-0"
            />
            <p v-if="release?.version" class="font-mono text-xs text-muted">
              {{ content.resumePage.versionLabel }} {{ release.version }}
              <template v-if="updated"> · {{ content.resumePage.updatedLabel }} {{ updated }}</template>
            </p>
          </div>
        </div>
      </div>

      <a
        :href="pdfPath"
        style="--wi-enter-step: 2"
        class="wi-enter group relative mx-auto block w-full max-w-sm rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:max-w-none"
      >
        <span
          aria-hidden="true"
          class="absolute inset-x-6 -bottom-6 top-10 -z-10 rounded-[2rem] bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80 dark:bg-primary/25"
        />
        <img
          :src="previewPath"
          :alt="content.resumePage.previewAlt"
          width="1191"
          height="1684"
          fetchpriority="high"
          class="aspect-[1191/1684] w-full rounded-xl bg-white object-cover shadow-2xl ring-1 ring-black/10 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-0.6deg] motion-reduce:transition-none motion-reduce:group-hover:transform-none dark:ring-white/15"
        />
      </a>
    </div>
  </UContainer>
</template>
