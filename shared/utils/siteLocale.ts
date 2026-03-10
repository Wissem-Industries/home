import type { SiteLocale } from '~~/shared/content'

export const SITE_LOCALE_COOKIE_NAME = 'site-locale'

type ResolveSiteLocaleOptions = {
	availableLocales: SiteLocale[]
	fallbackLocale: SiteLocale
	cookieLocale?: string
	candidates?: string[]
}

export function normalizeSiteLocale(value: string | undefined, availableLocales: SiteLocale[]) {
	if (!value) return undefined

	const normalizedValue = value.trim().toLowerCase()
	if (availableLocales.includes(normalizedValue)) return normalizedValue

	const [baseLocale] = normalizedValue.split(/[-_]/)
	if (!baseLocale) return undefined
	return availableLocales.includes(baseLocale) ? baseLocale : undefined
}

export function parseAcceptLanguage(headerValue?: string) {
	if (!headerValue) return []

	return headerValue
		.split(',')
		.map((item) => {
			const [rawTag, ...params] = item.trim().split(';')
			const tag = rawTag?.trim() || ''
			const qualityParam = params.find(param => param.trim().startsWith('q='))
			const quality = Number(qualityParam?.split('=')[1] || '1')

			return {
				tag,
				quality: Number.isFinite(quality) ? quality : 1
			}
		})
		.filter((item): item is { tag: string, quality: number } => Boolean(item.tag))
		.sort((left, right) => right.quality - left.quality)
		.map(item => item.tag)
}

export function resolvePreferredSiteLocale({
	availableLocales,
	fallbackLocale,
	cookieLocale,
	candidates = []
}: ResolveSiteLocaleOptions) {
	const normalizedCookieLocale = normalizeSiteLocale(cookieLocale, availableLocales)
	if (normalizedCookieLocale) return normalizedCookieLocale

	for (const candidate of candidates) {
		const normalizedCandidate = normalizeSiteLocale(candidate, availableLocales)
		if (normalizedCandidate) return normalizedCandidate
	}

	return normalizeSiteLocale(fallbackLocale, availableLocales) || availableLocales[0] || 'en'
}
