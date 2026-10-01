export const PROJECT_CATEGORIES = ['product', 'internship', 'studies', 'personal'] as const

export const PROJECT_STATUSES = ['live', 'ongoing', 'finished', 'archived'] as const

/**
 * Technology names are proper nouns: they are never translated, and a project
 * can only reference one of these.
 */
export const TECHNOLOGIES = [
  'Better Auth',
  'C',
  'Docker',
  'Dokploy',
  'DSFR',
  'DuckDB',
  'Excel',
  'Express',
  'Nuxt',
  'Nuxt UI',
  'PostgreSQL',
  'Python',
  'SDL2',
  'SQLite',
  'SwiftUI',
  'Tailwind CSS',
  'TypeScript',
  'VBA',
  'Vue',
  'Woodpecker CI',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]
export type ProjectStatus = (typeof PROJECT_STATUSES)[number]
export type Technology = (typeof TECHNOLOGIES)[number]

/** `YYYY` or `YYYY-MM`. A missing `end` means the project is still running. */
export interface ProjectPeriod {
  start: string
  end?: string
}

export interface ProjectLinks {
  site?: string
  code?: string
}

export interface ProjectRecord {
  id: string
  category: ProjectCategory
  status: ProjectStatus
  period: ProjectPeriod
  stack: readonly Technology[]
  links: ProjectLinks
  image: string
  featured: boolean
}

export interface ProjectTexts {
  title: string
  description: string
}

/** Language-independent project data. Texts live in the locale files. */
export const projectRecords = [
  {
    id: 'dgfip-audit-tool',
    category: 'internship',
    status: 'finished',
    period: { start: '2026-06', end: '2026-08' },
    stack: ['Python', 'SQLite', 'DuckDB'],
    links: {},
    image: '/images/projects/dgfip-audit-tool.webp',
    featured: true,
  },
  {
    id: 'wissem-move',
    category: 'product',
    status: 'live',
    period: { start: '2026-09' },
    stack: ['Nuxt', 'TypeScript', 'SwiftUI', 'PostgreSQL'],
    links: { site: 'https://move.wissem.pro' },
    image: '/images/projects/wissem-move.webp',
    featured: true,
  },
  {
    id: 'infrastructure',
    category: 'personal',
    status: 'ongoing',
    period: { start: '2026-09' },
    stack: ['Woodpecker CI', 'Docker', 'Dokploy'],
    links: {},
    image: '/images/projects/infrastructure.webp',
    featured: false,
  },
  {
    id: 'wissem-ui',
    category: 'product',
    status: 'live',
    period: { start: '2025' },
    stack: ['Nuxt', 'Nuxt UI', 'Tailwind CSS', 'TypeScript'],
    links: {
      site: 'https://www.wissem.pro',
      code: 'https://github.com/Wissem-Industries/Wissem-UI',
    },
    image: '/images/projects/portfolio.webp',
    featured: true,
  },
  {
    id: 'parcourtime',
    category: 'product',
    status: 'live',
    period: { start: '2025-04' },
    stack: ['Nuxt', 'Vue', 'DSFR'],
    links: {
      site: 'https://parcourtime.wissem.pro',
      code: 'https://github.com/Wissem-Industries/ParcourTime',
    },
    image: '/images/projects/parcourtime.webp',
    featured: false,
  },
  {
    id: 'zeldanes',
    category: 'studies',
    status: 'finished',
    period: { start: '2026' },
    stack: ['C', 'SDL2'],
    links: { code: 'https://github.com/WissemBad/ZeldaNES' },
    image: '/images/projects/zeldanes.png',
    featured: false,
  },
  {
    id: 'satt-tool',
    category: 'internship',
    status: 'finished',
    period: { start: '2025-01', end: '2025-02' },
    stack: ['Excel', 'VBA'],
    links: {},
    image: '/images/projects/satt-tool.webp',
    featured: false,
  },
  {
    id: 'internal-dashboard',
    category: 'personal',
    status: 'finished',
    period: { start: '2025' },
    stack: ['Vue', 'TypeScript', 'Express', 'PostgreSQL'],
    links: {},
    image: '/images/projects/internal-dashboard.webp',
    featured: false,
  },
  {
    id: 'password-manager',
    category: 'studies',
    status: 'finished',
    period: { start: '2024' },
    stack: ['Python'],
    links: { code: 'https://github.com/WissemBad/Password-Manager' },
    image: '/images/projects/password-manager.webp',
    featured: false,
  },
] as const satisfies readonly ProjectRecord[]

export type ProjectId = (typeof projectRecords)[number]['id']

export interface Project extends ProjectRecord {
  title: string
  description: string
  /** Category label followed by the technologies, ready to display. */
  tags: string[]
}

function compareByStartDesc(a: ProjectRecord, b: ProjectRecord) {
  return b.period.start.localeCompare(a.period.start)
}

export function resolveProjects(
  texts: Record<ProjectId, ProjectTexts>,
  categoryLabels: Record<ProjectCategory, string>,
): Project[] {
  return [...projectRecords].sort(compareByStartDesc).map((record) => ({
    ...record,
    ...texts[record.id],
    tags: [categoryLabels[record.category], ...record.stack],
  }))
}
