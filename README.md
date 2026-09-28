# Wissem Home

<p align="center">
  <strong>Wissem Home V3 — Wissem’s personal portfolio.</strong><br />
  Profile, projects and contact information at <a href="https://www.wissem.pro">wissem.pro</a>.
</p>

<p align="center">
  <a href="https://ci.wissem.pro/repos/3"><img alt="Woodpecker CI" src="https://ci.wissem.pro/api/badges/3/status.svg" /></a>
  <a href="https://github.com/Wissem-Industries/Wissem-Home/releases"><img alt="Latest version" src="https://img.shields.io/github/v/tag/Wissem-Industries/Wissem-Home?sort=semver&label=version" /></a>
  <a href="https://ghcr.io/wissem-industries/home"><img alt="Production image on GHCR" src="https://img.shields.io/badge/GHCR-production-2496ED?logo=docker&logoColor=white" /></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-green.svg" /></a>
</p>

<p align="center">
  <img alt="Nuxt 4" src="https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white" />
  <img alt="Vue 3" src="https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white" />
  <img alt="Bun 1.4" src="https://img.shields.io/badge/Bun-1.4-FBF0DF?logo=bun&logoColor=000" />
  <img alt="Biome 2" src="https://img.shields.io/badge/Biome-2-60A5FA?logo=biome&logoColor=white" />
</p>

Wissem Home is the portfolio and contact site of Wissem’s Industries, built
with Nuxt 4 and the shared `@wissem-industries/ui` design system. `V3` identifies
the third product generation; SemVer tags identify software releases.

## Features

- French and English portfolio content on shared canonical routes.
- Project, experience and education sections.
- A contact form delivered through Telegram when its server credentials are configured.
- Plausible analytics with a configurable domain and API host.

## Technology

Nuxt 4 · Vue 3 · TypeScript · `@wissem-industries/ui` · Bun 1.4 · Biome 2

## Requirements

- Bun 1.4 or later.
- A GitHub Packages token with `read:packages` access for the private UI dependency.

Keep the token in your user-level `.npmrc`. The project `.npmrc` contains only
registry configuration.

## Development

```sh
git clone https://github.com/Wissem-Industries/Wissem-Home.git
cd Wissem-Home
bun install --frozen-lockfile
cp .env.example .env
bun run dev
```

The application is available at `http://localhost:3000`.

## Configuration

```dotenv
NUXT_PUBLIC_SITE_URL=https://www.wissem.pro
APP_PORT=3000
NUXT_TELEGRAM_BOT_TOKEN=
NUXT_TELEGRAM_CHAT_ID=
NUXT_PUBLIC_PLAUSIBLE_DOMAIN=
NUXT_PUBLIC_PLAUSIBLE_API_HOST=
```

Telegram variables are required only to deliver contact messages. Without them,
the form returns a service-unavailable response and submitted messages are not stored.

## Quality checks

```sh
bun run lint
bun run test
bun run typecheck
bun run build
bun run check
```

## Production

Woodpecker checks pushes and pull requests. A `v*` tag matching
`package.json.version` runs the release checks, publishes
`ghcr.io/wissem-industries/home:<version>` and `:latest`, then calls the
production Dokploy webhook and creates a GitHub Release. Verify the production
service uses this image before publishing a release. The container listens on
port `3000`; Docker builds need BuildKit and a `GITHUB_PACKAGES_TOKEN` secret to
install the private UI dependency.

## License

MIT. See [LICENSE](LICENSE).
