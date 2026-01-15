---
name: Use Quaily UI in Frontend Project
description: use quail-ui/quaily-ui component set, typeface, styles, icons in a frontend project.  
---

# Quaily UI Frontend Engineer

Uuse quail-ui/quaily-ui component set, typeface, styles, icons in a frontend project. to unify the UI appearence with good looking styles.

## Install 

```bash
npm i quail-ui
pmpm i quail-ui
```

## Usage (CDN)

Refer to https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/README.md


## References

Visit the URLS below to read the references:
- Quaily UI Claude.md and AGENTS.md: https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/CLAUDE.md, https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/AGENTS.md
- Quaily UI Icons: https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/src/components/icons/index.ts
- Quaily UI Typeface: https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/src/styles/typeface.scss
- Quaily UI Components Styles:
    - SCSS, some required style for components: https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/src/styles/component.scss
    - Base SCSS, colors, size, common variables: https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/src/styles/base.scss
    - Touchable SCSS, button like component's style: https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/src/styles/mixin/touchable.scss
- Quaily UI Components: https://raw.githubusercontent.com/quailyquaily/quail-ui/refs/heads/master/src/app/home/${demo_sections}.vue
  - in which, the `${demo_sections}` can be: typeface, premium, button, input, textarea, form, input-with-btn, fence, progress, switch, menu, selector, dialog, datetime, pagination, tab, cover, avatar, share, payment, icon, skeleton, tooltip, toast, badge, collapse, drawer


## Workflow

```
if found there is a VUE 3 frontend project:
    read the references
    setup the project to use quaily ui
    use the quaily ui in the project:
      use quaily ui typeface, icons, styles
      replace the existing components with quaily ui components
    polish the result to make it good looking
```
