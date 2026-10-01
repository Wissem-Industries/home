import type { ProjectPeriod } from '#shared/content/projects'

/** Year shown on a project card: the year the project started. Dates are `YYYY` or `YYYY-MM`. */
export function formatProjectYear(period: ProjectPeriod) {
  return period.start.slice(0, 4)
}
