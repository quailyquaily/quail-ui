# Components Design Critique

Date: 2026-03-12
Scope: `src/components`, with validation against the demo surfaces in `src/app`
Status: New critique for the current component library presentation

## Anti-Patterns Verdict

Pass, with one failing pocket.

The default light UI does not immediately read like generic AI output. The serif-led hierarchy, restrained palette, and editorial framing give it a point of view.

The near-fail signals are:

- repeated bordered showcase cards
- chip-heavy taxonomy and navigation
- gradient premium text treatment
- the `morph` theme's grid-plus-blur treatment

If the `morph` theme were shown in isolation and labeled as AI-made, that would be believable much faster than the default theme.

Relevant files:

- `src/app/components/ComponentShowcase.vue`
- `src/app/home.vue`
- `src/styles/component.scss`
- `src/styles/theme/morph.scss`

## Overall Impression

Quail UI is strongest when it behaves like an editorial toolkit instead of a generic component gallery.

The biggest opportunity is to let the components carry that identity directly. Right now too much of the experience is controlled by documentation chrome, repeated categorization, and demo matrices that flatten hierarchy.

## What's Working

### 1. The typography gives the system a real voice

The serif/sans pairing creates a publishing-oriented tone without falling back to the usual purple gradients, glowing dark mode, or startup-dashboard tropes.

Relevant files:

- `src/styles/layout/helper.scss`
- `src/app/home.vue`

### 2. The article surface is the clearest expression of the system

The article route shows the most coherent version of Quail UI: readable width, restrained framing, and a believable editorial rhythm.

Relevant files:

- `src/app/article.vue`

### 3. Mobile adaptation is controlled rather than amputated

The homepage compresses into a readable stacked flow. It does not feel like a broken desktop layout squeezed into a phone.

Relevant file:

- `src/app/home.vue`

## Priority Issues

### 1. Showcase chrome is louder than the components

What:
Every demo is wrapped in the same border, header strip, inner frame, and metadata treatment.

Why it matters:
The eye lands on containers before it lands on the actual UI being documented. The result feels like a specimen cabinet instead of a system with emphasis.

Fix:

- In featured areas, remove the outer card and show one canonical live example.
- In the full catalog, keep one container layer at most.
- Stop relying on deep CSS to hide repeated internal headings and instead author simpler demo variants intentionally.

Command:
`/i-distill`

Relevant files:

- `src/app/components/ComponentShowcase.vue`

### 2. Information architecture duplicates navigation instead of guiding it

What:
The interface currently uses hero CTAs, a library map, a persistent sidebar, featured demos, category chips, and a full catalog at the same time.

Why it matters:
Users are forced to choose a browsing model before they understand the system. That creates friction on a page that should feel immediately legible.

Fix:

- Pick one primary path: hero, then featured demos, then full catalog.
- Remove or collapse the library map into the sidebar.
- Cut repeated chip lists from category headers unless they serve a distinct navigation role.

Command:
`/i-distill`

Relevant files:

- `src/app/home.vue`
- `src/app/components/DemoSidebar.vue`

### 3. Secondary text is too small and too quiet

What:
Supporting copy, nav labels, and many descriptions sit at 14px or smaller with weak contrast.

Why it matters:
The page projects confidence in the hero and then becomes visually timid everywhere else. Supporting information ends up feeling optional when it is actually required for comprehension.

Fix:

- Raise default supporting copy to 15px or 16px where it carries meaning.
- Reserve the quietest color step for metadata only.
- Darken sidebar and summary text one step.

Command:
`/i-polish`

Relevant files:

- `src/styles/layout/helper.scss`
- `src/app/home.vue`
- `src/app/components/DemoSidebar.vue`

### 4. Button semantics are too broad to teach quickly

What:
`primary`, `highlight`, `stripe`, `plain`, `placeholder`, and `danger` are all introduced near the top with similar importance.

Why it matters:
This reads like a QA matrix, not a trustworthy action hierarchy. It becomes unclear which button styles are part of the core language and which are expressive edge cases.

Fix:

