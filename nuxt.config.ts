// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxt/ui',
		'@nuxt/content',
		'@vueuse/nuxt',
		'motion-v/nuxt',
		'@nuxtjs/plausible'
	],

	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	plausible: { proxy: true },

	css: ['~/assets/css/main.css'],

	content: { experimental: { sqliteConnector: 'native' } },

	runtimeConfig: {
		smtpHost: process.env.SMTP_HOST,
		smtpPort: process.env.SMTP_PORT,
		smtpSecure: process.env.SMTP_SECURE,
		smtpUser: process.env.SMTP_USER,
		smtpPass: process.env.SMTP_PASS
	},

	nitro: {
		preset: 'bun',
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
	}
})
