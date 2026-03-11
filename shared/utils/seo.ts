const PRIMARY_SITE_URL = 'https://www.wissem.pro'

export function resolveSiteUrl(rawSiteUrl?: string) {
	const fallbackUrl = new URL(PRIMARY_SITE_URL)

	try {
		const resolvedUrl = new URL(rawSiteUrl?.trim() || PRIMARY_SITE_URL)

		if (resolvedUrl.hostname === 'wissem.pro') {
			resolvedUrl.hostname = 'www.wissem.pro'
		}

		resolvedUrl.hash = ''
		resolvedUrl.search = ''
		resolvedUrl.pathname = '/'

		return resolvedUrl.toString().replace(/\/$/, '')
	} catch {
		return fallbackUrl.toString().replace(/\/$/, '')
	}
}

export function resolveCanonicalUrl(siteUrl: string, path: string) {
	return new URL(path || '/', `${siteUrl}/`).toString()
}

export function resolveAbsoluteUrl(siteUrl: string, value?: string) {
	if (!value) return undefined

	try {
		return new URL(value, `${siteUrl}/`).toString()
	} catch {
		return undefined
	}
}
