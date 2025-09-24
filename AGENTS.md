# Repository Guidelines

## Project Structure & Module Organization
- `src/components/common`: Reusable UI components, re‑exported via `src/components/common/index.ts` (components prefixed `Q...`).
- `src/components/icons`: Icon components, re‑exported via `src/components/icons/index.ts` (prefixed `QIcon...`).
- `src/styles`: SCSS sources; global entry `src/style.scss` builds to `quail-ui.css`.
- `src/app`: Demo routes used for local/dev previews.
- `public/`: Static assets for the dev server; `dist/`: build output (git‑ignored).
- Config: `vite.config.ts`, `tsconfig.json`, `eslintrc.cjs`.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (Node 18+, pnpm 8 recommended).
- `pnpm dev` — run Vite dev server with demo app.
- `pnpm build` — type‑check (`vue-tsc`) and build the library to `dist/`.
- `pnpm build:demo` — build the demo site (used by GitHub Pages).
- `pnpm preview` — preview a production build locally.
- `./build.sh` — build and print SRI tags for CDN usage (uses latest git tag).

## Coding Style & Naming Conventions
- Language: TypeScript + Vue 3 SFCs; prefer `<script setup lang="ts">`.
- Indentation: 2 spaces; keep lines focused and readable.
- Components: PascalCase; UI components start with `Q...`, icons with `QIcon...`.
- Exports: Add new components/icons to their `index.ts` re‑exports.
- Styles: SCSS; keep shared tokens/mixins in `src/styles/`; import via `src/style.scss`.
- Imports: Use the `@` alias for `src` when helpful.

## Testing Guidelines
- No formal unit test suite yet. Validate changes by adding/adjusting examples under `src/app` and verify with `pnpm dev` and `pnpm preview`.
- Cover edge cases (states, sizes, accessibility) and both light/dark themes.

## Commit & Pull Request Guidelines
- Commits: Clear, scoped messages (e.g., `feat: add QTextarea`).
- PRs: Include a summary, linked issues, before/after screenshots or GIFs for visual changes, and usage notes.
- Keep PRs small and focused. Do not commit `dist/`; CI builds artifacts.
- When adding components/icons, remember to update the corresponding `index.ts`.

## Security & Configuration Tips
- Do not hardcode secrets; only public assets are referenced. Maintain SRI when publishing via `./build.sh`.
- CI uses Node 18 and pnpm 8 (see `.github/workflows/deploy.yml`).

