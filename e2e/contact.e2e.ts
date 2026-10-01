import { expect, test } from '@playwright/test'

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Collaboration',
  message: 'Un message assez long pour passer la validation.',
}

test.describe('contact form', () => {
  test('shows an error under each invalid field', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Envoyer le message' }).click()

    for (const text of [
      /nom doit comporter/,
      /adresse email/,
      /sujet doit comporter/,
      /message doit comporter/,
    ]) {
      await expect(page.getByText(text)).toBeVisible()
    }
  })

  test('sends the message and empties the form', async ({ page }) => {
    let body: Record<string, string> | undefined
    await page.route('**/api/contact', async (route) => {
      body = route.request().postDataJSON()
      await route.fulfill({ json: { ok: true } })
    })

    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
    await page.getByRole('textbox', { name: 'Nom' }).fill(valid.name)
    await page.getByRole('textbox', { name: 'Email' }).fill(valid.email)
    await page.getByRole('textbox', { name: 'Sujet' }).fill(valid.subject)
    await page.getByRole('textbox', { name: 'Message' }).fill(valid.message)
    await page.getByRole('button', { name: 'Envoyer le message' }).click()

    await expect(page.getByText('Message envoyé', { exact: true })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Nom' })).toHaveValue('')
    expect(body).toMatchObject(valid)
    expect(body?.website).toBe('')
  })

  test('keeps the honeypot out of reach of people and assistive technologies', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
    const field = page.locator('input[name="website"]')
    await expect(field).toHaveAttribute('tabindex', '-1')
    await expect(page.getByRole('textbox', { name: 'Laisser ce champ vide' })).toHaveCount(0)
    expect((await field.boundingBox())?.x).toBeLessThan(0)
  })

  test('the API accepts a bot silently and rejects an invalid body', async ({ request }) => {
    const bot = await request.post('/api/contact', {
      data: { ...valid, website: 'https://spam.example' },
    })
    expect(bot.status()).toBe(200)
    expect(await bot.json()).toEqual({ ok: true })

    const invalid = await request.post('/api/contact', { data: { ...valid, email: 'nope' } })
    expect(invalid.status()).toBe(400)

    // Without Telegram credentials a valid message is refused, never forwarded.
    const unavailable = await request.post('/api/contact', { data: valid })
    expect(unavailable.status()).toBe(503)
  })
})
