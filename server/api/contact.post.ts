import type { ContactErrorCode } from '#shared/utils/contact'
import { parseContactBody } from '#shared/utils/contact'
import { allowContactRequest } from '../utils/contact-rate-limit'

function fail(statusCode: number, code: ContactErrorCode): never {
  throw createError({ statusCode, statusMessage: code, data: { code } })
}

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

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  if (!allowContactRequest(ip)) fail(429, 'RATE_LIMITED')

  const { payload, isBot } = parseContactBody(await readBody(event))
  // Bots get the same answer as a delivered message, so they learn nothing.
  if (isBot) return { ok: true as const }
  if (!payload) fail(400, 'INVALID_PAYLOAD')

  const config = useRuntimeConfig(event)
  if (!config.telegramBotToken || !config.telegramChatId) {
    fail(503, 'SERVICE_UNAVAILABLE')
  }

  const html = [
    '📩 · <b>New portfolio message</b>',
    '',
    `<b>Name</b>: ${escapeTelegramHtml(sanitizeInline(payload.name))}`,
    `<b>Email</b>: <code>${escapeTelegramHtml(sanitizeInline(payload.email))}</code>`,
    `<b>Subject</b>: ${escapeTelegramHtml(sanitizeInline(payload.subject))}`,
    '',
    '<b>Message</b>',
    escapeTelegramHtml(payload.message.trim()),
  ].join('\n')

  const response = await fetch(
    `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.telegramChatId,
        text: html,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    },
  )
  const result = await response.json().catch(() => null)
  if (!response.ok || !(result as { ok?: boolean } | null)?.ok) fail(502, 'DELIVERY_FAILED')

  return { ok: true as const }
})
