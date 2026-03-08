import type { LocaleContent, SiteLocale } from '~~/shared/content'

type SiteContentConfig = {
	defaultSiteLocale: SiteLocale
	availableSiteLocales: SiteLocale[]
	siteContent: Record<SiteLocale, LocaleContent>
}

function useSiteContentConfig() {
	return useAppConfig() as unknown as SiteContentConfig
}

export function useSiteLocale() {
	const { defaultSiteLocale } = useSiteContentConfig()

	return useState<SiteLocale>('site-locale', () => defaultSiteLocale || 'fr')
}

export function useSiteContent() {
	const { siteContent, defaultSiteLocale, availableSiteLocales } = useSiteContentConfig()
	const locale = useSiteLocale()

	const fallbackSiteContent = computed<LocaleContent>(() => {
		const fallbackLocale = defaultSiteLocale || availableSiteLocales[0] || 'fr'
		const fallbackContent = siteContent[fallbackLocale]

		if (!fallbackContent) throw new Error('No localized site content is available.')

		return fallbackContent
	})

	return computed<LocaleContent>(() => siteContent[locale.value] || fallbackSiteContent.value)
}
