/**
 * Shared template of the project covers: the site's dark violet light, sharp
 * violet shapes and one glass element in front of them. The element is a
 * window around a desktop capture, a phone around a mobile capture, or an
 * icon tile with keywords for the projects without a public interface.
 */
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const ri = require('@iconify-json/ri/icons.json') as {
  icons: Record<string, { body: string }>
}

export const WIDTH = 1600
export const HEIGHT = 1000

export type CoverFrame =
  | { kind: 'icon'; icon: string; keywords: string[] }
  | { kind: 'window'; capture: URL; pixelated?: boolean }
  | { kind: 'phone'; capture: URL }

/**
 * One shape per cover, behind the glass element, so the blur has something to work on.
 * It changes from one cover to the next: a row of covers should not look stamped.
 */
const SHAPES = [
  'disc" style="top: 60px; right: 180px; width: 420px; height: 420px;',
  'bar" style="top: 470px; left: 60px; width: 620px; height: 96px; rotate: -18deg;',
  'disc" style="bottom: 50px; left: 170px; width: 380px; height: 380px;',
  'bar" style="top: 150px; right: 40px; width: 560px; height: 90px; rotate: 22deg;',
]

function fontUrl(path: string) {
  return pathToFileURL(require.resolve(path)).href
}

function iconSvg(name: string) {
  const icon = ri.icons[name]
  if (!icon) throw new Error(`Unknown Remix icon: ${name}`)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${icon.body}</svg>`
}

function frameHtml(frame: CoverFrame) {
  if (frame.kind === 'icon') {
    return `<div class="shape backlight"></div>
  <div class="tile glass">${iconSvg(frame.icon)}</div>
  <div class="keywords">${frame.keywords.map((word) => `<span class="glass">${word}</span>`).join('')}</div>`
  }
  const image = `<img src="${frame.capture.href}" alt=""${frame.kind === 'window' && frame.pixelated ? ' class="pixelated"' : ''}>`
  return `<div class="${frame.kind} glass">${image}</div>`
}

export function coverHtml(frame: CoverFrame, variant: number) {
  const shape =
    frame.kind === 'icon' ? '' : `<div class="shape ${SHAPES[variant % SHAPES.length]}"></div>`
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
    background: #0a0a0a;
    font-family: Geist, sans-serif;
  }
  .light {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(60% 70% at 22% 18%, rgb(124 58 237 / 0.34), transparent 70%),
      radial-gradient(55% 60% at 85% 90%, rgb(91 33 182 / 0.28), transparent 70%);
  }
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse at 50% 40%, black 15%, transparent 72%);
  }
  .shape { position: absolute; border-radius: 9999px; }
  .disc { background: linear-gradient(135deg, #a78bfa, #6d28d9); }
  .backlight {
    top: 250px;
    left: 50%;
    width: 240px;
    height: 240px;
    background: linear-gradient(135deg, #c4b5fd, #7c3aed);
    translate: 10px -40px;
  }
  .bar { background: linear-gradient(90deg, #a855f7, #4f46e5); }
  .glass {
    position: absolute;
    background:
      linear-gradient(135deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.02)),
      rgb(10 10 10 / 0.5);
    backdrop-filter: blur(28px) saturate(170%);
    box-shadow:
      0 0 0 1.5px rgb(255 255 255 / 0.14),
      inset 0 1.5px 0 rgb(255 255 255 / 0.22),
      0 40px 100px -20px rgb(0 0 0 / 0.7);
  }
  .tile {
    top: 50%;
    left: 50%;
    display: grid;
    width: 300px;
    height: 300px;
    place-items: center;
    border-radius: 80px;
    color: #fff;
    transform: translate(-50%, -62%);
  }
  .tile svg { width: 140px; height: 140px; }
  .keywords {
    position: absolute;
    right: 0;
    bottom: 170px;
    left: 0;
    display: flex;
    justify-content: center;
    gap: 16px;
  }
  .keywords span {
    position: relative;
    padding: 12px 28px;
    border-radius: 999px;
    color: rgb(255 255 255 / 0.86);
    font: 500 28px "Geist Mono", monospace;
  }
  .window {
    top: 50%;
    left: 50%;
    width: 1120px;
    padding: 14px;
    border-radius: 34px;
    transform: translate(-50%, -50%);
  }
  .window img { display: block; width: 100%; border-radius: 22px; }
  .phone {
    top: 90px;
    left: 50%;
    width: 430px;
    padding: 14px;
    border-radius: 64px;
    transform: translateX(-50%);
  }
  .phone img { display: block; width: 100%; border-radius: 50px; }
  .pixelated { image-rendering: pixelated; }
</style>
<body>
  <div class="light"></div>
  <div class="grid"></div>
  ${shape}
  ${frameHtml(frame)}
</body>
</html>`
}
