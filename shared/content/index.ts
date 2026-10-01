import { en } from './en'
import { fr } from './fr'
import { type Project, resolveProjects } from './projects'
import type { LocaleCode, PortfolioContent } from './types'

export * from './projects'
export * from './types'

// Shows the internship card on the home page. The texts stay in the locale files.
export const SEEKING_INTERNSHIP = false

export const contentByLocale = { fr, en } satisfies Record<LocaleCode, PortfolioContent>

export type ResolvedPortfolioContent = PortfolioContent & {
  projects: Project[]
  seekingInternship: boolean
}

const resolved = {} as Record<LocaleCode, ResolvedPortfolioContent>

export function getPortfolioContent(locale: string): ResolvedPortfolioContent {
  const code: LocaleCode = locale in contentByLocale ? (locale as LocaleCode) : 'fr'
  resolved[code] ??= {
    ...contentByLocale[code],
    seekingInternship: SEEKING_INTERNSHIP,
    projects: resolveProjects(
      contentByLocale[code].projectTexts,
      contentByLocale[code].projectCategories,
    ),
  }
  return resolved[code]
}
