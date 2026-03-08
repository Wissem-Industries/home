/// <reference types="vite/client" />

import { parse } from 'yaml'
import type { LocaleContent, PageContent, ProjectContent, SiteLocale } from './types'

export * from './types'

export const defaultSiteLocale: SiteLocale = 'fr'

const contentFiles = import.meta.glob('../../locales/*/content/*.yml', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>

const projectFiles = import.meta.glob('../../locales/*/projects/*.yml', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>

type IndexFileContent = {
	pages: {
		home: PageContent
		projects: PageContent
	}
	cv: LocaleContent['cv']
}

type ContactFileContent = {
	page: PageContent
}

function getLocaleFromPath(path: string, segment: 'content' | 'projects') {
	const normalizedPath = path.replace(/\\/g, '/')
	const match = normalizedPath.match(new RegExp(`/locales/([^/]+)/${segment}/`))

	return match?.[1]
}

function getFileName(path: string) {
	const normalizedPath = path.replace(/\\/g, '/')
	const fileName = normalizedPath.split('/').pop()

	return fileName?.replace(/\.yml$/, '')
}

function createLocaleBuckets() {
	const buckets: Record<
		SiteLocale,
		{
			pages?: Partial<LocaleContent['pages']>
			cv?: LocaleContent['cv']
			projects?: ProjectContent[]
		}
	> = {}

	for (const [path, raw] of Object.entries(contentFiles)) {
		const locale = getLocaleFromPath(path, 'content')
		const fileName = getFileName(path)

		if (!locale || !fileName) {
			continue
		}

		buckets[locale] ||= {}

		if (fileName === 'index') {
			const parsed = parse(raw) as IndexFileContent
			buckets[locale].pages = {
				...(buckets[locale].pages || {}),
				home: parsed.pages.home,
				projects: parsed.pages.projects
			}
			buckets[locale].cv = parsed.cv
		}

		if (fileName === 'contact') {
			const parsed = parse(raw) as ContactFileContent
			buckets[locale].pages = {
				...(buckets[locale].pages || {}),
				contact: parsed.page
			}
		}
	}

	for (const path of Object.keys(projectFiles).sort()) {
		const locale = getLocaleFromPath(path, 'projects')

		if (!locale) {
			continue
		}

		const raw = projectFiles[path]

		if (!raw) {
			continue
		}

		buckets[locale] ||= {}
		buckets[locale].projects ||= []
		buckets[locale].projects.push(parse(raw) as ProjectContent)
	}

	return buckets
}

function normalizeLocaleBuckets() {
	const normalized: Record<SiteLocale, LocaleContent> = {}

	for (const [locale, bucket] of Object.entries(createLocaleBuckets())) {
		if (!bucket.pages?.home || !bucket.pages.projects || !bucket.pages.contact || !bucket.cv || !bucket.projects) {
			continue
		}

		normalized[locale] = {
			pages: {
				home: bucket.pages.home,
				projects: bucket.pages.projects,
				contact: bucket.pages.contact
			},
			cv: bucket.cv,
			projects: bucket.projects
		}
	}

	return normalized
}

export const siteContent = normalizeLocaleBuckets()
export const availableSiteLocales = Object.keys(siteContent).sort()
