import type { ProjectPeriod, ProjectStatus } from '#shared/content/projects'

const INTL_LOCALES: Record<string, string> = { fr: 'fr-FR', en: 'en-GB' }
const SINCE: Record<string, string> = { fr: 'depuis', en: 'since' }

function parse(value: string) {
  const [year = '', month] = value.split('-')
  return { year, month: month ? Number(month) : undefined }
}

function monthName(month: number, locale: string) {
  return new Intl.DateTimeFormat(INTL_LOCALES[locale] ?? locale, {
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(2000, month - 1, 1)))
}

function label(value: string, locale: string) {
  const { year, month } = parse(value)
  return month ? `${monthName(month, locale)} ${year}` : year
}

/**
 * Human-readable period: "juin – août 2026", "depuis sept. 2026", "2025".
 * Dates are `YYYY` or `YYYY-MM`; the month is shown only when it is known.
 */
export function formatProjectPeriod(period: ProjectPeriod, status: ProjectStatus, locale: string) {
  const start = parse(period.start)

  if (!period.end) {
    const running = status === 'live' || status === 'ongoing'
    const text = label(period.start, locale)
    return running ? `${SINCE[locale] ?? 'since'} ${text}` : text
  }

  const end = parse(period.end)
  if (start.year === end.year && start.month && end.month) {
    return `${monthName(start.month, locale)} – ${monthName(end.month, locale)} ${start.year}`
  }
  return `${label(period.start, locale)} – ${label(period.end, locale)}`
}
