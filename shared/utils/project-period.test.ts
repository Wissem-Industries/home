import { describe, expect, test } from 'bun:test'
import { formatProjectPeriod } from './project-period'

describe('formatProjectPeriod', () => {
  test('shows a month range inside one year', () => {
    expect(formatProjectPeriod({ start: '2026-06', end: '2026-08' }, 'finished', 'fr')).toBe(
      'juin – août 2026',
    )
  })

  test('shows both years when the period spans two', () => {
    expect(formatProjectPeriod({ start: '2025-11', end: '2026-02' }, 'finished', 'en')).toBe(
      'Nov 2025 – Feb 2026',
    )
  })

  test('marks running projects with "since"', () => {
    expect(formatProjectPeriod({ start: '2026-09' }, 'live', 'en')).toBe('since Sept 2026')
    expect(formatProjectPeriod({ start: '2025' }, 'ongoing', 'fr')).toBe('depuis 2025')
  })

  test('keeps a lone year for finished projects', () => {
    expect(formatProjectPeriod({ start: '2024' }, 'finished', 'fr')).toBe('2024')
  })
})
