/**
 * Builds every project cover from the shared template (scripts/cover-template.ts).
 * Products with an interface use their capture from scripts/captures/ (refreshed by
 * `bun scripts/screenshots.ts`); the others get an icon tile, with no internal content.
 *
 * Usage: bun scripts/covers.ts [id...]
 */
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { type CoverFrame, coverHtml, HEIGHT, WIDTH } from './cover-template'

const OUTPUT_DIR = new URL('../public/images/projects/', import.meta.url)
const CAPTURES = new URL('./captures/', import.meta.url)

const covers: Array<{ id: string; frame: CoverFrame }> = [
  { id: 'move', frame: { kind: 'phone', capture: new URL('move.png', CAPTURES) } },
  { id: 'portfolio', frame: { kind: 'window', capture: new URL('portfolio.png', CAPTURES) } },
  { id: 'parcourtime', frame: { kind: 'window', capture: new URL('parcourtime.png', CAPTURES) } },
  {
    id: 'zeldanes',
    frame: { kind: 'window', capture: new URL('zeldanes.png', CAPTURES), pixelated: true },
  },
  {
    id: 'dgfip-audit-tool',
    frame: { kind: 'icon', icon: 'database-2-line', keywords: ['Python', 'SQLite', 'DuckDB'] },
  },
  {
    id: 'infrastructure',
    frame: { kind: 'icon', icon: 'server-line', keywords: ['CI/CD', 'Docker', 'Dokploy'] },
  },
  { id: 'satt-tool', frame: { kind: 'icon', icon: 'table-line', keywords: ['Excel', 'VBA'] } },
  {
    id: 'internal-dashboard',
    frame: {
      kind: 'icon',
      icon: 'shield-user-line',
      keywords: ['Vue', 'TypeScript', 'PostgreSQL'],
    },
  },
  {
    id: 'password-manager',
    frame: { kind: 'icon', icon: 'lock-password-line', keywords: ['Python', 'CLI'] },
  },
]

const requested = new Set(process.argv.slice(2))

await mkdir(OUTPUT_DIR, { recursive: true })
const workDir = await mkdtemp(join(tmpdir(), 'wsm-covers-'))
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
  for (const [index, cover] of covers.entries()) {
    if (requested.size > 0 && !requested.has(cover.id)) continue
    const html = join(workDir, `${cover.id}.html`)
    await writeFile(html, coverHtml(cover.frame, index))
    await page.goto(pathToFileURL(html).href, { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    const png = await page.screenshot({ type: 'png' })
    await sharp(png)
      .webp({ quality: 88 })
      .toFile(fileURLToPath(new URL(`${cover.id}.webp`, OUTPUT_DIR)))
    console.log(`cover: ${cover.id}`)
  }
} finally {
  await browser.close()
}
