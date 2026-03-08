import type { NuxtConfig } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default (): NuxtConfig => {
	const isBun = Boolean(process.versions.bun)

	return {
		modules: [
			'@nuxt/eslint',
			'@nuxt/ui',
			'@nuxt/content',
			'motion-v/nuxt',
			'@nuxtjs/plausible'
		],

		devtools: { enabled: false },

		css: ['~/assets/css/main.css'],

		// Nuxt Content's `native` connector targets Node's `node:sqlite`.
		content: isBun ? {} : { experimental: { sqliteConnector: 'native' } },

		runtimeConfig: {
			smtpHost: process.env.SMTP_HOST,
			smtpPort: process.env.SMTP_PORT,
			smtpSecure: process.env.SMTP_SECURE,
			smtpUser: process.env.SMTP_USER,
			smtpPass: process.env.SMTP_PASS
		},
		compatibilityDate: '2025-07-15',

		nitro: {
			...(isBun ? { preset: 'bun' } : {}),
			prerender: {
				routes: ['/'],
				crawlLinks: true
			},
			routeRules: {
				'/_plausible/**': {
					proxy: { to: 'https://analytics.wissem.pro/**' }
				}
			}
		},

		eslint: {
			config: {
				stylistic: {
					commaDangle: 'never',
					braceStyle: '1tbs',
					indent: 'tab'
				}
			}
		},
		plausible: { proxy: true }
	}
}
