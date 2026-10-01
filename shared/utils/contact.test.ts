import { describe, expect, test } from 'bun:test'
import * as v from 'valibot'
import { CONTACT_LIMITS, createContactSchema, parseContactBody } from './contact'

const messages = { name: 'n', email: 'e', subject: 's', message: 'm' }
const valid = {
  name: '  Wissem  ',
  email: ' contact@example.com ',
  subject: ' Hello ',
  message: ' A useful message with enough characters. ',
}

describe('contact schema', () => {
  test('reports every invalid field with its own message', () => {
    const result = v.safeParse(createContactSchema(messages), {
      name: '',
      email: 'nope',
      subject: '',
      message: '',
    })
    expect(result.success).toBe(false)
    const fields = new Set(result.issues?.map((issue) => issue.path?.[0].key))
    expect(fields).toEqual(new Set(['name', 'email', 'subject', 'message']))
  })

  test('trims and accepts a complete payload', () => {
    const result = parseContactBody(valid)
    expect(result.payload?.name).toBe('Wissem')
    expect(result.payload?.email).toBe('contact@example.com')
    expect(result.isBot).toBe(false)
  })

  test('rejects a message longer than the limit', () => {
    const message = 'x'.repeat(CONTACT_LIMITS.message.max + 1)
    expect(parseContactBody({ ...valid, message }).payload).toBeUndefined()
  })

  test('rejects a body that is not an object', () => {
    expect(parseContactBody(null).payload).toBeUndefined()
    expect(parseContactBody('text').payload).toBeUndefined()
  })
})

describe('honeypot', () => {
  test('flags a filled hidden field', () => {
    expect(parseContactBody({ ...valid, website: 'https://spam.example' }).isBot).toBe(true)
  })

  test('ignores an empty hidden field', () => {
    expect(parseContactBody({ ...valid, website: '  ' }).isBot).toBe(false)
  })
})
