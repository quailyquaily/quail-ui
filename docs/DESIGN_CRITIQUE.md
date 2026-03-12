# Design Critique

Date: 2026-03-12
Status: Updated after the docs-home refactor

## Current Verdict

Pass, with one major caveat.

The demo no longer reads like a generic specimen sheet. The docs now make a case for Quail UI as an editorial, publishing-oriented system with a specific voice. The first screen has hierarchy, the mobile header now prioritizes navigation over utilities, and the article route is readable enough to function as a real showcase.

The main remaining problem is brand coherence. The information architecture is much better, but the theme story still pulls the product toward more than one visual identity.

## What Improved

### 1. The home page now has a real first impression

What changed:
The docs home now opens with an editorial intro, a library map, a focused set of featured demos, and only then the full catalog.

Why it matters:
The interface now explains what Quail UI is before asking people to inspect every component. Coverage is still there, but it no longer has to do all the work.

Relevant files:

- `src/app/home.vue`
- `src/app/components/ComponentShowcase.vue`

### 2. Typography no longer hijacks the first fold

What changed:
The oversized type specimen has been reduced into a compact typography reference and moved into the later catalog flow.

Why it matters:
The homepage now leads with component utility instead of self-referential system styling.

Relevant files:

- `src/app/home.vue`
- `src/app/home/typeface.vue`

### 3. Mobile navigation hierarchy is corrected

What changed:
On small screens, route switching remains visible while TUI, theme, and GitHub controls move into a utility drawer.

Why it matters:
Navigation is now more important than experimentation, which is the right hierarchy for a docs experience.

Relevant file:

- `src/App.vue`

### 4. The article preview reads like an article now

What changed:
The article container now uses a constrained reading measure and more controlled spacing.

Why it matters:
The article route demonstrates a publishing surface instead of just dumping styled content into a wide frame.

Relevant files:

- `src/app/article.vue`

## Remaining Priority Issue

### 1. The theme story is still too loose

What:
The default theme is disciplined, but `morph` still pushes the product toward glossy demo-surface styling with a different personality.

Why it matters:
Now that the docs shell has clearer editorial intent, that divergence is more obvious. If theme switching changes the product's personality too much, the docs stop teaching a stable design language.

Fix:
Either tighten `morph` so it still feels recognizably like Quail UI, or move experimental theme exploration out of the global header and into a dedicated theme page.

Command:
`/i-normalize`

Relevant file:

- `src/styles/theme/morph.scss`

## Secondary Issues

- The sidebar still repeats some of the same category structure already expressed by the page sections. It is less damaging than before, but still somewhat redundant.
- The showcase descriptions are stronger than before, but some still read as inventory labels rather than usage guidance.
- Google font imports in `src/App.vue` still make the demo feel less self-contained than it should.
- The article fixture content still reads like test content in places, which undercuts the improved reading surface.

## Recommended Next Steps

1. Normalize or isolate the `morph` theme so the product teaches one coherent visual language.
2. Replace the article fixture copy with a more curated editorial sample.
3. Decide whether the sidebar should remain a full taxonomy or become a lighter in-page navigator now that the home page has stronger section framing.
