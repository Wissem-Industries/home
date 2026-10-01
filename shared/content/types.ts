import type { ProjectCategory, ProjectId, ProjectStatus, ProjectTexts } from './projects'

export const LOCALES = ['fr', 'en'] as const

export type LocaleCode = (typeof LOCALES)[number]

export interface SeoContent {
  title: string
  description: string
}

export interface PageContent extends SeoContent {
  eyebrow: string
  heading: string
}

export interface ContactLink {
  id: 'email' | 'linkedin' | 'github' | 'website'
  label: string
  value: string
  to: string
  icon: string
}

export interface Experience {
  title: string
  organization: string
  period: string
  location?: string
  thumbnail?: string
  url?: string
  bullets: string[]
}

export interface Education {
  title: string
  institution: string
  period: string
  location?: string
  thumbnail?: string
  url?: string
  details: string[]
}

export interface SkillGroup {
  title: string
  description: string
  items: string[]
}

export interface ProfileHighlight {
  eyebrow: string
  title: string
  details: Array<{ icon: string; label: string; value: string }>
}

export interface ContactFormCopy {
  title: string
  description: string
  sidebarTitle: string
  sidebarDescription: string
  fields: Record<'name' | 'email' | 'subject' | 'message', { label: string; placeholder: string }>
  submit: string
  responseHint: string
  privacyHint: string
  privacyAriaLabel: string
  validation: Record<'name' | 'email' | 'subject' | 'message', string>
  honeypotLabel: string
  messages: {
    successTitle: string
    successDescription: string
    errorTitle: string
    errorDescription: string
    rateLimited: string
    invalidPayload: string
    unavailable: string
  }
}

export interface PortfolioContent {
  locale: LocaleCode
  navigation: {
    label: string
    home: string
    projects: string
    contact: string
  }
  localeSwitchLabel: string
  theme: {
    toggle: string
  }
  footer: string
  error: {
    title: string
    description: string
    serverTitle: string
    serverDescription: string
    home: string
  }
  meta: {
    titleTemplate: string
    applicationName: string
    defaultTitle: string
    defaultDescription: string
    socialImageAlt: string
    personDescription: string
  }
  pages: {
    home: PageContent
    projects: PageContent
    contact: PageContent
  }
  profile: {
    name: string
    avatarAlt: string
    status: string
    objective: string
    description: string
    availability: string
    internship: ProfileHighlight
    focus: ProfileHighlight
    contactCta: string
    aboutTitle: string
    about: string[]
    experienceTitle: string
    experience: Experience[]
    educationTitle: string
    education: Education[]
    skillsTitle: string
    skills: SkillGroup[]
    projectsTitle: string
    projectsDescription: string
    allProjects: string
    languagesTitle: string
    languages: Array<{ name: string; level: string; value: number }>
    interestsTitle: string
    interests: string[]
    contactTitle: string
    contactDescription: string
    locationLabel: string
    location: string
  }
  resume: {
    label: string
    href: string
    filename: string
    started: string
  }
  links: ContactLink[]
  projectActions: {
    view: string
    repo: string
    private: string
  }
  projectCategories: Record<ProjectCategory, string>
  projectStatuses: Record<ProjectStatus, string>
  projectFilters: { label: string; all: string }
  projectTexts: Record<ProjectId, ProjectTexts>
  contact: ContactFormCopy
}
