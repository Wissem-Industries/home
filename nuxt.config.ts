import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse } from 'yaml'
import type { ContactPageContent, LocaleContent, PageContent, ProjectContent, SiteLocale, UiContent } from './shared/content/types'

const defaultSiteLocale: SiteLocale = 'fr'

type IndexFileContent = {
	ui: UiContent
	pages: { home: PageContent, projects: PageContent }
	cv: LocaleContent['cv']
}

type ContactFileContent = {
	page: ContactPageContent
}

function readYamlFile<T>(filePath: string): T {
	return parse(readFileSync(filePath, 'utf8')) as T
}

function getYamlFileNames(directory: string) {
	if (!existsSync(directory)) return []

	return readdirSync(directory, { withFileTypes: true })
		.filter(entry => entry.isFile() && entry.name.endsWith('.yml'))
		.map(entry => entry.name)
		.sort((left, right) => left.localeCompare(right))
}

function loadSiteContent() {
	const localesDirectory = resolve(__dirname, 'locales')
	if (!existsSync(localesDirectory)) return {} as Record<SiteLocale, LocaleContent>

	const locales = readdirSync(localesDirectory, { withFileTypes: true })
		.filter(entry => entry.isDirectory())
		.map(entry => entry.name)
		.sort((left, right) => left.localeCompare(right))

	const entries = locales.flatMap((locale) => {
		const contentDirectory = resolve(localesDirectory, locale, 'content')
		const projectsDirectory = resolve(localesDirectory, locale, 'projects')
		const indexFilePath = resolve(contentDirectory, 'index.yml')
		const contactFilePath = resolve(contentDirectory, 'contact.yml')

		if (!existsSync(indexFilePath) || !existsSync(contactFilePath)) return []

		const index = readYamlFile<IndexFileContent>(indexFilePath)
		const contact = readYamlFile<ContactFileContent>(contactFilePath)
		const projects = getYamlFileNames(projectsDirectory)
			.map(fileName => readYamlFile<ProjectContent>(resolve(projectsDirectory, fileName)))

		return [[locale, {
			ui: index.ui,
			pages: {
				home: index.pages.home,
				projects: index.pages.projects,
				contact: contact.page
			},
			cv: index.cv,
			projects
		}] as const]
	})

	return Object.fromEntries(entries) as Record<SiteLocale, LocaleContent>
}

const siteContent = loadSiteContent()
const availableSiteLocales = Object.keys(siteContent).sort()

export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@nuxt/ui',
		'motion-v/nuxt',
		'@nuxtjs/plausible'
	],

	devtools: { enabled: false },
	css: ['~/assets/css/main.css'],
	sourcemap: {
		server: false,
		client: false
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 600
		}
	},

	runtimeConfig: {
		smtpHost: process.env.NUXT_SMTP_HOST ?? process.env.SMTP_HOST ?? '',
		smtpPort: process.env.NUXT_SMTP_PORT ?? process.env.SMTP_PORT ?? '',
		smtpSecure: process.env.NUXT_SMTP_SECURE ?? process.env.SMTP_SECURE ?? '',
		smtpUser: process.env.NUXT_SMTP_USER ?? process.env.SMTP_USER ?? '',
		smtpPass: process.env.NUXT_SMTP_PASS ?? process.env.SMTP_PASS ?? '',
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? ''
		}
	},
	appConfig: {
		defaultSiteLocale,
		availableSiteLocales,
		siteContent
	},
	compatibilityDate: '2025-07-15',

	nitro: {
		preset: 'bun',
		prerender: {
			routes: ['/'],
			crawlLinks: true
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

	plausible: {
		proxy: true,
		domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
		apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST,
		autoOutboundTracking: true,
		fileDownloads: { fileExtensions: ['pdf'] },
		formSubmissions: true
	}
})
