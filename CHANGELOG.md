# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

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