- Teach one primary, one secondary, one tertiary, and one destructive action first.
- Move `stripe`, `placeholder`, and radius experiments into an expressive or experimental section.
- Reduce the default story to the variants a product team should actually reach for first.

Command:
`/i-normalize`

Relevant files:

- `src/app/home/button.vue`
- `src/styles/mixin/touchable.scss`

### 5. Sidebar wayfinding is mostly cosmetic

What:
The active state only updates when a user clicks the sidebar.

Why it matters:
During natural scrolling through a long catalog, the sidebar stops telling users where they are. That weakens orientation in the exact context where the nav should be most useful.

Fix:

- Sync active section state to scroll position with intersection observers.
- Make the current section state visually more assertive once it becomes truthful.

Command:
`/i-polish`

Relevant files:

- `src/app/components/DemoSidebar.vue`

## Minor Observations

- `premium-text` uses gradient-filled text, which feels cheaper than the rest of the system.
- The theme chips in the intro look interactive even though they are only labels.
- The showcase code toggle is icon-only, so its affordance depends on prior familiarity.
- The `morph` theme feels bolted on through decorative overrides and heavy `!important` usage instead of behaving like a disciplined variant of the same system.

Relevant files:

- `src/styles/component.scss`
- `src/app/home.vue`
- `src/app/components/ComponentShowcase.vue`
- `src/styles/theme/morph.scss`

## Questions to Consider

- What would the docs feel like if each category opened with one canonical example and hid the QA matrix until requested?
- Which button styles are truly part of the product voice, and which exist only because the system can support them?
- If Quail wants to feel editorial and trustworthy, why is the loudest theme also the least disciplined?

## Recommended Next Steps

1. Distill the documentation shell so the component surfaces carry more of the first impression.
2. Normalize button hierarchy and reduce the number of equally weighted action styles shown by default.
3. Tighten typography contrast and supporting copy scale.
4. Either normalize `morph` into the same family or isolate it as an experimental theme.

## Execution Checklist

### Phase 1: Normalize and Distill First

- [ ] Reduce default button teaching surface to core variants only: `primary`, one secondary style, one tertiary style, and `danger`.
- [ ] Move `highlight`, `stripe`, `placeholder`, and border-radius experiments out of the default button story.
- [ ] Rewrite the button demo so it reads like product guidance instead of a QA matrix.
- [ ] Remove one layer of showcase framing from featured demos so the component itself becomes the focal point.
- [ ] Stop depending on `:deep(.q-text-h2:first-child)` hiding inside showcase previews; make demo content intentionally headerless where needed.
- [ ] Simplify docs navigation by choosing one primary orientation model between library map, sidebar, chips, and section jumps.
- [ ] Remove or reduce repeated chip navigation in category headers if the sidebar already covers the same structure.
- [ ] Decide whether `morph` is a core theme or an experimental theme; do not leave it in an ambiguous middle state.

### Phase 2: Component-Level Polish

- [ ] Increase supporting text size or contrast where body copy currently reads too faintly in docs and component descriptions.
- [ ] Strengthen sidebar active state so the current section is obvious at a glance.
- [ ] Sync sidebar active section to scroll position instead of click state only.
- [ ] Review hover, focus, and pressed states on buttons so interaction feedback feels deliberate rather than merely present.
- [ ] Tighten menu, input, and button spacing so dense examples still feel composed instead of crowded.
- [ ] Replace icon-only affordances in docs where recognition cost is too high, especially for source-code toggles.
- [ ] Revisit theme chips and other pill-like labels that look clickable but are only decorative.

### Phase 3: Theming Cleanup

- [ ] Remove decorative treatments that cheapen the system language, especially gradient text used for premium emphasis.
- [ ] Reduce `morph` theme reliance on blur, texture, and heavy `!important` overrides.
- [ ] Make sure alternate themes still read as Quail UI rather than separate products.

### Suggested Order

- [ ] Do not start with `/i-polish` alone.
- [ ] Run `/i-normalize` on core component semantics first.
- [ ] Run `/i-distill` on docs presentation and demo structure second.
- [ ] Run `/i-polish` after hierarchy, semantics, and default stories are stable.
