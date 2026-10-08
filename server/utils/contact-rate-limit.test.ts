import { beforeEach, describe, expect, test } from 'bun:test'
import { allowContactRequest, resetContactRateLimits } from './contact-rate-limit'

describe('contact rate limit', () => {
  beforeEach(resetContactRateLimits)

  test('allows five requests per window', () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(allowContactRequest('127.0.0.1', 1_000)).toBe(true)
    }
    expect(allowContactRequest('127.0.0.1', 1_000)).toBe(false)
  })

  test('resets after five minutes', () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      allowContactRequest('127.0.0.1', 1_000)
    }
    expect(allowContactRequest('127.0.0.1', 301_001)).toBe(true)
  })

  test('keeps a bounded number of addresses and drops the oldest first', () => {
    for (let index = 0; index < 10_001; index += 1) {
      allowContactRequest(`10.0.${Math.floor(index / 256)}.${index % 256}`, 1_000)
    }
    // The first address was evicted: it starts a fresh window instead of being refused.
    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(allowContactRequest('10.0.0.0', 1_000)).toBe(true)
    }
    expect(allowContactRequest('10.0.0.0', 1_000)).toBe(false)
  })
})
