# Changelog

All notable changes to this project are documented here. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [2.0.1] - 2026-11-22

Nothing new to learn, a few fixes and a new home for the docs.

### Fixed

- `$BACKDROP_OPACITY` now works. The backdrop had `0.5` hardcoded, so the variable did nothing. Its default is now `0.5`, so the output does not change.
- `$HOVER_BRIGHTNESS` was missing `!default`, so it could not be overridden before importing FlatifyCSS.
- `main` in `package.json` pointed to a file that does not exist (`index.html`), it now points to `dist/js/flatify.js`.
- The `dist/css/flatify-rtl*.css` files were left over from version 1.5.3 and had old styles. They are now copies of the current files, built every time.

### Changed

- Documentation moved to [flatifycss.amimomo.me](https://flatifycss.amimomo.me). The repository moved to [ami-momo/flatifycss](https://github.com/ami-momo/flatifycss).
- `package.json` has `style`, `sass`, `unpkg` and `jsdelivr` fields, so `cdn.jsdelivr.net/npm/flatifycss@2` serves the minified CSS.
- The npm package only includes `dist`, `scss`, `js` and the license files.
- `gulp` and `bun run build` build without bumping the version. `gulp release` bumps and builds, and `gulp prerelease` does the old default.
- Build tools updated and security warnings fixed. The CSS output is the same apart from equivalent minification.

### Deprecated

- `dist/css/flatify-rtl*.css`. Use `flatify.css` with `dir="rtl"` on the page instead, the RTL files will be removed in version 3.

### Removed

- Stale `flatify-rtl*.css.map` files from version 1.5.3.

## [2.0.0] - 2024-08-23

- Right to left support uses CSS logical properties, one stylesheet works for both directions.

[Unreleased]: https://github.com/ami-momo/flatifycss/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/ami-momo/flatifycss/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/ami-momo/flatifycss/releases/tag/v2.0.0
