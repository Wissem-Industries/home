<script setup lang="ts">
const { content } = usePortfolioContent()
const { sitePath } = useSiteHost()
const { canonicalUrl, homeUrl } = useSiteSeo()
const toast = useToast()

const copy = computed(() => content.value.uiShowcase)
const REPO = 'https://github.com/Wissem-Industries/ui'
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
const STATUSES = ['primary', 'success', 'info', 'warning', 'error', 'neutral'] as const

const NPMRC = `@wissem-industries:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}`
const CONFIG = `export default defineNuxtConfig({
  extends: ['@wissem-industries/ui'],
})`

const view = ref('list')
const form = reactive({
  name: '',
  topic: undefined as string | undefined,
  notify: true,
  agree: false,
})

function sendSample() {
  toast.add({ title: copy.value.forms.submit, description: copy.value.forms.submitted })
}

usePageSeo(
  computed(() => ({
    title: content.value.pages.ui.title,
    description: content.value.pages.ui.description,
  })),
)

useBreadcrumbJsonLd(
  computed(() => [
    { name: content.value.navigation.home, item: homeUrl.value },
    { name: content.value.pages.ui.heading, item: canonicalUrl.value },
  ]),
)
</script>

<template>
  <UContainer>
    <PageHeader
      :eyebrow="content.pages.ui.eyebrow"
      :title="content.pages.ui.heading"
      :description="content.pages.ui.description"
    >
      <div class="flex flex-wrap items-center gap-2 pt-2">
        <UButton
          :label="copy.repo"
          :to="REPO"
          external
          target="_blank"
          icon="i-ri-github-line"
          color="neutral"
          variant="outline"
          class="min-h-11 sm:min-h-0"
        />
        <UBadge
          v-for="fact in copy.facts"
          :key="fact"
          :label="fact"
          color="primary"
          variant="subtle"
        />
      </div>
    </PageHeader>

    <section class="space-y-8 border-t border-default py-14 lg:py-20">
      <SectionHeading
        :title="copy.sections.colors.title"
        :description="copy.sections.colors.description"
        eyebrow="01"
      />
      <div v-reveal class="space-y-6">
        <div class="space-y-3">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-muted">{{ copy.colors.brand }}</p>
          <ul class="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
            <li v-for="shade in SHADES" :key="shade" class="space-y-1.5">
              <span
                class="block h-14 rounded-lg ring-1 ring-inset ring-black/5 dark:ring-white/10"
                :style="{ background: `var(--color-wsm-violet-${shade})` }"
              />
              <span class="block font-mono text-xs text-muted">{{ shade }}</span>
            </li>
          </ul>
        </div>
        <div class="space-y-3">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-muted">{{ copy.colors.status }}</p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="status in STATUSES"
              :key="status"
              :label="status"
              :color="status"
              variant="subtle"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-8 border-t border-default py-14 lg:py-20">
      <SectionHeading
        :title="copy.sections.typography.title"
        :description="copy.sections.typography.description"
        eyebrow="02"
      />
      <div v-reveal class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div class="space-y-3">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-muted">{{ copy.typography.sans }}</p>
          <p class="text-4xl font-semibold tracking-[-0.04em] text-highlighted sm:text-5xl">
            {{ copy.typography.heading }}
          </p>
          <p class="text-base leading-7 text-muted">{{ copy.typography.body }}</p>
        </div>
        <div class="space-y-3">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-muted">{{ copy.typography.mono }}</p>
          <p class="font-mono text-sm leading-7 text-highlighted">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 · {} [] () =&gt; ;
          </p>
        </div>
      </div>
    </section>

    <section class="space-y-8 border-t border-default py-14 lg:py-20">
      <SectionHeading
        :title="copy.sections.buttons.title"
        :description="copy.sections.buttons.description"
        eyebrow="03"
      />
      <div v-reveal class="flex flex-wrap items-center gap-3">
        <UButton :label="copy.buttons.primary" trailing-icon="i-ri-arrow-right-line" />
        <UButton :label="copy.buttons.secondary" color="secondary" />
        <UButton :label="copy.buttons.outline" color="neutral" variant="outline" />
        <UButton :label="copy.buttons.ghost" color="neutral" variant="ghost" />
        <UButton :label="copy.buttons.link" variant="link" />
        <UButton :label="copy.buttons.disabled" disabled />
      </div>
    </section>

    <section class="space-y-8 border-t border-default py-14 lg:py-20">
      <SectionHeading
        :title="copy.sections.glass.title"
        :description="copy.sections.glass.description"
        eyebrow="04"
      />
      <!-- Revealed as one block, with the shapes behind it (see app.css). -->
      <div v-reveal class="relative isolate grid gap-5 md:grid-cols-2">
        <GlassShapes layout="about" />
        <WGlassCard class="h-full" body-class="p-7 sm:p-8">
          <div class="space-y-3">
            <UIcon name="i-ri-sparkling-2-line" class="size-6 text-primary" />
            <h3 class="text-lg font-medium text-highlighted">{{ copy.glass.staticTitle }}</h3>
            <p class="text-sm leading-6 text-muted">{{ copy.glass.staticText }}</p>
          </div>
        </WGlassCard>
        <WGlassCard interactive class="h-full" body-class="p-7 sm:p-8">
          <div class="flex h-full flex-col gap-3">
            <UIcon name="i-ri-cursor-line" class="size-6 text-primary" />
            <h3 class="text-lg font-medium text-highlighted">{{ copy.glass.interactiveTitle }}</h3>
            <p class="text-sm leading-6 text-muted">{{ copy.glass.interactiveText }}</p>
            <UButton
              :label="copy.glass.interactiveAction"
              :to="sitePath('/projects')"
              trailing-icon="i-ri-arrow-right-line"
              color="neutral"
              variant="outline"
              size="sm"
              class="mt-auto min-h-11 self-start sm:min-h-0"
            />
          </div>
        </WGlassCard>
      </div>
    </section>

    <section class="space-y-8 border-t border-default py-14 lg:py-20">
      <SectionHeading
        :title="copy.sections.components.title"
        :description="copy.sections.components.description"
        eyebrow="05"
      />
      <div v-reveal class="space-y-6">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-muted">{{ copy.components.example }}</p>
        <WStatTiles :items="copy.components.stats" :label="copy.components.statsLabel" />
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap gap-2">
            <WPill
              v-for="pill in copy.components.pills"
              :key="pill.label"
              :label="pill.label"
              :tone="pill.tone"
            />
          </div>
          <WSegmented v-model="view" :items="copy.components.segments" :label="copy.components.segmentedLabel" />
        </div>
        <WEmptyState
          icon="i-ri-search-line"
          :title="copy.components.emptyTitle"
          :description="copy.components.emptyDescription"
        >
          <UButton
            :label="copy.components.emptyAction"
            icon="i-ri-refresh-line"
            color="neutral"
            variant="outline"
            size="sm"
          />
        </WEmptyState>
      </div>
    </section>

    <section class="space-y-8 border-t border-default py-14 lg:py-20">
      <SectionHeading
        :title="copy.sections.forms.title"
        :description="copy.sections.forms.description"
        eyebrow="06"
      />
      <WGlassCard v-reveal class="max-w-2xl" body-class="p-6 sm:p-8">
        <form class="space-y-5" @submit.prevent="sendSample">
          <div class="grid gap-5 sm:grid-cols-2">
            <UFormField :label="copy.forms.name" name="sample-name">
              <UInput v-model="form.name" :placeholder="copy.forms.namePlaceholder" class="w-full" />
            </UFormField>
            <UFormField :label="copy.forms.topic" name="sample-topic">
              <USelect v-model="form.topic" :items="copy.forms.topics" class="w-full" />
            </UFormField>
          </div>
          <USwitch v-model="form.notify" :label="copy.forms.notify" />
          <UCheckbox v-model="form.agree" :label="copy.forms.agree" />
          <UButton type="submit" :label="copy.forms.submit" trailing-icon="i-ri-send-plane-line" />
        </form>
      </WGlassCard>
    </section>

    <section class="space-y-8 border-t border-default py-14 lg:py-20">
      <SectionHeading
        :title="copy.sections.install.title"
        :description="copy.sections.install.description"
        eyebrow="07"
      />
      <div v-reveal class="grid gap-5 lg:grid-cols-2">
        <figure class="space-y-2">
          <figcaption class="font-mono text-xs text-muted">{{ copy.install.npmrc }}</figcaption>
          <pre class="overflow-x-auto rounded-xl bg-elevated p-4 font-mono text-xs leading-6 text-highlighted ring ring-default"><code>{{ NPMRC }}</code></pre>
        </figure>
        <figure class="space-y-2">
          <figcaption class="font-mono text-xs text-muted">{{ copy.install.config }}</figcaption>
          <pre class="overflow-x-auto rounded-xl bg-elevated p-4 font-mono text-xs leading-6 text-highlighted ring ring-default"><code>{{ CONFIG }}</code></pre>
        </figure>
      </div>
    </section>
  </UContainer>
</template>
