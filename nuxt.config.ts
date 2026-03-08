import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { NuxtConfig } from 'nuxt/schema'
import { parse } from 'yaml'
import type { ContactPageContent, LocaleContent, PageContent, ProjectContent, SiteLocale, UiContent } from './shared/content/types'

const defaultSiteLocale: SiteLocale = 'fr'
const isBuildCommand = process.argv.includes('build') || process.argv.includes('generate')
const trailingSlashExportWarning = 'Use of deprecated trailing slash pattern mapping'
const ignoredNitroWarningPatterns = ['cache-driver.js', 'Circular dependency:']

if (isBuildCommand) {
	const emitWarning = process.emitWarning.bind(process) as (...args: any[]) => void

	process.emitWarning = ((warning: string | Error, ...args: any[]) => {
		const message = typeof warning === 'string' ? warning : warning?.message || ''

		if (message.includes(trailingSlashExportWarning)) return

		emitWarning(warning, ...args)
	}) as typeof process.emitWarning

	process.env.NODE_NO_WARNINGS ??= '1'
	process.env.NO_DEPRECATION ??= '1'
	process.env.BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA ??= 'true'
	process.env.BROWSERSLIST_IGNORE_OLD_DATA ??= 'true'
}

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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default (): NuxtConfig => {
	return {
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
			smtpHost: process.env.SMTP_HOST,
			smtpPort: process.env.SMTP_PORT,
			smtpSecure: process.env.SMTP_SECURE,
			smtpUser: process.env.SMTP_USER,
			smtpPass: process.env.SMTP_PASS,
			public: { siteUrl: process.env.SITE_URL }
		},
		appConfig: {
			defaultSiteLocale,
			availableSiteLocales,
			siteContent
		},
		compatibilityDate: '2025-07-15',

		nitro: {
			rollupConfig: {
				onwarn(warning, warn) {
					const message = String(warning.message)

					if (ignoredNitroWarningPatterns.some(pattern => message.includes(pattern))) return

					warn(warning)
				}
			},
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
