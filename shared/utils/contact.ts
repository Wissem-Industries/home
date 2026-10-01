import * as v from 'valibot'

export type ContactField = 'name' | 'email' | 'subject' | 'message'
export type ContactErrorCode =
  | 'INVALID_PAYLOAD'
  | 'RATE_LIMITED'
  | 'SERVICE_UNAVAILABLE'
  | 'DELIVERY_FAILED'

// The message goes into one Telegram message, which is limited to 4096
// characters once escaped.
export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 10, max: 3000 },
} as const

export const CONTACT_HONEYPOT_FIELD = 'website'

/**
 * Schema shared by the form and the API. `messages` holds the error text of
 * each field; the API does not need it.
 */
export function createContactSchema(messages: Record<ContactField, string>) {
  return v.object({
    name: v.pipe(
      v.string(messages.name),
      v.trim(),
      v.minLength(CONTACT_LIMITS.name.min, messages.name),
      v.maxLength(CONTACT_LIMITS.name.max, messages.name),
    ),
    email: v.pipe(
      v.string(messages.email),
      v.trim(),
      v.email(messages.email),
      v.maxLength(CONTACT_LIMITS.email.max, messages.email),
    ),
    subject: v.pipe(
      v.string(messages.subject),
      v.trim(),
      v.minLength(CONTACT_LIMITS.subject.min, messages.subject),
      v.maxLength(CONTACT_LIMITS.subject.max, messages.subject),
    ),
    message: v.pipe(
      v.string(messages.message),
      v.trim(),
      v.minLength(CONTACT_LIMITS.message.min, messages.message),
      v.maxLength(CONTACT_LIMITS.message.max, messages.message),
    ),
  })
}

const apiSchema = createContactSchema({
  name: 'name',
  email: 'email',
  subject: 'subject',
  message: 'message',
})

export type ContactPayload = v.InferOutput<typeof apiSchema>

export function createEmptyContactPayload(): ContactPayload & { website: string } {
  return { name: '', email: '', subject: '', message: '', website: '' }
}

/** Validates a request body. A filled honeypot field marks the sender as a bot. */
export function parseContactBody(body: unknown) {
  const result = v.safeParse(apiSchema, body)
  const honeypot =
    typeof body === 'object' && body !== null
      ? (body as Record<string, unknown>)[CONTACT_HONEYPOT_FIELD]
      : undefined

  return {
    payload: result.success ? result.output : undefined,
    isBot: typeof honeypot === 'string' && honeypot.trim() !== '',
  }
}
