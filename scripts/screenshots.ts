/**
 * Refreshes the captures of the products that have a public interface, in
 * scripts/captures/. `bun scripts/covers.ts` then frames them into the covers.
 *
 * The sites are not reachable from CI or from the cloud, so this runs locally:
 *   bun scripts/screenshots.ts [id...]
 * WSM_HOME_URL captures another build of this site (a local server before a release).
 * Set CHROMIUM_PATH to reuse an installed Chromium instead of Playwright's.
 */
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium, type Page } from '@playwright/test'

const CAPTURES = new URL('./captures/', import.meta.url)

interface Target {
  id: string
  url: string
  /** Mobile captures go into the phone frame of the cover. */
  mobile?: boolean
  /** Selectors hidden before the capture (navigation, banners). */
  hide?: string[]
  /** Pause after load, for entrance animations. */
  settle?: number
  /** Puts the page in a showable state before the capture. */
  prepare?: (page: Page) => Promise<void>
}

const targets: Target[] = [
  {
    id: 'move',
    url: 'https://move.wissem.pro',
    mobile: true,
    // Sync notice shown to signed-out visitors.
    hide: ['main > div > p.text-warning'],
    // The empty home only offers examples: open one to show a real board.
    prepare: async (page) => {
      await page.getByRole('button', { name: /Gare de Douai/ }).click()
      await page.getByText(/Mis à jour à/).waitFor()
    },
    settle: 1500,
  },
  { id: 'parcourtime', url: 'https://parcourtime.wissem.pro', settle: 1200 },
  { id: 'portfolio', url: process.env.WSM_HOME_URL || 'https://www.wissem.pro', settle: 1500 },
]

const requested = new Set(process.argv.slice(2))
const selection = targets.filter((target) => requested.size === 0 || requested.has(target.id))

await mkdir(CAPTURES, { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
try {
  for (const target of selection) {
    const context = await browser.newContext({
      viewport: target.mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      deviceScaleFactor: target.mobile ? 2 : 1,
      colorScheme: 'dark',
      reducedMotion: 'reduce',
      locale: 'fr-FR',
    })
    const page = await context.newPage()
    await page.goto(target.url, { waitUntil: 'networkidle' })
    await target.prepare?.(page)
    if (target.hide?.length) {
      await page.addStyleTag({
        content: `${target.hide.join(',')} { display: none !important; }`,
      })
    }
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(target.settle ?? 800)
    await page.screenshot({ path: fileURLToPath(new URL(`${target.id}.png`, CAPTURES)) })
    console.log(`capture: ${target.id}`)
    await context.close()
  }
} finally {
  await browser.close()
}
