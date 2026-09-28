# Contributing to Folio

Thanks for your interest in contributing! This guide keeps collaboration smooth and the codebase clean.

## How to contribute

1. **Fork** the repository and clone your fork.
2. **Branch from `master`** with a short, descriptive name:
   ```bash
   git checkout -b feat/short-description
   ```
3. **Make small, focused changes.** One concern per pull request.
4. **Run the checks** before pushing:
   ```bash
   npm run lint    # must be clean
   npm run build   # must build
   ```
5. **Update docs** if behavior changes (README, screenshots in `screenshots/`).
6. **Open a Pull Request** against `master` with a clear description and screenshots for UI changes.

## Code style

- Follow the existing patterns: small components in `src/components/`, pages in `src/pages/`, data in `src/data/`.
- Use the design tokens in `src/index.css` (navy / amber / cream) — no hardcoded off-palette colors.
- Keep components presentational; keep data access inside `src/data/`.
- Write clear commit messages in imperative mood (e.g. `feat:`, `fix:`, `docs:`).

## Reporting issues

Open an [issue](https://github.com/0x-Shadow/folio/issues) with steps to reproduce, expected vs. actual behavior, and screenshots where relevant.

## Code of conduct

By participating, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
