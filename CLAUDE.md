# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
npm run dev          # Start dev server with hot reload
npm run build        # TypeScript check + build library (outputs to dist/)
npm run build:demo   # Build demo application for GitHub Pages
npm run preview      # Preview built demo
```

## Architecture Overview

Quaily UI is a Vue 3 component library for [Quaily](https://quaily.com). It exports UI components and icons via a Vue plugin system.

### Entry Points

- `src/index.ts` - Main library entry point, exports `{ Icons, Common, QuailUI }`
- `src/main.ts` - Demo application entry
- Plugin installs all components globally with `app.use(QuailUI)`

### Component Organization

```
src/
├── components/
│   ├── common/      # 26 UI components (QButton, QInput, QDialog, etc.)
│   │   └── index.ts # Re-exports all common components
│   └── icons/       # 150+ SVG icon components (QIcon*)
│       └── index.ts # Re-exports all icons
├── composables/     # useUtil.ts - browser detection, debounce, text extraction
├── utils/           # Clipboard utilities
├── styles/          # SCSS with CSS custom properties
└── app/             # Demo pages (home/, article.vue)
```

### Naming Conventions

- All components prefixed with `Q` (e.g., `QButton`, `QInput`)
- Icons follow `QIcon` + Name pattern (e.g., `QIconArrowDown`)
- Colored brand icons: `QIconColor*` (e.g., `QIconColorTwitter`)

### Styling System

- CSS custom properties defined in `styles/base.scss`
- Font variables: `--q-font-serif`, `--q-font-sans`, `--q-font-mono`
- Color variables: red, green, orange, blue, grayscale with intensity levels
- Dark mode: Toggle `.dark` class on `<body>`
- Component base heights: 44px (default), sm (38px), xs (32px), xxs (24px)

### Component Patterns

- Props use `modelValue` with `defineEmits(['update:modelValue'])` for v-model
- Named slots: `prepend`, `append`, `prepend-out`, `append-out`
- Icons use `currentColor` to inherit parent text color
- SCSS imports use `@/styles/` alias

### Build Output

Library mode externalizes Vue and outputs:
- `dist/index.js` (ESM)
- `dist/index.umd.cjs` (UMD, global: `QuailUI`)
- `dist/style.css` (bundled SCSS)
