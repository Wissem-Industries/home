import type { H3Event } from 'h3'
import type { LocaleContent, SiteLocale } from '#shared/content'
import { hasContactFormErrors, normalizeContactForm, type ContactFormData } from '#shared/utils/contact'

const CONTACT_RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const CONTACT_RATE_LIMIT_MAX = 5
const contactRateLimitBuckets = new Map<string, { count: number, startedAt: number }>()

function sanitizeInline(value: string) {
	return value.replace(/[\r\n]+/g, ' ').trim()
}

function escapeTelegramHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

function pruneExpiredRateLimits(now: number) {
	for (const [key, bucket] of contactRateLimitBuckets) {
		if (now - bucket.startedAt > CONTACT_RATE_LIMIT_WINDOW_MS) {
			contactRateLimitBuckets.delete(key)
		}
	}
}

type SiteContentConfig = {
	defaultSiteLocale: SiteLocale
	siteContent: Record<SiteLocale, LocaleContent>
}

function getContactApiMessages() {
	const { defaultSiteLocale, siteContent } = useAppConfig() as unknown as SiteContentConfig
	const fallbackLocale = defaultSiteLocale || Object.keys(siteContent)[0]
	const localeContent = fallbackLocale ? siteContent[fallbackLocale] : undefined
	const contactApi = localeContent?.pages?.contact?.api

	if (!contactApi) throw createError({ statusCode: 500 })
	return contactApi
}

function enforceContactRateLimit(event: H3Event, tooManyRequestsMessage: string) {
	const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
	const now = Date.now()

	if (contactRateLimitBuckets.size > 256) pruneExpiredRateLimits(now)
	const current = contactRateLimitBuckets.get(ip)
	if (!current || now - current.startedAt > CONTACT_RATE_LIMIT_WINDOW_MS) {
		contactRateLimitBuckets.set(ip, { count: 1, startedAt: now })
		return
	}

	if (current.count >= CONTACT_RATE_LIMIT_MAX) throw createError({ statusCode: 429, statusMessage: tooManyRequestsMessage })
	contactRateLimitBuckets.set(ip, { count: current.count + 1, startedAt: current.startedAt })
}

export default defineEventHandler(async (event) => {
	const contactApi = getContactApiMessages()
	enforceContactRateLimit(event, contactApi.tooManyRequests)

	const body = normalizeContactForm(await readBody<Partial<ContactFormData>>(event))
	if (hasContactFormErrors(body)) throw createError({ statusCode: 400, statusMessage: contactApi.invalidForm })

	const config = useRuntimeConfig()
	if (!config.telegramBotToken || !config.telegramChatId) throw createError({ statusCode: 503, statusMessage: contactApi.serviceUnavailable })

	const senderName = sanitizeInline(body.name)
	const senderEmail = sanitizeInline(body.email)
	const senderSubject = sanitizeInline(body.subject) || contactApi.telegramSubjectFallback
	const senderMessage = body.message.trim()

	const html = [
		`📩 · <b>${contactApi.telegramHeader}</b>`,
		'',
		`<b>${escapeTelegramHtml(contactApi.telegramNameLabel)}</b> : ${escapeTelegramHtml(senderName)}`,
		`<b>${escapeTelegramHtml(contactApi.telegramEmailLabel)}</b> : <code>${escapeTelegramHtml(senderEmail)}</code>`,
		`<b>${escapeTelegramHtml(contactApi.telegramSubjectLabel)}</b> : ${escapeTelegramHtml(senderSubject)}`,
		'',
		`<b>${escapeTelegramHtml(contactApi.telegramMessageLabel)}</b>`,
		`${escapeTelegramHtml(senderMessage)}`
	].join('\n')

	const res = await fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ chat_id: config.telegramChatId, text: html, parse_mode: 'HTML', disable_web_page_preview: true})
	})

	const data = await res.json().catch(() => null)
	if (!res.ok || !data?.ok) throw createError({ statusCode: 502, statusMessage: contactApi.telegramSendFailure })
	return { ok: true, message: contactApi.successMessage }
})
