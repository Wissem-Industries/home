# Wissem Home

Portfolio and contact site of Wissem Badraoui, at [wissem.pro](https://www.wissem.pro).

[![CI](https://ci.wissem.pro/api/badges/12/status.svg)](https://ci.wissem.pro/repos/12)
[![Release](https://img.shields.io/github/v/release/Wissem-Industries/home?sort=semver)](https://github.com/Wissem-Industries/home/releases)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

French and English pages for projects, experience, education and interests, a resume page, and a contact form delivered through Telegram. Built with Nuxt 4 and [Wissem UI](https://github.com/Wissem-Industries/ui).

The resume is not stored here: `/cv.pdf`, `/en/cv.pdf` and their images relay the files of the latest version published by the CV repository to the public bucket `https://cdn.wissem.pro/wissem-cv` (`VERSION` holds the latest tag, `<tag>/` the files of that version).

## Development

Requires Bun 1.4 and a GitHub token with `read:packages` in your user `.npmrc` (for `@wissem-industries/ui`).

```bash
bun install
cp .env.example .env
bun run dev       # http://localhost:3000
bun run check     # lint, unit tests, typecheck, build
bun run test:e2e  # end-to-end and accessibility tests, after a build
```

End-to-end tests need Chromium; set `CHROMIUM_PATH` to use an installed browser.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | Canonical URL, `https://www.wissem.pro` by default |
| `NUXT_TELEGRAM_BOT_TOKEN`, `NUXT_TELEGRAM_CHAT_ID` | Contact form delivery. Without them the form answers that the service is unavailable; messages are never stored. |
| `NUXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NUXT_PUBLIC_PLAUSIBLE_API_HOST` | Analytics |

## Release

Versions follow Semantic Versioning and changes are listed in [CHANGELOG.md](CHANGELOG.md).

```bash
bun run release 1.1.0   # updates package.json and the changelog
```

Merge the release pull request, then push the `v1.1.0` tag. The pipeline checks the tag, publishes `ghcr.io/wissem-industries/home`, deploys it on Dokploy, checks the site and creates the GitHub release.

## License

[MIT](LICENSE) for the source code. The texts, images and logos of the website are not covered by it.
