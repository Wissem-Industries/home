import { computed } from 'vue'
import { resolveAbsoluteUrl, resolveCanonicalUrl, resolveSiteUrl } from '#shared/utils/seo'
import { isHttpUrl } from '#shared/utils/links'

type PageSchemaType = 'WebPage' | 'ProfilePage' | 'CollectionPage' | 'ContactPage'

type PageSchemaInput = {
	type: PageSchemaType
	path: string
	name: string
	description: string
	image?: string
	breadcrumbs?: Array<{
		name: string
		path: string
	}>
}

const ogLocaleBySiteLocale = {
	en: 'en_US',
	fr: 'fr_FR'
} as const

const languageTagBySiteLocale = {
	en: 'en-US',
	fr: 'fr-FR'
} as const

export function useSiteSeo() {
	const locale = useSiteLocale()
	const content = useSiteContent()
	const config = useRuntimeConfig()
	const route = useRoute()
	const { allLinks } = useContactLinks()

	const siteUrl = computed(() => resolveSiteUrl(config.public.siteUrl))
	const canonicalUrl = computed(() => resolveCanonicalUrl(siteUrl.value, route.path || '/'))
	const siteMeta = computed(() => content.value.ui.meta)
	const siteSeo = computed(() => content.value.seo)
	const personId = computed(() => `${siteUrl.value}/#person`)
	const websiteId = computed(() => `${siteUrl.value}/#website`)
	const languageTag = computed(() => languageTagBySiteLocale[locale.value as keyof typeof languageTagBySiteLocale] || languageTagBySiteLocale.fr)
	const ogLocale = computed(() => ogLocaleBySiteLocale[locale.value as keyof typeof ogLocaleBySiteLocale] || ogLocaleBySiteLocale.fr)
	const ogLocaleAlternates = computed(() => Object.entries(ogLocaleBySiteLocale)
		.filter(([siteLocale]) => siteLocale !== locale.value)
		.map(([, value]) => value))
	const defaultImageUrl = computed(() => resolveAbsoluteUrl(siteUrl.value, siteSeo.value.defaultImage))
	const sameAs = computed(() => {
		const values = allLinks.value
			.map(link => link.to)
			.filter(isHttpUrl)
			.filter(link => resolveSiteUrl(link) !== siteUrl.value)

		return [...new Set(values)]
	})

	function buildWebsiteSchema() {
		return {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			'@id': websiteId.value,
			'url': `${siteUrl.value}/`,
			'name': siteMeta.value.ogSiteName,
			'alternateName': siteSeo.value.person.alternateName,
			'description': siteSeo.value.defaultDescription,
			'inLanguage': Object.values(languageTagBySiteLocale),
			'image': defaultImageUrl.value,
			'publisher': {
				'@id': personId.value
			}
		}
	}

	function buildPersonSchema() {
		return {
			'@context': 'https://schema.org',
			'@type': 'Person',
			'@id': personId.value,
			'name': siteSeo.value.person.name,
			'alternateName': siteSeo.value.person.alternateName,
			'description': siteSeo.value.person.description,
			'url': `${siteUrl.value}/`,
			'sameAs': sameAs.value,
			'alumniOf': siteSeo.value.person.alumniOf
				? {
						'@type': 'CollegeOrUniversity',
						'name': siteSeo.value.person.alumniOf
					}
				: undefined
		}
	}

	function buildPageSchema(input: PageSchemaInput) {
		const url = resolveCanonicalUrl(siteUrl.value, input.path)
		const image = resolveAbsoluteUrl(siteUrl.value, input.image || siteSeo.value.defaultImage)

		return {
			'@context': 'https://schema.org',
			'@type': input.type,
			'@id': `${url}#webpage`,
			'url': url,
			'name': input.name,
			'description': input.description,
			'inLanguage': languageTag.value,
			'isPartOf': {
				'@id': websiteId.value
			},
			'about': {
				'@id': personId.value
			},
			'mainEntity': input.type === 'ProfilePage'
				? {
						'@id': personId.value
					}
				: undefined,
			'primaryImageOfPage': image
				? {
						'@type': 'ImageObject',
						'url': image
					}
				: undefined
		}
	}

	function buildBreadcrumbSchema(items: PageSchemaInput['breadcrumbs']) {
		if (!items?.length) return undefined

		return {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			'itemListElement': items.map((item, index) => ({
				'@type': 'ListItem',
				'position': index + 1,
				'name': item.name,
				'item': resolveCanonicalUrl(siteUrl.value, item.path)
			}))
		}
	}

	function formatTitle(value: string) {
		return siteMeta.value.titleTemplate.includes('%s')
			? siteMeta.value.titleTemplate.replace('%s', value)
			: value
	}

	return {
		canonicalUrl,
		defaultImageUrl,
		formatTitle,
		languageTag,
		ogLocale,
		ogLocaleAlternates,
		siteMeta,
		siteSeo,
		siteUrl,
		buildWebsiteSchema,
		buildPersonSchema,
		buildPageSchema,
		buildBreadcrumbSchema
	}
}
