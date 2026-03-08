const httpUrlPattern = /^(https?:)?\/\//i
const protocolPattern = /^[a-z][a-z0-9+.-]*:/i

export function isHttpUrl(value?: string) {
	return Boolean(value && httpUrlPattern.test(value))
}

export function isExternalLink(value?: string) {
	return Boolean(value && (httpUrlPattern.test(value) || protocolPattern.test(value)))
}

export function getLinkTarget(value?: string) {
	return isHttpUrl(value) ? '_blank' : undefined
}
