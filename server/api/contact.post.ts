import type { H3Event } from 'h3'
import nodemailer from 'nodemailer'
import { hasContactFormErrors, normalizeContactForm, type ContactFormData } from '#shared/utils/contact'

const CONTACT_RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const CONTACT_RATE_LIMIT_MAX = 5
const contactRateLimitBuckets = new Map<string, { count: number, startedAt: number }>()

function parseBoolean(value: unknown) {
	return ['1', 'true', 'yes', 'on'].includes(String(value).trim().toLowerCase())
}

function sanitizeMailHeader(value: string) {
	return value.replace(/[\r\n]+/g, ' ').trim()
}

function pruneExpiredRateLimits(now: number) {
	for (const [key, bucket] of contactRateLimitBuckets) {
		if (now - bucket.startedAt > CONTACT_RATE_LIMIT_WINDOW_MS) {
			contactRateLimitBuckets.delete(key)
		}
	}
}

function enforceContactRateLimit(event: H3Event) {
	const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
	const now = Date.now()

	if (contactRateLimitBuckets.size > 256) pruneExpiredRateLimits(now)

	const current = contactRateLimitBuckets.get(ip)

	if (!current || now - current.startedAt > CONTACT_RATE_LIMIT_WINDOW_MS) {
		contactRateLimitBuckets.set(ip, { count: 1, startedAt: now })
		return
	}

	if (current.count >= CONTACT_RATE_LIMIT_MAX) {
		throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
	}

	contactRateLimitBuckets.set(ip, { count: current.count + 1, startedAt: current.startedAt })
}

export default defineEventHandler(async (event) => {
	enforceContactRateLimit(event)

	const body = normalizeContactForm(await readBody<Partial<ContactFormData>>(event))
	if (hasContactFormErrors(body)) {
		throw createError({ statusCode: 400, statusMessage: 'Invalid data' })
	}

	const config = useRuntimeConfig()
	const smtpPort = Number(config.smtpPort)

	if (!config.smtpHost || !config.smtpUser || !config.smtpPass || !Number.isFinite(smtpPort)) {
		throw createError({ statusCode: 503, statusMessage: 'Contact service unavailable' })
	}

	const transporter = nodemailer.createTransport({
		host: config.smtpHost,
		port: smtpPort,
		secure: parseBoolean(config.smtpSecure),
		auth: { user: config.smtpUser, pass: config.smtpPass }
	})

	const senderName = sanitizeMailHeader(body.name)
	const senderEmail = sanitizeMailHeader(body.email)
	const senderSubject = sanitizeMailHeader(body.subject) || 'Nouveau message depuis le portfolio'
	const portfolioIdentity = `"Wissem." <${config.smtpUser}>`

	await Promise.all([
		transporter.sendMail({
			from: portfolioIdentity,
			to: config.smtpUser,
			subject: senderSubject,
			text: `Nom: ${senderName}\nEmail: ${senderEmail}\n\n${body.message}`,
			replyTo: senderEmail
		}),

		transporter.sendMail({
			from: portfolioIdentity,
			to: senderEmail,
			subject: 'Merci pour votre message',
			text: `Bonjour ${senderName},\n\nJ'ai bien reçu votre message. Je vous répondrai dès que possible.\n\nCordialement,\nWissem.`
		})
	])

	return { ok: true }
})
