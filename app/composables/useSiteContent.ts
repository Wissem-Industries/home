import { availableSiteLocales, defaultSiteLocale, siteContent, type LocaleContent, type SiteLocale } from '~~/shared/content'

const fallbackSiteContent: LocaleContent = (() => {
	const content = siteContent[defaultSiteLocale] || siteContent[availableSiteLocales[0] as SiteLocale]
	if (!content) throw new Error('No localized site content is available.')
	return content
})()

export function useSiteLocale() {
	return useState<SiteLocale>('site-locale', () => defaultSiteLocale)
}

export function useSiteContent() {
	const locale = useSiteLocale()
	return computed<LocaleContent>(() => siteContent[locale.value] || fallbackSiteContent)
}
