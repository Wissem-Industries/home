import nodemailer from 'nodemailer'
import { getContactFormErrors, normalizeContactForm, type ContactFormData } from '../../utils/contact'

export default defineEventHandler(async (event) => {
	const body = normalizeContactForm(await readBody<Partial<ContactFormData>>(event))

	if (getContactFormErrors(body).length > 0) {
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
		secure: config.smtpSecure === 'TRUE',
		auth: { user: config.smtpUser, pass: config.smtpPass }
	})

	await Promise.all([
		transporter.sendMail({
			from: `"${body.name}" <${body.email}>`,
			to: config.smtpUser,
			subject: body.subject || 'Nouveau message depuis le portfolio',
			text: `De: ${body.name} <${body.email}>\n\n` + body.message,
			replyTo: body.email
		}),

		transporter.sendMail({
			from: `"Wissem." <${config.smtpUser}>`,
			to: body.email,
			subject: 'Merci pour votre message',
			text: `Bonjour ${body.name},\n\nJ'ai bien reçu votre message. Je vous répondrai dès que possible.\n\nCordialement,\nWissem.`
		})
	])

	return { ok: true }
})
