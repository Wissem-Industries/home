# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- Liquid Glass across the site: violet shapes under glass lenses in the hero and the page headers, glass cards everywhere with a few violet accents behind them, a soft violet light on each section and a more visible grid at the top.
- Cards share one hover: a short lift and a violet edge, without lightening the card.
- Project filters sit in a glass selector; contact fields have a thin outline and a single violet focus ring.
- Projects page: one project per row, image and text alternating sides.
- New project covers in the site's style: a glass window around the product capture (Move in a phone frame), or an icon tile for the projects without a public interface, over the same violet glow.
- Resume, legal notice and privacy pages follow the same design: violet light at the top, legal texts in a glass card.

### Fixed

- Development server: Plausible is no longer loaded, so content blockers such as Brave Shields no longer stop the page from working locally.
- Error pages declare their language.
- Projects page: project titles are second-level headings, as nothing sits between them and the page title.

### Security

- Security headers on every response (HSTS, `nosniff`, frame denial, referrer and permissions policies) and a Content Security Policy on pages; the `X-Powered-By` header is gone.
- Contact form: the rate limit keys on the address given by Cloudflare instead of a client-supplied header, keeps a bounded number of addresses, and the API refuses bodies over 16 KB; Telegram calls time out after 10 seconds.
- Analytics relay refuses events over 4 KB.
- The language cookie is marked `Secure`.
- Build tooling dependencies updated to their patched releases.

## [1.4.4] - 2026-10-08

### Changed

- Experience: the DGFiP entry shows the emblem alone, which stays legible at thumbnail size, instead of the full logo with its caption.

## [1.4.3] - 2026-10-08

### Fixed

- Analytics: events relayed to Plausible carry the visitor address in `X-Plausible-IP`; Cloudflare was replacing it with the server address, so every visitor showed up in Roubaix.
- Resume downloads from bots and command-line clients are no longer counted.

## [1.4.2] - 2026-10-08

### Fixed

- Analytics: events go through this origin (`/_w`), so content blockers no longer drop them.
- Resume downloads are counted by the server (`CV download` event with language, version and referrer), including direct links, visitors without JavaScript and blocked trackers; the PDF is no longer kept by the CDN so every download reaches the server.

## [1.4.1] - 2026-10-08

### Fixed

- Status pages: final visuals of Wissem UI 1.1.0 (large icon, neutral offline buttons).

## [1.4.0] - 2026-10-08

### Added

- Styled 404 and error pages from Wissem UI 1.1.0, with the existing texts for not found and server errors.

## [1.3.1] - 2026-10-08

### Changed

- Privacy page: removed the audience-measurement section and its opt-out.
- Contact form: the data-processing notice is reduced to one short sentence and the link to the privacy policy.

## [1.3.0] - 2026-10-07

### Added

- Legal notice (`/legal`, `/en/legal`) and privacy policy (`/privacy`, `/en/privacy`), linked from the footer and listed in the sitemap. The privacy page lets visitors stop the audience measurement in their browser.

### Changed

- Contact form: the data-processing notice is now visible under the form instead of a tooltip, links to the privacy policy and states that messages are forwarded through Telegram.

## [1.2.5] - 2026-10-07

### Changed

- Resume: a new version shows up as soon as the CV pipeline purges the CDN cache; the version file is read on each request, and the last known version is only a fallback if the read fails.

## [1.2.4] - 2026-10-07

### Changed

- Resume: `/cv.pdf`, `/en/cv.pdf` and their images now read the files of the latest version from the public bucket `cdn.wissem.pro/wissem-cv` instead of the GitHub Release of the CV repository, which can then become private.

## [1.2.3] - 2026-10-02

### Changed

- Resume page: the download links are plain again (`/cv.pdf`, `/en/cv.pdf`); only the preview image carries the version.

## [1.2.2] - 2026-10-02

## [1.2.1] - 2026-10-02

- Sharing image of the site: it now has the same layout as the resume card (kicker, title "Projects & experience", subtitle) with two screenshots, instead of repeating the name and status already shown on the profile where the link is shared.
## [1.2.0] - 2026-10-02

### Changed

- Project card: Wissem Move is now called Move (identifier, title and image).
- Project covers: Move shows a real board, the portfolio cover keeps the navigation bar; sharing images regenerated.

### Fixed

- English sharing image: the title stays on one line, like on the resume card.

## [1.1.0] - 2026-10-02

- Sharing images: new layout with project screenshots, address `www.wissem.pro` in place of the focus line, versioned image URL so networks refresh their cache, image dimensions in the Open Graph tags.
- Resume page: shorter introduction and note.

## [1.0.0] - 2026-10-02

First release under the shared versioning of the wissem.pro projects. Third generation of the site.

- French and English pages: profile, projects, experience, education, interests.
- Resume page, with the PDF and its images relayed from the latest release of the CV repository.
- Contact form delivered through Telegram, rate limited, without storage.
- Theme and language shared with the other wissem.pro sites.
