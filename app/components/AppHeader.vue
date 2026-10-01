<script setup lang="ts">
import type { LocaleCode } from '#shared/content'
import { SITE_ROUTES } from '#shared/utils/site'

const { content, locale } = usePortfolioContent()
const { setLocale } = useI18n()
const localePath = useLocalePath()

const items = computed(() =>
  SITE_ROUTES.map((route) => ({
    label: content.value.navigation[route.key],
    icon: route.icon,
    to: localePath(route.path),
    // The English home is `/en`, a prefix of every other English page.
    exact: route.path === '/',
  })),
)

const locales = [
  { code: 'fr', icon: 'i-circle-flags-fr', label: 'Français' },
  { code: 'en', icon: 'i-circle-flags-gb', label: 'English' },
] satisfies Array<{ code: LocaleCode; icon: string; label: string }>

// setLocale also stores the language cookie: a plain link back to `/` would be
// redirected to the language chosen before.
function select(code: string) {
  setLocale(code as LocaleCode)
}
</script>

<template>
  <WNavbar :items="items" :label="content.navigation.label">
    <template #trailing>
      <WLocaleSelect
        :locales="locales"
        :current="locale"
        :label="content.localeSwitchLabel"
        @select="select"
      />
      <WColorModeButton :label="content.theme.toggle" />
    </template>
  </WNavbar>
</template>
