// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxt/ui',
		'@nuxt/content',
		'@vueuse/nuxt',
		'motion-v/nuxt'
	],

	devtools: {
		enabled: false
	},

	css: ['~/assets/css/main.css'],

	runtimeConfig: {
		smtpHost: process.env.SMTP_HOST,
		smtpPort: process.env.SMTP_PORT,
		smtpSecure: process.env.SMTP_SECURE,
		smtpUser: process.env.SMTP_USER,
		smtpPass: process.env.SMTP_PASS
	},

	build: {
		analyze: false
	},

	compatibilityDate: '2024-11-01',

	nitro: {
		preset: 'bun',
		prerender: {
			routes: ['/', '/projects', '/contact'],
			crawlLinks: false
		}
	},

	vite: {
		build: {
			sourcemap: false
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
