import type { LocaleContent, SiteLocale } from '~~/shared/content'
import { parseAcceptLanguage, resolvePreferredSiteLocale, SITE_LOCALE_COOKIE_NAME } from '#shared/utils/siteLocale'

type SiteContentConfig = {
	defaultSiteLocale: SiteLocale
	availableSiteLocales: SiteLocale[]
	siteContent: Record<SiteLocale, LocaleContent>
}

function useSiteContentConfig() {
	return useAppConfig() as unknown as SiteContentConfig
}

export function useSiteLocale() {
	const { defaultSiteLocale, availableSiteLocales } = useSiteContentConfig()
	const fallbackLocale = defaultSiteLocale || 'en'
	const localeCookie = useCookie<SiteLocale | undefined>(SITE_LOCALE_COOKIE_NAME, {
		path: '/',
		sameSite: 'lax'
	})
	const locale = useState<SiteLocale>('site-locale', () => {
		const candidates: string[] = import.meta.server
			? parseAcceptLanguage(useRequestHeaders(['accept-language'])['accept-language'])
			: (navigator.languages?.length ? [...navigator.languages] : (navigator.language ? [navigator.language] : []))

		const resolvedLocale = resolvePreferredSiteLocale({
			availableLocales: availableSiteLocales,
			fallbackLocale,
			cookieLocale: localeCookie.value,
			candidates
		})

		localeCookie.value = resolvedLocale
		return resolvedLocale
	})
	const syncRegistered = useState('site-locale-sync-registered', () => false)

	if (!syncRegistered.value) {
		syncRegistered.value = true

		watch(locale, (value) => {
			const resolvedLocale = resolvePreferredSiteLocale({
				availableLocales: availableSiteLocales,
				fallbackLocale,
				cookieLocale: value
			})

			if (locale.value !== resolvedLocale) {
				locale.value = resolvedLocale
				return
			}

			if (localeCookie.value !== resolvedLocale) localeCookie.value = resolvedLocale
		}, { immediate: true })
	}

	return locale
}

export function useSiteContent() {
	const { siteContent, defaultSiteLocale, availableSiteLocales } = useSiteContentConfig()
	const locale = useSiteLocale()

	const fallbackSiteContent = computed<LocaleContent>(() => {
		const fallbackLocale = defaultSiteLocale || availableSiteLocales[0] || 'en'
		const fallbackContent = siteContent[fallbackLocale]

		if (!fallbackContent) throw new Error()

		return fallbackContent
	})

	return computed<LocaleContent>(() => siteContent[locale.value] || fallbackSiteContent.value)
}
