/**
 * Shared template of the project covers, built like the site's hero: one glass
 * element (a window around a desktop capture, a phone around a mobile capture,
 * or an icon tile for the projects without an interface), two violet shapes
 * tucked behind its corners and a small glass lens over one of them.
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
 * Four compositions, mirrored two by two. Offsets are relative to the glass
 * element and scaled by its size (`--k`), so every shape stays anchored to it.
 */
const COMPOSITIONS = [
  `<i class="shape disc" style="top: calc(-90px * var(--k)); right: calc(-150px * var(--k)); width: calc(380px * var(--k)); height: calc(380px * var(--k));"></i>
   <i class="shape bar" style="bottom: calc(-36px * var(--k)); left: calc(-190px * var(--k)); width: calc(430px * var(--k)); height: calc(72px * var(--k)); rotate: -18deg;"></i>
   <i class="lens glass" style="top: calc(105px * var(--k)); right: calc(-160px * var(--k)); width: calc(130px * var(--k)); height: calc(130px * var(--k));"></i>`,
  `<i class="shape disc" style="bottom: calc(-90px * var(--k)); left: calc(-150px * var(--k)); width: calc(380px * var(--k)); height: calc(380px * var(--k));"></i>
   <i class="shape bar" style="top: calc(-36px * var(--k)); right: calc(-190px * var(--k)); width: calc(430px * var(--k)); height: calc(72px * var(--k)); rotate: -18deg;"></i>
   <i class="lens glass" style="bottom: calc(105px * var(--k)); left: calc(-160px * var(--k)); width: calc(130px * var(--k)); height: calc(130px * var(--k));"></i>`,
  `<i class="shape dot" style="top: calc(-80px * var(--k)); left: calc(-110px * var(--k)); width: calc(230px * var(--k)); height: calc(230px * var(--k));"></i>
   <i class="shape bar" style="bottom: calc(60px * var(--k)); right: calc(-250px * var(--k)); width: calc(520px * var(--k)); height: calc(80px * var(--k)); rotate: 24deg;"></i>
   <i class="lens glass" style="bottom: calc(10px * var(--k)); right: calc(-150px * var(--k)); width: calc(230px * var(--k)); height: calc(70px * var(--k)); rotate: 24deg;"></i>`,
  `<i class="shape dot" style="bottom: calc(-80px * var(--k)); right: calc(-110px * var(--k)); width: calc(230px * var(--k)); height: calc(230px * var(--k));"></i>
   <i class="shape bar" style="top: calc(60px * var(--k)); left: calc(-250px * var(--k)); width: calc(520px * var(--k)); height: calc(80px * var(--k)); rotate: 24deg;"></i>
   <i class="lens glass" style="top: calc(10px * var(--k)); left: calc(-150px * var(--k)); width: calc(230px * var(--k)); height: calc(70px * var(--k)); rotate: 24deg;"></i>`,
]

function fontUrl(path: string) {
  return pathToFileURL(require.resolve(path)).href
}

function iconSvg(name: string) {
  const icon = ri.icons[name]
  if (!icon) throw new Error(`Unknown Remix icon: ${name}`)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${icon.body}</svg>`
}

function frameHtml(frame: CoverFrame, composition: string) {
  const content =
    frame.kind === 'icon'
      ? iconSvg(frame.icon)
      : `<img src="${frame.capture.href}" alt=""${frame.kind === 'window' && frame.pixelated ? ' class="pixelated"' : ''}>`
  const stage = `<div class="stage stage--${frame.kind}">
    ${composition}
    <div class="frame frame--${frame.kind} glass">${content}</div>
  </div>`
  if (frame.kind !== 'icon') return stage
  return `${stage}
  <div class="keywords">${frame.keywords.map((word) => `<span class="glass">${word}</span>`).join('')}</div>`
}

/** `variant` picks the composition; neighbouring projects get different ones. */
export function coverHtml(frame: CoverFrame, variant: number) {
  const composition = COMPOSITIONS[variant % COMPOSITIONS.length] ?? ''
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
  .glass {
    background:
      linear-gradient(135deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.02)),
      rgb(10 10 10 / 0.5);
    backdrop-filter: blur(28px) saturate(170%);
    box-shadow:
      0 0 0 1.5px rgb(255 255 255 / 0.14),
      inset 0 1.5px 0 rgb(255 255 255 / 0.22),
      0 40px 100px -20px rgb(0 0 0 / 0.7);
  }
  .stage { position: absolute; left: 50%; }
  .stage--window { --k: 1; top: 50%; width: 1120px; transform: translate(-50%, -50%); }
  .stage--phone { --k: 0.8; top: 90px; width: 430px; transform: translateX(-50%); }
  .stage--icon { --k: 0.6; top: 50%; width: 300px; height: 300px; transform: translate(-50%, -62%); }
  .shape, .lens { position: absolute; border-radius: 9999px; }
  .disc { background: linear-gradient(135deg, #a78bfa, #6d28d9); }
  .dot { background: linear-gradient(135deg, #c4b5fd, #8b5cf6); }
  .bar { background: linear-gradient(90deg, #a855f7, #4f46e5); }
  .lens { background: rgb(255 255 255 / 0.04); backdrop-filter: blur(14px) saturate(200%); }
  .frame { position: relative; padding: 14px; }
  .frame img { display: block; width: 100%; }
  .frame--window { border-radius: 34px; }
  .frame--window img { border-radius: 22px; }
  .frame--phone { border-radius: 64px; }
  .frame--phone img { border-radius: 50px; }
  .frame--icon {
    display: grid;
    width: 100%;
    height: 100%;
    place-items: center;
    padding: 0;
    border-radius: 80px;
    color: #fff;
  }
  .frame--icon svg { width: 140px; height: 140px; }
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
    padding: 12px 28px;
    border-radius: 999px;
    color: rgb(255 255 255 / 0.86);
    font: 500 28px "Geist Mono", monospace;
  }
  .pixelated { image-rendering: pixelated; }
</style>
<body>
  <div class="light"></div>
  <div class="grid"></div>
  ${frameHtml(frame, composition)}
</body>
</html>`
}
