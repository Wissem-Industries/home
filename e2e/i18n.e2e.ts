import { expect, test } from '@playwright/test'

test.describe('language', () => {
  test('the root follows the browser language on the first visit only', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-GB' })
    const page = await context.newPage()

    await page.goto('/')
    await expect(page).toHaveURL(/\/en$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    // Other URLs keep their own language.
    await page.goto('/projects')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    await context.close()
  })

  test('every page declares its alternates and canonical URL', async ({ page }) => {
    await page.goto('/en/projects')

    const alternates = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) =>
        links.map((link) => [link.getAttribute('hreflang'), link.getAttribute('href')]),
      )
    expect(alternates).toContainEqual(['fr-FR', expect.stringMatching(/\/projects$/)])
    expect(alternates).toContainEqual(['en-GB', expect.stringMatching(/\/en\/projects$/)])
    expect(alternates.map(([hreflang]) => hreflang)).toContain('x-default')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/projects$/)
  })

  test('switching language keeps the page and is remembered', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'fr-FR' })
    const page = await context.newPage()

    await page.goto('/projects')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: /anglais/i }).click()
    await page.getByRole('menuitem', { name: 'English' }).click()
    await expect(page).toHaveURL(/\/en\/projects$/)

    await page.goto('/')
    await expect(page).toHaveURL(/\/en$/)
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /French/i }).click()
    await page.getByRole('menuitem', { name: 'Français' }).click()
    await expect(page).toHaveURL(/\/$/)
    await context.close()
  })

  test('the sitemap lists both languages', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text()
    expect(sitemap).toContain('hreflang="en-GB"')
    expect(sitemap).toMatch(/<loc>[^<]*\/en\/contact<\/loc>/)
  })
})
