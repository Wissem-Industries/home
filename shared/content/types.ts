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
  privacyNotice: string
  privacyLink: string
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

export interface LegalSection {
  title: string
  paragraphs: string[]
  items?: string[]
}

export interface LegalPageCopy {
  intro: string
  updatedLabel: string
  updated: string
  sections: LegalSection[]
}

export type ShowcaseTone = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'

export interface ShowcaseSection {
  title: string
  description: string
}

export interface UiShowcaseCopy {
  repo: string
  facts: string[]
  sections: Record<
    'colors' | 'typography' | 'buttons' | 'glass' | 'components' | 'forms' | 'install',
    ShowcaseSection
  >
  colors: { brand: string; status: string }
  typography: { sans: string; mono: string; heading: string; body: string }
  buttons: Record<'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'disabled', string>
  glass: {
    staticTitle: string
    staticText: string
    interactiveTitle: string
    interactiveText: string
    interactiveAction: string
  }
  components: {
    example: string
    statsLabel: string
    stats: Array<{ label: string; value: string; tone: ShowcaseTone }>
    pills: Array<{ label: string; tone: ShowcaseTone }>
    segmentedLabel: string
    segments: Array<{ label: string; value: string; icon: string }>
    emptyTitle: string
    emptyDescription: string
    emptyAction: string
  }
  forms: {
    name: string
    namePlaceholder: string
    topic: string
    topics: string[]
    notify: string
    agree: string
    submit: string
    submitted: string
  }
  install: { npmrc: string; config: string }
}

export interface PortfolioContent {
  locale: LocaleCode
  navigation: {
    label: string
    home: string
    projects: string
    contact: string
    cv: string
  }
  localeSwitchLabel: string
  theme: {
    toggle: string
  }
  footer: string
  footerLinks: { legal: string; privacy: string }
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
    cv: PageContent
    legal: PageContent
    privacy: PageContent
    ui: PageContent
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
  resumePage: {
    intro: string
    previewAlt: string
    downloadFr: string
    downloadEn: string
    versionLabel: string
    updatedLabel: string
    contents: string[]
    note: string
    contactCta: string
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
  uiShowcase: UiShowcaseCopy
  legal: LegalPageCopy
  privacy: LegalPageCopy
}
