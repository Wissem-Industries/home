const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://www.wissem.pro'

export default defineNuxtConfig({
  extends: ['@wissem-industries/ui'],
  compatibilityDate: '2026-09-19',
  devtools: { enabled: false },
  css: ['~/assets/css/app.css'],
  modules: ['@nuxt/image', '@nuxtjs/i18n', '@nuxtjs/plausible'],
  image: {
    format: ['avif', 'webp'],
    quality: 80,
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    public: {
      siteUrl,
    },
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    baseUrl: siteUrl,
    langDir: 'locales',
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'fr',
    },
  },
  plausible: {
    proxy: false,
    autoOutboundTracking: true,
    fileDownloads: { fileExtensions: ['pdf'] },
    formSubmissions: true,
  },
  nitro: {
    preset: 'bun',
    // IPX loads the Node adapter of srvx at runtime, which Nitro cannot see.
    externals: { traceInclude: ['node_modules/srvx/dist/adapters/node.mjs'] },
  },
  sourcemap: {
    client: false,
    server: false,
  },
})
