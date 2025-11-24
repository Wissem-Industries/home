import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
	const body = await readBody<{
		name: string
		email: string
		subject?: string
		message: string
	}>(event)

	if (!body.name || !body.email || !body.message)
		throw createError({ statusCode: 400, statusMessage: 'Invalid data' })

	const config = useRuntimeConfig()
	const transporter = nodemailer.createTransport({
		host: config.smtpHost,
		port: Number(config.smtpPort),
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
