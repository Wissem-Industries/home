/**
 * Captures the cover of every project that has a public interface, with the
 * same framing (1600x1000), dark appearance and no floating chrome.
 *
 * The sites are not reachable from CI or from the cloud, so this runs locally:
 *   bun scripts/screenshots.ts [id...]
 * Set CHROMIUM_PATH to reuse an installed Chromium instead of Playwright's.
 */
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'
import sharp from 'sharp'

const WIDTH = 1600
const HEIGHT = 1000
const OUTPUT_DIR = new URL('../public/images/projects/', import.meta.url)

interface Target {
  id: string
  url: string
  /** Selectors hidden before the capture (navigation, banners). */
  hide?: string[]
  /** Pause after load, for entrance animations. */
  settle?: number
}

const targets: Target[] = [
  { id: 'wissem-sso', url: 'https://sso.wissem.pro', settle: 1200 },
  {
    id: 'wissem-move',
    url: 'https://move.wissem.pro',
    // Sync notice shown to signed-out visitors.
    hide: ['main > div > p.text-warning'],
    settle: 1500,
  },
  { id: 'parcourtime', url: 'https://parcourtime.wissem.pro', settle: 1200 },
  {
    id: 'portfolio',
    url: 'https://www.wissem.pro',
    hide: ['header'],
    settle: 1500,
  },
]

const requested = new Set(process.argv.slice(2))
const selection = targets.filter((target) => requested.size === 0 || requested.has(target.id))

await mkdir(OUTPUT_DIR, { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
try {
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    colorScheme: 'dark',
    reducedMotion: 'reduce',
    locale: 'fr-FR',
  })
  for (const target of selection) {
    const page = await context.newPage()
    await page.goto(target.url, { waitUntil: 'networkidle' })
    if (target.hide?.length) {
      await page.addStyleTag({
        content: `${target.hide.join(',')} { display: none !important; }`,
      })
    }
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(target.settle ?? 800)
    const png = await page.screenshot({ type: 'png' })
    await sharp(png)
      .webp({ quality: 88 })
      .toFile(fileURLToPath(new URL(`${target.id}.webp`, OUTPUT_DIR)))
    console.log(`capture: ${target.id}`)
    await page.close()
  }
} finally {
  await browser.close()
}
