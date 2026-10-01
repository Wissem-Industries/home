import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = ['/', '/projects', '/contact', '/en', '/en/projects', '/en/contact']

for (const scheme of ['light', 'dark'] as const) {
  for (const path of pages) {
    test(`${path} has no serious accessibility violation (${scheme})`, async ({ browser }) => {
      const context = await browser.newContext({ colorScheme: scheme })
      const page = await context.newPage()
      await page.goto(path, { waitUntil: 'networkidle' })

      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      const blocking = violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      )

      expect(
        blocking.map((violation) => ({
          id: violation.id,
          targets: violation.nodes.map((node) => node.target.join(' ')),
        })),
      ).toEqual([])
      await context.close()
    })
  }
}
