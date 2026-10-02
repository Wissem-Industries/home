/**
 * Generates the 1200×630 sharing images, one per language, from the site
 * content. Output: public/images/og-<locale>.png.
 *
 * Usage: bun scripts/og.ts
 */
import { mkdtemp, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import { contentByLocale } from '../shared/content'

const require = createRequire(import.meta.url)

const WIDTH = 1200
const HEIGHT = 630
const OUTPUT_DIR = new URL('../public/images/', import.meta.url)

function fontUrl(path: string) {
  return pathToFileURL(require.resolve(path)).href
}

function template(locale: keyof typeof contentByLocale) {
  const { profile, meta } = contentByLocale[locale]
  const sans = fontUrl('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')
  const mono = fontUrl('@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')
  const logo = pathToFileURL(fileURLToPath(new URL('Logo_White.svg', OUTPUT_DIR))).href
  const shot = (name: string) =>
    pathToFileURL(fileURLToPath(new URL(`projects/${name}.webp`, OUTPUT_DIR))).href
  return `<!doctype html>
<html lang="${locale}">
<meta charset="utf-8">
<style>
  @font-face { font-family: Geist; src: url("${sans}"); font-weight: 100 900; }
  @font-face { font-family: "Geist Mono"; src: url("${mono}"); font-weight: 100 900; }
  * { box-sizing: border-box; margin: 0; }
  body {
    position: relative;
    display: flex;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    padding: 72px 80px;
    background: linear-gradient(160deg, #0a0a0a 0%, #15101f 100%);
    color: #fafafa;
    font-family: Geist, sans-serif;
  }
  .glow { position: absolute; border-radius: 50%; filter: blur(110px); }
  .glow--a { top: -240px; right: -160px; width: 720px; height: 720px; background: #8e51ff; opacity: 0.36; }
  .glow--b { bottom: -300px; left: -200px; width: 620px; height: 620px; background: #5d0ec0; opacity: 0.28; }
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: linear-gradient(to bottom, black, transparent 85%);
  }
  .text { position: relative; width: 600px; }
  .logo { width: 72px; height: 72px; }
  .url { font: 500 26px "Geist Mono", monospace; color: rgba(250, 250, 250, 0.6); }
  h1 { font-size: 104px; font-weight: 600; letter-spacing: -0.05em; line-height: 0.98; }
  .status { margin-top: 28px; font-size: 36px; font-weight: 500; color: rgba(250, 250, 250, 0.86); }
  .shot {
    position: absolute;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px;
    background: #0a0a0a;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
  }
  .shot img { display: block; width: 100%; }
  .shot--main { top: 92px; left: 660px; width: 600px; transform: rotate(-4deg); }
  .shot--side { top: 360px; left: 760px; width: 420px; transform: rotate(3deg); }
</style>
<body>
  <div class="glow glow--a"></div>
  <div class="glow glow--b"></div>
  <div class="grid"></div>
  <div class="shot shot--main"><img src="${shot('move')}" alt=""></div>
  <div class="shot shot--side"><img src="${shot('portfolio')}" alt=""></div>
  <div class="text"><img class="logo" src="${logo}" alt=""></div>
  <div class="text">
    <h1>Wissem<br>Badraoui</h1>
    <p class="status">${profile.status}</p>
  </div>
  <div class="text"><span class="url">www.wissem.pro</span></div>
  <title>${meta.defaultTitle}</title>
</body>
</html>`
}

const workDir = await mkdtemp(join(tmpdir(), 'wissem-og-'))
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
  for (const locale of Object.keys(contentByLocale) as Array<keyof typeof contentByLocale>) {
    const html = join(workDir, `og-${locale}.html`)
    await writeFile(html, template(locale))
    await page.goto(pathToFileURL(html).href)
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({
      path: fileURLToPath(new URL(`og-${locale}.png`, OUTPUT_DIR)),
      type: 'png',
    })
    console.log(`og: ${locale}`)
  }
} finally {
  await browser.close()
}
