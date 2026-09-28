# Folio

[![CI](https://github.com/0x-Shadow/folio/actions/workflows/ci.yml/badge.svg)](https://github.com/0x-Shadow/folio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![Vite 7](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)

A sophisticated book review platform with SaaS-style accounts, taste onboarding, a personal reading dashboard, and smart recommendations — search and filter a curated collection, rich detail pages with rating breakdowns, and local-first bookshelves. Built with React 19, Vite 7, and Tailwind CSS 4.

Live demo: https://0x-shadow.github.io/folio/

## Screenshots

| Home | Explore | Detail | Library |
|------|---------|--------|---------|
| ![Home](./screenshots/home.png) | ![Explore](./screenshots/explore.png) | ![Detail](./screenshots/book_detail.png) | ![Library](./screenshots/my_books.png) |
| Home | Explore | Detail | Library |

## What's inside

| Path | What it is | Status |
|------|------------|--------|
| `src/pages/` | Pages: home, explore, search, detail, library, sign-in, onboarding, 404 | ✅ Develop here |
| `src/components/` | Presentational UI: cards, grids, filters, layout, reviews, covers | ✅ Develop here |
| `src/context/` + `src/hooks/` | Auth session provider + `useAuth` hook | ✅ Develop here |
| `src/lib/` | Pure logic: safe storage, library store, review store, recommendation engine | ✅ Develop here |
| `src/data/` | Mock catalogue data (books, reviews, shelves, genres) | ✅ Develop here |
| `src/index.css` | Tailwind 4 + custom design tokens (navy / amber / cream) | ✅ Develop here |
| `screenshots/` | README screenshots | ✅ Keep updated |

## Quickstart

```bash
npm install
npm run dev
```

Open http://localhost:5173/folio/ (the app is served under the `/folio/` base path).

## Checks (also run in CI)

```bash
npm run lint    # must be clean
npm run build   # must build
```

## Deployment

The site is hosted on GitHub Pages:

```bash
npm run deploy  # build + publish dist/ to gh-pages
```

## Configuration

No secrets or environment variables needed. Accounts, shelves, reviews, and goals persist in the browser's `localStorage` (demo-grade auth — swap `src/context/` + `src/lib/` for a real API when adding a backend). To use your own catalogue, replace the mock modules in `src/data/` and keep them as the single data-access layer.

## Features

- **Accounts** — sign up, sign in, guest mode, and sign out, all persisted locally
- **Taste onboarding** — new readers pick genres to seed their Want to Read shelf
- **Library dashboard** — books/pages/reviews stats plus an adjustable yearly reading goal
- **Discover** — curated catalogue with genre and rating filters, five sort orders
- **Search** — instant search across titles, authors, and genres
- **Detail pages** — full descriptions, metadata, rating distribution, community reviews
- **Write reviews** — interactive star rating + validated review form, saved per account
- **Recommendations** — engine scored from *your* shelves, on Home and every book page
- **Resilient UI** — error boundary, 404 page, image fallbacks, skip link, labeled controls

## Contributing

PRs welcome — small and focused wins. Open an issue first for anything large.

Branch from `master`: `git checkout -b feat/short-description`. Run the checks above; update docs if behavior changes. Open a PR (screenshots where relevant).

Details: [CONTRIBUTING.md](./CONTRIBUTING.md) · [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) · [SECURITY.md](./SECURITY.md)

## License

MIT © 2026 0x-Shadow — see [LICENSE](./LICENSE).
