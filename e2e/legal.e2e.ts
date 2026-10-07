import { expect, test } from '@playwright/test'

test.describe('legal pages', () => {
  test('the footer links to the legal notice and the privacy policy', async ({ page }) => {
    await page.goto('/projects')
    await page.waitForLoadState('networkidle')
    const footer = page.getByRole('contentinfo')

    await footer.getByRole('link', { name: 'Mentions légales' }).click()
    await expect(page).toHaveURL(/\/legal$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Mentions légales' })).toBeVisible()
    await expect(page.getByText('OVH SAS')).toBeVisible()

    await footer.getByRole('link', { name: 'Confidentialité' }).click()
    await expect(page).toHaveURL(/\/privacy$/)
    await expect(page.getByText('Telegram').first()).toBeVisible()
  })

  test('the English pages keep their language', async ({ page }) => {
    await page.goto('/en/privacy')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1, name: 'Privacy' })).toBeVisible()
    await page.getByRole('contentinfo').getByRole('link', { name: 'Legal notice' }).click()
    await expect(page).toHaveURL(/\/en\/legal$/)
  })

  test('the contact form shows the notice and links to the policy', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
    await expect(page.getByText(/Telegram/)).toBeVisible()
    await page.getByRole('link', { name: 'Politique de confidentialité' }).click()
    await expect(page).toHaveURL(/\/privacy$/)
  })

  test('the visitor can stop the audience measurement', async ({ page }) => {
    await page.goto('/privacy')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Ne plus compter mes visites' }).click()
    expect(await page.evaluate(() => localStorage.getItem('plausible_ignore'))).toBe('true')

    await page.getByRole('button', { name: 'Réactiver le comptage' }).click()
    expect(await page.evaluate(() => localStorage.getItem('plausible_ignore'))).toBeNull()
  })

  test('both pages are in the sitemap', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text()
    for (const path of ['/legal', '/privacy', '/en/legal', '/en/privacy']) {
      expect(sitemap).toMatch(new RegExp(`<loc>[^<]*${path}</loc>`))
    }
  })
})
