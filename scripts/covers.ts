/**
 * Generates the illustrated covers of the projects that have no public
 * interface to capture. Every cover shares the same template: background,
 * grid, icon and keywords. No internal content is ever drawn on them.
 *
 * Usage: bun scripts/covers.ts [id...]
 */
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const ri = require('@iconify-json/ri/icons.json') as {
  icons: Record<string, { body: string }>
}

const WIDTH = 1600
const HEIGHT = 1000
const OUTPUT_DIR = new URL('../public/images/projects/', import.meta.url)

interface Cover {
  id: string
  icon: string
  keywords: string[]
}

const covers: Cover[] = [
  {
    id: 'dgfip-audit-tool',
    icon: 'database-2-line',
    keywords: ['Python', 'SQLite', 'DuckDB'],
  },
  {
    id: 'infrastructure',
    icon: 'server-line',
    keywords: ['CI/CD', 'Docker', 'Dokploy'],
  },
  {
    id: 'satt-tool',
    icon: 'table-line',
    keywords: ['Excel', 'VBA'],
  },
  {
    id: 'internal-dashboard',
    icon: 'shield-user-line',
    keywords: ['Vue', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'password-manager',
    icon: 'lock-password-line',
    keywords: ['Python', 'CLI'],
  },
]

function fontUrl(path: string) {
  return pathToFileURL(require.resolve(path)).href
}

function iconSvg(name: string) {
  const icon = ri.icons[name]
  if (!icon) throw new Error(`Unknown Remix icon: ${name}`)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${icon.body}</svg>`
}

function template(cover: Cover) {
  const sans = fontUrl('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')
  const mono = fontUrl('@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<style>
  @font-face { font-family: Geist; src: url("${sans}"); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono"; src: url("${mono}"); font-weight: 100 900; }
  * { box-sizing: border-box; margin: 0; }
  body {
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    background: linear-gradient(160deg, #0a0a0a 0%, #15101f 100%);
    font-family: Geist, sans-serif;
  }
  .glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
  }
  .glow--a { top: -220px; right: -120px; width: 900px; height: 900px; background: #8e51ff; opacity: 0.38; }
  .glow--b { bottom: -320px; left: -200px; width: 800px; height: 800px; background: #5d0ec0; opacity: 0.3; }
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.055) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%);
  }
  .tile {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    width: 320px;
    height: 320px;
    place-items: center;
    border: 2px solid rgba(255, 255, 255, 0.22);
    border-radius: 88px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04));
    box-shadow:
      inset 0 2px 0 rgba(255, 255, 255, 0.35),
      0 40px 120px rgba(142, 81, 255, 0.35);
    color: #fff;
    transform: translate(-50%, -58%);
  }
  .tile svg { width: 168px; height: 168px; }
  .keywords {
    position: absolute;
    right: 0;
    bottom: 96px;
    left: 0;
    display: flex;
    justify-content: center;
    gap: 16px;
  }
  .keywords span {
    padding: 12px 28px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.82);
    font: 500 28px "Geist Mono", monospace;
  }
</style>
<body>
  <div class="glow glow--a"></div>
  <div class="glow glow--b"></div>
  <div class="grid"></div>
  <div class="tile">${iconSvg(cover.icon)}</div>
  <div class="keywords">${cover.keywords.map((word) => `<span>${word}</span>`).join('')}</div>
</body>
</html>`
}

const requested = new Set(process.argv.slice(2))
const selection = covers.filter((cover) => requested.size === 0 || requested.has(cover.id))

await mkdir(OUTPUT_DIR, { recursive: true })
const workDir = await mkdtemp(join(tmpdir(), 'wissem-covers-'))
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
  for (const cover of selection) {
    const html = join(workDir, `${cover.id}.html`)
    await writeFile(html, template(cover))
    await page.goto(pathToFileURL(html).href)
    await page.evaluate(() => document.fonts.ready)
    const png = await page.screenshot({ type: 'png' })
    await sharp(png)
      .webp({ quality: 88 })
      .toFile(new URL(`${cover.id}.webp`, OUTPUT_DIR).pathname)
    console.log(`cover: ${cover.id}`)
  }
} finally {
  await browser.close()
}
