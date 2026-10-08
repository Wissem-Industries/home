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

// A message at its maximum length, escaped and wrapped in JSON, stays well under this size.
const MAX_BODY_BYTES = 16 * 1024

export default defineEventHandler(async (event) => {
  // Cloudflare sets CF-Connecting-IP; X-Forwarded-For can be written by the client and would let
  // anyone pick a new rate-limit key on each request.
  const ip = getRequestHeader(event, 'cf-connecting-ip') ?? getRequestIP(event) ?? 'unknown'
  if (!allowContactRequest(ip)) fail(429, 'RATE_LIMITED')

  if (Number(getRequestHeader(event, 'content-length') ?? 0) > MAX_BODY_BYTES) {
    fail(413, 'INVALID_PAYLOAD')
  }
  const raw = await readRawBody(event)
  if (raw && raw.length > MAX_BODY_BYTES) fail(413, 'INVALID_PAYLOAD')
  let body: unknown
  try {
    body = raw ? JSON.parse(raw) : undefined
  } catch {
    fail(400, 'INVALID_PAYLOAD')
  }

  const { payload, isBot } = parseContactBody(body)
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
      signal: AbortSignal.timeout(10_000),
    },
  ).catch(() => fail(502, 'DELIVERY_FAILED'))
  const result = await response.json().catch(() => null)
  if (!response.ok || !(result as { ok?: boolean } | null)?.ok) fail(502, 'DELIVERY_FAILED')

  return { ok: true as const }
})
