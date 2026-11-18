import pkg from './package.json' with { type: 'json' }

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://www.wissem.pro'
const uiSiteUrl = process.env.NUXT_PUBLIC_UI_SITE_URL || 'https://ui.wissem.pro'
const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  extends: ['@wissem-industries/ui'],
  compatibilityDate: '2026-09-19',
  devtools: { enabled: false },
  css: ['~/assets/css/app.css'],
  // No Plausible in development: its modules keep their package name in the URL there, content
  // blockers (Brave Shields) drop them and the whole app stops hydrating.
  modules: ['@nuxt/image', '@nuxtjs/i18n', ...(isDev ? [] : ['@nuxtjs/plausible'])],
  image: {
    // Resume preview, resized from the bucket filled by the CV pipeline.
    domains: ['cdn.wissem.pro'],
    // IPX sends this as max-age and s-maxage; its default of 60 s made Cloudflare re-ask the
    // server for each image every minute.
    ipx: { maxAge: 604800 },
    format: ['avif', 'webp'],
    quality: 80,
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 },
  },
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    public: {
      siteUrl,
      uiSiteUrl,
      assetVersion: pkg.version,
      // Day of the build, given as the last modification of the pages (sitemap, ProfilePage).
      builtAt: new Date().toISOString().slice(0, 10),
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
      // Served over HTTPS only; the dev server stays on plain HTTP.
      cookieSecure: !isDev,
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'fr',
    },
  },
  plausible: {
    // One Plausible site for both hosts: events from ui.wissem.pro count under the main domain.
    domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN || new URL(siteUrl).hostname,
    // Events go through this origin under a neutral path, so content blockers do not drop them.
    proxy: true,
    proxyBaseEndpoint: '/_w',
    autoOutboundTracking: true,
    // Resume downloads are counted by the server route itself (server/utils/resume.ts).
    fileDownloads: false,
    formSubmissions: true,
  },
  // Files of public/ have no version in their name: a week in browsers and at Cloudflare, which
  // otherwise applies its own four hours.
  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=604800' } },
    '/favicon.ico': { headers: { 'cache-control': 'public, max-age=604800' } },
    '/apple-touch-icon.png': { headers: { 'cache-control': 'public, max-age=604800' } },
    '/icon-192.png': { headers: { 'cache-control': 'public, max-age=604800' } },
    '/icon-512.png': { headers: { 'cache-control': 'public, max-age=604800' } },
    '/site.webmanifest': { headers: { 'cache-control': 'public, max-age=86400' } },
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
