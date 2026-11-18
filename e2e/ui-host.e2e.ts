import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// playwright.config.ts serves the UI host on ui.localhost, next to the main site on localhost.
const uiHost = (path: string) => new URL(path, 'http://ui.localhost:4173').toString()

test.describe('Wissem UI host', () => {
  // The root follows the browser language, as on the main site.
  test.use({ locale: 'fr-FR' })

  for (const [path, heading] of [
    ['/', 'Couleurs'],
    ['/en', 'Colours'],
  ] as const) {
    test(`${path} renders the UI page`, async ({ page }) => {
      await page.goto(uiHost(path), { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toHaveText('Wissem UI')
      await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible()
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', uiHost(path))

      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual(
        [],
      )
    })
  }

  for (const [path, name, target] of [
    ['/', 'Projets', '/projects'],
    ['/en', 'Projects', '/en/projects'],
  ] as const) {
    test(`the navigation of ${path} leads back to the main site`, async ({ page }) => {
      await page.goto(uiHost(path))
      const href = await page.getByRole('link', { name, exact: true }).getAttribute('href')
      const url = new URL(href ?? '')
      expect(url.hostname).not.toMatch(/^ui\./)
      expect(url.pathname).toBe(target)
    })
  }

  test('main site pages move off the UI host', async ({ request }) => {
    const response = await request.get(uiHost('/projects'), { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    expect(new URL(response.headers().location ?? '').pathname).toBe('/projects')
  })

  test('the main site sends /ui to the UI host', async ({ request }) => {
    const fr = await request.get('/ui', { maxRedirects: 0 })
    expect(fr.status()).toBe(301)
    expect(fr.headers().location).toBe(uiHost('/'))

    const en = await request.get('/en/ui', { maxRedirects: 0 })
    expect(en.status()).toBe(301)
    expect(en.headers().location).toBe(uiHost('/en'))
  })

  test('the UI host has its own sitemap', async ({ request }) => {
    const sitemap = await (await request.get(uiHost('/sitemap.xml'))).text()
    expect(sitemap).toContain(`<loc>${uiHost('/')}</loc>`)
    expect(sitemap).toContain(`<loc>${uiHost('/en')}</loc>`)
    expect(sitemap).not.toContain('/projects')
  })
})
