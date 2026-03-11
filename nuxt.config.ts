import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { NuxtConfig } from 'nuxt/schema'
import { parse } from 'yaml'
import type { ContactPageContent, LocaleContent, PageContent, ProjectContent, SiteContentConfig, SiteLocale, UiContent } from './shared/content/types'

const defaultSiteLocale: SiteLocale = 'fr'

type IndexFileContent = {
	ui: UiContent
	seo: LocaleContent['seo']
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

function loadSiteContent(): SiteContentConfig['siteContent'] {
	const localesDirectory = resolve(__dirname, 'locales')
	if (!existsSync(localesDirectory)) return {}

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
			seo: index.seo,
			pages: {
				home: index.pages.home,
				projects: index.pages.projects,
				contact: contact.page
			},
			cv: index.cv,
			projects
		}] as const]
	})

	return Object.fromEntries(entries) as SiteContentConfig['siteContent']
}

function validateSiteContent(siteContent: Record<SiteLocale, LocaleContent>, defaultSiteLocale: SiteLocale) {
	const locales = Object.keys(siteContent) as SiteLocale[]

	if (!locales.length) {
		throw new Error('No locale content was loaded from the locales directory.')
	}

	if (!siteContent[defaultSiteLocale]) {
		throw new Error(`Default locale "${defaultSiteLocale}" is missing from the loaded content.`)
	}

	const referenceLocale = locales[0]
	if (!referenceLocale) {
		throw new Error('Unable to resolve a reference locale from the loaded content.')
	}

	const referenceContent = siteContent[referenceLocale]
	if (!referenceContent) {
		throw new Error(`Reference locale "${referenceLocale}" is missing from the loaded content.`)
	}

	const referenceProjectIds = new Set<string>(referenceContent.projects.map((project: ProjectContent) => project.id))

	for (const locale of locales) {
		const localeContent = siteContent[locale]
		if (!localeContent) {
			throw new Error(`Locale "${locale}" is missing from the loaded content.`)
		}

		const projectIds = new Set<string>()

		for (const project of localeContent.projects) {
			if (projectIds.has(project.id)) {
				throw new Error(`Duplicate project id "${project.id}" found for locale "${locale}".`)
			}

			projectIds.add(project.id)
		}

		for (const featuredProjectId of localeContent.cv.projects.featured) {
			if (!projectIds.has(featuredProjectId)) {
				throw new Error(`Featured project id "${featuredProjectId}" is missing in locale "${locale}".`)
			}
		}

		if (projectIds.size !== referenceProjectIds.size) {
			throw new Error(`Locale "${locale}" does not define the same number of projects as locale "${referenceLocale}".`)
		}

		for (const projectId of Array.from(referenceProjectIds)) {
			if (!projectIds.has(projectId)) {
				throw new Error(`Project id "${projectId}" is missing in locale "${locale}".`)
			}
		}
	}
}

const siteContent = loadSiteContent()
validateSiteContent(siteContent, defaultSiteLocale)
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
			telegramBotToken: '',
			telegramChatId: '',
			public: { siteUrl: '' }
		},
		appConfig: {
			defaultSiteLocale,
			availableSiteLocales,
			siteContent
		},
		compatibilityDate: '2025-07-15',

		nitro: {
			preset: 'bun'
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
			proxy: false,
			domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
			apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST,
			fileDownloads: { fileExtensions: ['pdf'] },
			autoOutboundTracking: true,
			formSubmissions: true
		}
	}
}
