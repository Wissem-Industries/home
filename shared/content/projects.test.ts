import { describe, expect, test } from 'bun:test'
import { getPortfolioContent, LOCALES } from './index'
import { projectRecords, TECHNOLOGIES } from './projects'

describe('project data', () => {
  test('ids are unique', () => {
    const ids = projectRecords.map((record) => record.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('only references the controlled technology vocabulary', () => {
    const known = new Set<string>(TECHNOLOGIES)
    for (const record of projectRecords) {
      for (const tech of record.stack) expect(known.has(tech)).toBe(true)
    }
  })

  test('every locale resolves every project with texts and tags', () => {
    for (const locale of LOCALES) {
      const { projects } = getPortfolioContent(locale)
      expect(projects).toHaveLength(projectRecords.length)
      for (const project of projects) {
        expect(project.title.length).toBeGreaterThan(0)
        expect(project.description.length).toBeGreaterThan(0)
        expect(project.tags[0]?.length).toBeGreaterThan(0)
      }
    }
  })

  test('projects are sorted by start date, most recent first', () => {
    const starts = getPortfolioContent('fr').projects.map((p) => p.period.start)
    expect(starts).toEqual([...starts].sort((a, b) => b.localeCompare(a)))
  })
})
