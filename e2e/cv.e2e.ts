import { expect, test } from '@playwright/test'

test.describe('resume page', () => {
  test('presents the resume and links to both PDFs', async ({ page }) => {
    await page.goto('/cv')
    await expect(page.getByRole('heading', { level: 1, name: 'CV' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Télécharger en français' })).toHaveAttribute(
      'href',
      '/cv.pdf',
    )
    await expect(page.getByRole('link', { name: 'Télécharger en anglais' })).toHaveAttribute(
      'href',
      '/en/cv.pdf',
    )
  })

  test('the English page shares its own preview image', async ({ page }) => {
    await page.goto('/en/cv')
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /\/en\/cv-social\.png$/,
    )
    await expect(page.getByRole('link', { name: 'Download in English' })).toHaveAttribute(
      'href',
      '/en/cv.pdf',
    )
  })

  test('is not part of the main navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation').getByRole('link', { name: 'CV' })).toHaveCount(0)
  })
})
