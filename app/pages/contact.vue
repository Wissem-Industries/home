<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ContactErrorCode } from '#shared/utils/contact'
import {
  CONTACT_HONEYPOT_FIELD,
  CONTACT_LIMITS,
  createContactSchema,
  createEmptyContactPayload,
} from '#shared/utils/contact'

const { content } = usePortfolioContent()
const { canonicalUrl, siteUrl } = useSiteSeo()
const localePath = useLocalePath()
const toast = useToast()
const loading = ref(false)
const state = reactive(createEmptyContactPayload())
const schema = computed(() => createContactSchema(content.value.contact.validation))

function getErrorMessage(code?: ContactErrorCode) {
  if (code === 'RATE_LIMITED') return content.value.contact.messages.rateLimited
  if (code === 'INVALID_PAYLOAD') return content.value.contact.messages.invalidPayload
  if (code === 'SERVICE_UNAVAILABLE') return content.value.contact.messages.unavailable
  return content.value.contact.messages.errorDescription
}

async function onSubmit(_event: FormSubmitEvent<unknown>) {
  if (loading.value) return

  loading.value = true
  try {
    // The whole state is sent, hidden field included: the API uses it to spot bots.
    await $fetch('/api/contact', { method: 'POST', body: state })
    toast.add({
      title: content.value.contact.messages.successTitle,
      description: content.value.contact.messages.successDescription,
      color: 'success',
    })
    Object.assign(state, createEmptyContactPayload())
  } catch (error) {
    const code = (error as { data?: { data?: { code?: ContactErrorCode } } }).data?.data?.code
    toast.add({
      title: content.value.contact.messages.errorTitle,
      description: getErrorMessage(code),
      color: 'error',
    })
  } finally {
    loading.value = false
  }
}

usePageSeo(
  computed(() => ({
    title: content.value.pages.contact.title,
    description: content.value.pages.contact.description,
  })),
)

useBreadcrumbJsonLd(
  computed(() => [
    { name: content.value.navigation.home, item: siteUrl.value },
    { name: content.value.pages.contact.heading, item: canonicalUrl.value },
  ]),
)
</script>

<template>
  <UContainer>
    <header
      class="wi-enter max-w-3xl space-y-5 pb-14 pt-8 sm:pb-20 sm:pt-14"
    >
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {{ content.pages.contact.eyebrow }}
      </p>
      <h1 class="text-5xl font-semibold tracking-[-0.05em] text-highlighted sm:text-6xl">
        {{ content.contact.title }}
      </h1>
      <p class="max-w-2xl text-base leading-7 text-muted sm:text-lg">
        {{ content.contact.description }}
      </p>
    </header>

    <section class="grid items-stretch gap-5 border-t border-default py-12 lg:grid-cols-[22rem_minmax(0,1fr)] lg:py-16">
      <UCard class="h-full" v-reveal="0">
        <div class="space-y-6">
          <div class="space-y-2">
            <h2 class="text-lg font-medium text-highlighted">{{ content.contact.sidebarTitle }}</h2>
            <p class="text-sm leading-6 text-muted">{{ content.contact.sidebarDescription }}</p>
          </div>
          <ContactDetails
            :location-label="content.profile.locationLabel"
            :location="content.profile.location"
            :links="content.links"
          />
        </div>
      </UCard>

      <UCard class="h-full" v-reveal="1">
        <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">
          <div class="grid gap-5 sm:grid-cols-2">
            <UFormField
              name="name"
              :label="content.contact.fields.name.label"
              required
            >
              <UInput
                v-model="state.name"
                :placeholder="content.contact.fields.name.placeholder"
                autocomplete="name"
                :maxlength="CONTACT_LIMITS.name.max"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="email"
              :label="content.contact.fields.email.label"
              required
            >
              <UInput
                v-model="state.email"
                type="email"
                :placeholder="content.contact.fields.email.placeholder"
                autocomplete="email"
                :maxlength="CONTACT_LIMITS.email.max"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField
            name="subject"
            :label="content.contact.fields.subject.label"
            required
          >
            <UInput
              v-model="state.subject"
              :maxlength="CONTACT_LIMITS.subject.max"
              :placeholder="content.contact.fields.subject.placeholder"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="message"
            :label="content.contact.fields.message.label"
            required
          >
            <UTextarea
              v-model="state.message"
              :maxlength="CONTACT_LIMITS.message.max"
              :placeholder="content.contact.fields.message.placeholder"
              :rows="9"
              class="w-full"
            />
          </UFormField>

          <!-- Honeypot: invisible to people, filled in by bots. -->
          <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              {{ content.contact.honeypotLabel }}
              <input
                v-model="state[CONTACT_HONEYPOT_FIELD]"
                type="text"
                :name="CONTACT_HONEYPOT_FIELD"
                tabindex="-1"
                autocomplete="off"
              >
            </label>
          </div>

          <div class="flex flex-col gap-4 border-t border-default pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex max-w-md items-start gap-2 text-xs leading-5 text-muted">
              <UIcon name="i-ri-information-line" class="mt-0.5 size-4 shrink-0" />
              <p>
                {{ content.contact.responseHint }}
                {{ content.contact.privacyNotice }}
                <NuxtLink
                  :to="localePath('/privacy')"
                  class="text-highlighted underline underline-offset-4"
                >
                  {{ content.contact.privacyLink }}
                </NuxtLink>
              </p>
            </div>
            <UButton
              type="submit"
              :label="content.contact.submit"
              :loading="loading"
              trailing-icon="i-ri-send-plane-line"
              size="lg"
              class="min-h-11 justify-center sm:min-h-0 sm:min-w-52"
            />
          </div>
        </UForm>
      </UCard>
    </section>
  </UContainer>
</template>
