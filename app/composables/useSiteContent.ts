import { defaultSiteLocale, siteContent, type SiteLocale } from '~~/shared/content'

export function useSiteLocale() {
	return useState<SiteLocale>('site-locale', () => defaultSiteLocale)
}

export function useSiteContent() {
	const locale = useSiteLocale()

	return computed(() => siteContent[locale.value] ?? siteContent[defaultSiteLocale])
}
