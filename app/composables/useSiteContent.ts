import type { LocaleContent, SiteContentConfig, SiteLocale } from '~~/shared/content'
import { parseAcceptLanguage, resolvePreferredSiteLocale, SITE_LOCALE_COOKIE_NAME } from '#shared/utils/siteLocale'

function useSiteContentConfig() {
	return useAppConfig() as SiteContentConfig
}

function resolveInitialSiteLocale(availableLocales: SiteLocale[], fallbackLocale: SiteLocale, cookieLocale?: string) {
	const candidates: string[] = import.meta.server
		? parseAcceptLanguage(useRequestHeaders(['accept-language'])['accept-language'])
		: (navigator.languages?.length ? [...navigator.languages] : (navigator.language ? [navigator.language] : []))

	return resolvePreferredSiteLocale({
		availableLocales,
		fallbackLocale,
		cookieLocale,
		candidates
	})
}

export function useSiteLocale() {
	const { defaultSiteLocale, availableSiteLocales } = useSiteContentConfig()
	const fallbackLocale = defaultSiteLocale || availableSiteLocales[0] || 'en'
	const localeCookie = useCookie<SiteLocale | undefined>(SITE_LOCALE_COOKIE_NAME, {
		path: '/',
		sameSite: 'lax'
	})
	const state = useState<SiteLocale>('site-locale', () => {
		const resolvedLocale = resolveInitialSiteLocale(availableSiteLocales, fallbackLocale, localeCookie.value)

		localeCookie.value = resolvedLocale
		return resolvedLocale
	})

	return computed<SiteLocale>({
		get: () => state.value,
		set: (value) => {
			const resolvedLocale = resolvePreferredSiteLocale({
				availableLocales: availableSiteLocales,
				fallbackLocale,
				cookieLocale: value
			})

			state.value = resolvedLocale
			localeCookie.value = resolvedLocale
		}
	})
}

export function useSiteContent() {
	const { siteContent, defaultSiteLocale, availableSiteLocales } = useSiteContentConfig()
	const locale = useSiteLocale()

	const fallbackSiteContent = computed<LocaleContent>(() => {
		const fallbackLocale = defaultSiteLocale || availableSiteLocales[0] || 'en'
		const fallbackContent = siteContent[fallbackLocale]

		if (!fallbackContent) {
			throw new Error(`Missing fallback content for locale "${fallbackLocale}"`)
		}

		return fallbackContent
	})

	return computed<LocaleContent>(() => siteContent[locale.value] || fallbackSiteContent.value)
}
