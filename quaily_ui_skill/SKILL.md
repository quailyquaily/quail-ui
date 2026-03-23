---
name: use-quail-ui-in-frontend-project
description: Use this skill when integrating Quail UI into a Vue 3 frontend, migrating an existing screen to Quail UI components, or needing the library's themes, tokens, icons, demo-backed usage patterns, and agent-facing onboarding docs.
---

# Quail UI Frontend Integration

Read [`docs/ai-agent-guide.md`](https://github.com/quailyquaily/quail-ui/blob/master/docs/ai-agent-guide.md) first. It is the primary onboarding document for AI agents and already contains:

- installation patterns
- plugin vs named-import usage
- theme helpers and token families
- typography, utility classes, and common CSS patterns
- demo coverage under `src/app/home/*`
- the exported component catalog
- the icon catalog
- current API gotchas where older docs are stale

## Workflow

1. Open [`docs/ai-agent-guide.md`](https://github.com/quailyquaily/quail-ui/blob/master/docs/ai-agent-guide.md).
2. Default to `app.use(QuailUI)` plus `import "quail-ui/style.css"` unless the task clearly needs selective registration.
3. Prefer exported Quail components, icons, theme helpers, and utility classes over custom lookalikes.
4. Copy composition patterns from [`src/app/home/`](https://github.com/quailyquaily/quail-ui/tree/master/src/app/home).
5. If a prop or event is unclear, inspect the source in [`src/components/common/`](https://github.com/quailyquaily/quail-ui/tree/master/src/components/common) before writing code.

## Files To Read On Demand

- [`docs/ai-agent-guide.md`](https://github.com/quailyquaily/quail-ui/blob/master/docs/ai-agent-guide.md)
- [`src/index.ts`](https://github.com/quailyquaily/quail-ui/blob/master/src/index.ts)
- [`src/components/common/index.ts`](https://github.com/quailyquaily/quail-ui/blob/master/src/components/common/index.ts)
- [`src/components/icons/index.ts`](https://github.com/quailyquaily/quail-ui/blob/master/src/components/icons/index.ts)
- [`src/theme/index.ts`](https://github.com/quailyquaily/quail-ui/blob/master/src/theme/index.ts)
- [`src/styles/base.scss`](https://github.com/quailyquaily/quail-ui/blob/master/src/styles/base.scss)
- [`src/styles/layout/helper.scss`](https://github.com/quailyquaily/quail-ui/blob/master/src/styles/layout/helper.scss)
- [`src/styles/component.scss`](https://github.com/quailyquaily/quail-ui/blob/master/src/styles/component.scss)
- [`src/styles/theme/morph.scss`](https://github.com/quailyquaily/quail-ui/blob/master/src/styles/theme/morph.scss)
- [`src/app/home.vue`](https://github.com/quailyquaily/quail-ui/blob/master/src/app/home.vue)
- [`src/app/home/`](https://github.com/quailyquaily/quail-ui/tree/master/src/app/home)

## Rules

- Prefer the real component APIs from source over older README snippets.
- Remember the current gotchas from the guide:
  - no `QFormItem`
  - no `QInputWithButton`; use `QTextFieldWithButton`
  - `QInput` uses `inputType`
  - `QTextarea` uses `max`
  - `QPagination` uses `totalPage`, `hasPrev`, `hasNext`
  - selectors emit `change` instead of `v-model`
