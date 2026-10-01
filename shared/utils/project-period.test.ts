import { describe, expect, test } from 'bun:test'
import { formatProjectYear } from './project-period'

describe('formatProjectYear', () => {
  test('keeps only the start year of a range', () => {
    expect(formatProjectYear({ start: '2026-06', end: '2026-08' })).toBe('2026')
    expect(formatProjectYear({ start: '2025-11', end: '2026-02' })).toBe('2025')
  })

  test('drops the month of an open period', () => {
    expect(formatProjectYear({ start: '2026-09' })).toBe('2026')
  })

  test('keeps a bare year', () => {
    expect(formatProjectYear({ start: '2024' })).toBe('2024')
  })
})
