---
name: use-quail-ui-in-frontend-project
description: Use this skill when adding, migrating, or styling Vue 3 components with Quail UI — buttons, dialogs, inputs, tabs, menus, icons, themes (light/dark/morph), tokens, SCSS utilities, or layout helpers.
---

# Quail UI Frontend Integration

Read [`docs/ai-agent-guide.md`](https://github.com/quailyquaily/quail-ui/blob/master/docs/ai-agent-guide.md) first. It is the primary reference and covers installation, plugin vs named-import usage, theme helpers, token families, typography, utility classes, the component and icon catalogs, demo coverage, and current API gotchas.

## Workflow

1. Default to `app.use(QuailUI)` plus `import "quail-ui/style.css"` unless the task clearly needs selective registration.
2. Prefer exported Quail components, icons, theme helpers, and utility classes over custom lookalikes.
3. Copy composition patterns from [`src/app/home/`](https://github.com/quailyquaily/quail-ui/tree/master/src/app/home).
4. If a prop or event is unclear, inspect the source in [`src/components/common/`](https://github.com/quailyquaily/quail-ui/tree/master/src/components/common) before writing code.

## Files to Read On Demand

Start with the agent guide. Read the others only when the task touches that area.

**Core exports**
- [`src/index.ts`](https://github.com/quailyquaily/quail-ui/blob/master/src/index.ts)
- [`src/components/common/index.ts`](https://github.com/quailyquaily/quail-ui/blob/master/src/components/common/index.ts)
- [`src/components/icons/index.ts`](https://github.com/quailyquaily/quail-ui/blob/master/src/components/icons/index.ts)

**Theming and styles**
- [`src/theme/index.ts`](https://github.com/quailyquaily/quail-ui/blob/master/src/theme/index.ts)
- [`src/styles/base.scss`](https://github.com/quailyquaily/quail-ui/blob/master/src/styles/base.scss)
- [`src/styles/layout/helper.scss`](https://github.com/quailyquaily/quail-ui/blob/master/src/styles/layout/helper.scss)
- [`src/styles/component.scss`](https://github.com/quailyquaily/quail-ui/blob/master/src/styles/component.scss)
- [`src/styles/theme/morph.scss`](https://github.com/quailyquaily/quail-ui/blob/master/src/styles/theme/morph.scss)

**Demo patterns**
- [`src/app/home.vue`](https://github.com/quailyquaily/quail-ui/blob/master/src/app/home.vue)
- [`src/app/home/`](https://github.com/quailyquaily/quail-ui/tree/master/src/app/home)

## Rules

- Prefer the real component APIs from source over older README snippets.
- API gotchas (source of truth is the agent guide):
  - no `QFormItem`
  - no `QInputWithButton`; use `QTextFieldWithButton`
  - `QInput` uses `inputType`, not `type`
  - `QTextarea` uses `max`, not `maxlength`
  - `QPagination` uses `totalPage`, `hasPrev`, `hasNext`
  - selectors emit `change` instead of supporting `v-model`
