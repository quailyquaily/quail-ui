# Quail UI Agent Guide

This guide is the fastest way for an AI coding agent to use `quail-ui` inside another frontend project without guessing.

Read this file before integrating the library into a new app. It is intentionally more concrete than `README.md` and more detailed than `quaily_ui_skill/SKILL.md`.

## 1. What Quail UI Exports

The public package surface is defined in [`src/index.ts`](../src/index.ts), [`src/components/common/index.ts`](../src/components/common/index.ts), [`src/components/icons/index.ts`](../src/components/icons/index.ts), and [`src/theme/index.ts`](../src/theme/index.ts).

### Full plugin install

```ts
import { createApp } from "vue";
import { QuailUI } from "quail-ui";
import "quail-ui/style.css";

const app = createApp(App);
app.use(QuailUI, {
  debug: false,
  useSquircle: true,
});
app.mount("#app");
```

### Named imports

```ts
import {
  QButton,
  QCard,
  QInput,
  QIconSearch,
  applyTheme,
  useToast,
} from "quail-ui";
import "quail-ui/style.css";
```

Use named imports only when you know the component's nested dependencies are also registered. Many components still assume global Quail registration for their child icons or subcomponents. The safest integration path is still `app.use(QuailUI)`.

### Runtime exports

- `QuailUI`: registers all common components and all icons globally.
- `Common`: namespace export of common components.
- `Icons`: namespace export of icon components.
- Theme helpers: `THEME_STORAGE_KEY`, `THEME_IDS`, `applyTheme`, `getThemeOptions`, `isTheme`, `readStoredTheme`, `resolveInitialTheme`.
- Composables: `useToast`, `useKeyboard`, `hasKeyboard`.
- Utilities: `closePopupMenu`, `onPopupClose`, `debounce`.

## 2. Integration Rules For Agents

1. Import `quail-ui/style.css` once in the consuming app even if you also call `app.use(QuailUI)`.
2. Prefer existing Quail components, theme tokens, and helper classes over custom one-off HTML and CSS.
3. Use the exported theme helpers instead of ad hoc theme state.
4. Copy patterns from the demo files under [`src/app/home`](../src/app/home) when building new UI.
5. If README examples disagree with component source, trust the source files in [`src/components/common`](../src/components/common).

### Important gotchas

- There is no exported `QFormItem`. The `form` demo shows layout patterns, not a form container component.
- There is no exported `QInputWithButton`. Use `QTextFieldWithButton`.
- `QInput` uses `inputType`, not `type`.
- `QTextarea` uses `max`, not `maxLength`.
- `QPagination` uses `totalPage`, `hasPrev`, and `hasNext`. It does not currently implement the `total / page-size` API shown in older docs.
- `QFence` is an inline notice component with `text`, `type`, `link`, and `icon`. It is not a slot-based code fence component.
- `QLanguageSelector` and `QCurrencySelector` emit `change`; they do not support `v-model`.
- `QShare` and several other components assume the full plugin install because they reference other Quail components by global name in their templates.
- Typography variables reference Noto font families, but the package does not ship font files. Load your own `Noto Sans` / `Noto Serif` if you want the demo look.

## 3. Themes, Tokens, And Utility Classes

### Theme model

Quail UI ships three built-in themes:

- `light`
- `dark`
- `morph`

Use the helpers from [`src/theme/index.ts`](../src/theme/index.ts):

```ts
import { applyTheme, resolveInitialTheme } from "quail-ui";

const theme = resolveInitialTheme();
applyTheme(theme);

applyTheme("light");
applyTheme("dark");
applyTheme("morph");
applyTheme("morph", false); // do not persist to localStorage
```

`applyTheme` updates `document.body.dataset.theme` and toggles `.dark` / `.light` on `<body>`.

### Core design tokens

Most theme tokens are declared in [`src/styles/base.scss`](../src/styles/base.scss). Morph-specific overrides live in [`src/styles/theme/morph.scss`](../src/styles/theme/morph.scss).

#### Surface tokens

- `--q-bg-paper`
- `--q-bg-white`
- `--q-bg-light`
- `--q-bg-light-2`
- `--q-bg-light-float`
- `--q-bg-dark`
- `--q-bg-dark-2`
- `--q-bg-dark-float`
- `--q-bg-overlay`

#### Ink and neutral tokens

- `--q-c-dark`
- `--q-c-dark-2`
- `--q-c-dark-3`
- `--q-c-dark-4`
- `--q-c-dark-5`
- `--q-c-light`
- `--q-c-light-2`
- `--q-c-light-3`
- `--q-c-light-4`
- `--q-c-light-5`
- `--q-c-secondary`

#### Accent families

- Blue: `--q-c-blue`, `--q-c-blue-dark`, `--q-c-blue-light`, `--q-c-blue-lighter`, `--q-c-blue-dimm-1/2/3`
- Red: `--q-c-red`, `--q-c-red-dark`, `--q-c-red-light`, `--q-c-red-lighter`, `--q-c-red-dimm-1/2/3`
- Green: `--q-c-green`, `--q-c-green-dark`, `--q-c-green-light`, `--q-c-green-lighter`, `--q-c-green-dimm-1/2/3`
- Orange: `--q-c-orange`, `--q-c-orange-dark`, `--q-c-orange-light`, `--q-c-orange-lighter`, `--q-c-orange-dimm-1/2/3`

#### Component token groups

- Buttons: `--q-button-*`
- Fields: `--q-field-*`
- Fence / alert blocks: `--q-fence-*`
- Progress: `--q-progress-*`
- Drawer: `--q-drawer-*`
- Card: `--q-card-*`
- Media frame: `--q-media-frame-*`
- Divider: `--q-divider-*`

### Typography classes

Typography utilities are generated in [`src/styles/layout/helper.scss`](../src/styles/layout/helper.scss). Font family helpers live in [`src/styles/typeface.scss`](../src/styles/typeface.scss).

- `q-text-display-title`
- `q-text-display-desc`
- `q-text-display`
- `q-text-h1`
- `q-text-h2`
- `q-text-h3`
- `q-text-desc`
- `q-text-body`
- `q-text-body-text`
- `q-text-body-title`
- `q-text-body-desc`
- `q-text-caption`
- `q-text-code`

Language-aware wrappers:

- `lang-ja`
- `lang-zh`
- `lang-zh-hant`

Font family helpers:

- `noto-serif`
- `noto-serif-sc`
- `noto-serif-tc`
- `noto-serif-jp`
- `noto-sans`
- `noto-sans-sc`
- `noto-sans-tc`
- `noto-sans-jp`

### Color helper classes

- `q-c-dark`
- `q-c-dark-2`
- `q-c-dark-3`
- `q-c-dark-4`
- `q-c-light`
- `q-c-light-2`
- `q-c-light-3`
- `q-c-light-4`

These classes automatically swap against the dark theme when wrapped by `.dark`.

### Layout and spacing helpers

The helper system is intentionally Tailwind-like but compiled from Quail SCSS.

- Display and alignment: `flex`, `flow`, `grid`, `place-center`, `justify-center`, `align-center`, `text-left`, `text-center`, `text-right`
- Font sizing: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-2xl`, `text-4xl`, `text-6xl`
- Weight: `font-medium`, `font-bold`, `font-black`
- Grid helpers: `grid-cols-1` through `grid-cols-20`, `col-span-1` through `col-span-20`
- Gap helpers: `gap-1` through `gap-20`, plus `gap-satoshi`
- Spacing helpers: `m-*`, `mx-*`, `my-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`, `p-*`, `px-*`, `py-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*`
- Responsive prefixes: `md-` and `lg-`

Examples:

```html
<div class="grid gap-4 grid-cols-1 md-grid-cols-2 lg-grid-cols-3">
  ...
</div>

<div class="q-text-caption q-c-dark-3 mb-2">Section label</div>
```

### Common CSS classes and patterns

From [`src/styles/component.scss`](../src/styles/component.scss):

- `.frame`: bordered container. Variants: `.focus`, `.shadow`, `.flat`
- `.divider`: horizontal rule. Variants: `.focus`, `.double`
- `.spacer`: flex filler
- `.form`, `.form-row`, `.form-label`, `.form-desc`, `.form-error`, `.form-hint`: demo form layout helpers
- `.one-line-ellipsis`, `.two-line-ellipsis`, `.three-line-ellipsis`: truncation helpers from [`src/styles/base.scss`](../src/styles/base.scss)

For buttons, Quail mostly uses class composition instead of a typed `variant` prop. Common class names include:

- `primary`
- `outlined`
- `plain`
- `danger`
- `highlight`
- `stripe`
- `placeholder`
- `icon`
- `sm`
- `xs`
- `xxs`
- `toggle-on`
- `toggle-off`
- `border-radius-sm`
- `border-radius-none`

## 4. Common Data Shapes

These are the object shapes the demos and components expect most often.

### Tabs

```ts
type TabItem = {
  id: string;
  title: string;
  icon?: string | Component;
};
```

### Menus and dropdowns

```ts
type MenuItem = {
  id?: string | number;
  title?: string;
  subtitle?: string;
  value?: string;
  icon?: string | Component;
  image?: string;
  divider?: boolean;
  disabled?: boolean;
  danger?: boolean;
  action?: (item: MenuItem) => void;
};
```

### Dropdown with text field change payload

```ts
type DropdownTextChange = {
  selected: MenuItem | null;
  text: string;
};
```

### Payment channel

```ts
type PaymentChannel = {
  name: string;
  desc?: string;
  icons: string[];
  symbol?: string;
  selected?: boolean;
  disabled?: boolean;
  balance?: string;
  balanceInsufficient?: boolean;
};
```

### Share services

Built-in service ids for `QShare`:

- `x`
- `facebook`
- `hackernews`
- `linkedin`
- `bluesky`
- `mastodon`
- `general`

### Toast options

```ts
type ToastOptions = {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  position?: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right";
  closable?: boolean;
  icon?: Component;
};
```

## 5. Demo Coverage Map

The demo app route at `/` is assembled in [`src/app/home.vue`](../src/app/home.vue). Each section below is a useful example for agents.

### Theme and styling demos

- [`src/app/home/color-scheme.vue`](../src/app/home/color-scheme.vue): live token viewer for the current theme
- [`src/app/home/typeface.vue`](../src/app/home/typeface.vue): typography and text color classes
- [`src/app/home/frame.vue`](../src/app/home/frame.vue): `.frame`, `.divider`, and `QDivider`
- [`src/app/home/premium.vue`](../src/app/home/premium.vue): `QPremiumDecoration`
- [`src/app/home/height-comparison.vue`](../src/app/home/height-comparison.vue): control rhythm and density comparisons
- [`src/app/home/icon.vue`](../src/app/home/icon.vue): all exported icons

### Component demos

- [`src/app/home/button.vue`](../src/app/home/button.vue): `QButton`, `QToggleButton`
- [`src/app/home/input.vue`](../src/app/home/input.vue): `QInput`, `QSearchInput`
- [`src/app/home/textarea.vue`](../src/app/home/textarea.vue): `QTextarea`
- [`src/app/home/form.vue`](../src/app/home/form.vue): form layout patterns using utility classes and field components
- [`src/app/home/input-with-btn.vue`](../src/app/home/input-with-btn.vue): `QTextFieldWithButton`
- [`src/app/home/fence.vue`](../src/app/home/fence.vue): `QFence`
- [`src/app/home/progress.vue`](../src/app/home/progress.vue): `QProgress`
- [`src/app/home/switch.vue`](../src/app/home/switch.vue): `QSwitch`
- [`src/app/home/menu.vue`](../src/app/home/menu.vue): `QMenu`, `QDropdownMenu`, `QDropdownMenuWithTextField`
- [`src/app/home/selector.vue`](../src/app/home/selector.vue): `QLanguageSelector`, `QCurrencySelector`
- [`src/app/home/dialog.vue`](../src/app/home/dialog.vue): `QDialog`, `QMessageDialog`, `QSearchInput`
- [`src/app/home/datetime.vue`](../src/app/home/datetime.vue): `QDatetimePicker`
- [`src/app/home/pagination.vue`](../src/app/home/pagination.vue): `QPagination`
- [`src/app/home/tab.vue`](../src/app/home/tab.vue): `QTabs`
- [`src/app/home/cover.vue`](../src/app/home/cover.vue): `QPackCover`
- [`src/app/home/avatar.vue`](../src/app/home/avatar.vue): `QAvatar`
- [`src/app/home/card.vue`](../src/app/home/card.vue): `QCard`
- [`src/app/home/media-frame.vue`](../src/app/home/media-frame.vue): `QMediaFrame`
- [`src/app/home/share.vue`](../src/app/home/share.vue): `QShare`
- [`src/app/home/payment.vue`](../src/app/home/payment.vue): `QPaymentApproachItem`, `QPaymentApproachSelect`
- [`src/app/home/skeleton.vue`](../src/app/home/skeleton.vue): `QSkeleton`
- [`src/app/home/tooltip.vue`](../src/app/home/tooltip.vue): `QTooltip`
- [`src/app/home/toast.vue`](../src/app/home/toast.vue): `QToast`, `QToastContainer`, `useToast`
- [`src/app/home/badge.vue`](../src/app/home/badge.vue): `QBadge`
- [`src/app/home/collapse.vue`](../src/app/home/collapse.vue): `QCollapse`, `QCollapseItem`
- [`src/app/home/drawer.vue`](../src/app/home/drawer.vue): `QDrawer`

## 6. Component Catalog

All exported common components are listed in [`src/components/common/index.ts`](../src/components/common/index.ts). The summaries below are meant to keep agents out of the weeds.

### Actions and input controls

#### `QButton`

- Source: [`src/components/common/QButton.vue`](../src/components/common/QButton.vue)
- Demo: [`src/app/home/button.vue`](../src/app/home/button.vue)
- Props: `class`, `disabled`, `loading`, `href`, `target`, `rel`, `title`, `ariaLabel`, `shortcut`
- Slots: default
- Notes:
  - Styling is class-driven, not prop-driven.
  - `shortcut` displays OS-aware labels only when a keyboard is available.
  - Link mode is enabled by setting `href`.
- Minimal example:

```vue
<QButton class="primary" shortcut="Cmd+S">Save</QButton>
<QButton class="outlined icon" aria-label="Search">
  <QIconSearch class="icon" />
</QButton>
```

#### `QToggleButton`

- Source: [`src/components/common/QToggleButton.vue`](../src/components/common/QToggleButton.vue)
- Demo: [`src/app/home/button.vue`](../src/app/home/button.vue)
- Props: `modelValue`, `class`, `disabled`, `loading`
- Emits: `update:modelValue`
- Slots: default
- Notes: built on top of `QButton`; good for follow/unfollow and small mode toggles.

#### `QInput`

- Source: [`src/components/common/QInput.vue`](../src/components/common/QInput.vue)
- Demo: [`src/app/home/input.vue`](../src/app/home/input.vue)
- Props: `modelValue`, `placeholder`, `defaultText`, `disabled`, `hintIcon`, `hintText`, `error`, `max`, `inputType`
- Emits: `change`, `blur`, `focus`, `keyup`, `update:modelValue`
- Slots: `prepend-out`, `prepend`, `append`, `append-out`
- Notes: clear button is built in and hidden when disabled.

#### `QTextarea`

- Source: [`src/components/common/QTextarea.vue`](../src/components/common/QTextarea.vue)
- Demo: [`src/app/home/textarea.vue`](../src/app/home/textarea.vue)
- Props: `modelValue`, `placeholder`, `defaultText`, `hintIcon`, `hintText`, `disabled`, `rows`, `error`, `max`
- Emits: `change`, `blur`, `focus`, `keyup`, `update:modelValue`
- Slots: `prepend-out`, `prepend`, `append`, `append-out`

#### `QTextFieldWithButton`

- Source: [`src/components/common/QTextFieldWithButton.vue`](../src/components/common/QTextFieldWithButton.vue)
- Demo: [`src/app/home/input-with-btn.vue`](../src/app/home/input-with-btn.vue)
- Props: `modelValue`, `type`, `layout`, `actionLabel`, `placeholder`, `defaultText`, `loading`, `buttonCls`, `disabled`
- Emits: `submit`, `update:modelValue`
- Notes:
  - `type` supports validation flows like `email` and `code`.
  - `layout` is `vertical` or `horizontal`.

#### `QSearchInput`

- Source: [`src/components/common/QSearchInput.vue`](../src/components/common/QSearchInput.vue)
- Demo: [`src/app/home/input.vue`](../src/app/home/input.vue), [`src/app/home/dialog.vue`](../src/app/home/dialog.vue)
- Props: `modelValue`, `placeholder`, `defaultText`, `disabled`, `items`
- Emits: `change`, `blur`, `focus`, `keyup`, `select`, `update:modelValue`
- Notes: `items` are rendered through `QMenu`.

#### `QDropdownMenu`

- Source: [`src/components/common/QDropdownMenu.vue`](../src/components/common/QDropdownMenu.vue)
- Demo: [`src/app/home/menu.vue`](../src/app/home/menu.vue)
- Props: `items`, `initialItem`, `hideSelected`, `variant`, `hideActionLabel`, `placeholder`, `useDialog`, `useFilter`, `scrollHeight`, `emptyHit`, `disabled`, `loading`
- Emits: `change`
- Slots: default slot can replace the action label area
- Notes:
  - `variant` is `outlined` or `plain`.
  - `useDialog` is `"auto"`, `"always"`, or `"never"`.
  - The item shape is the `MenuItem` type shown earlier.

#### `QDropdownMenuWithTextField`

- Source: [`src/components/common/QDropdownMenuWithTextField.vue`](../src/components/common/QDropdownMenuWithTextField.vue)
- Demo: [`src/app/home/menu.vue`](../src/app/home/menu.vue)
- Props: `items`, `placeholder`, `defaultSelection`, `defaultText`, `fillActionLabel`, `fillActionValue`, `hintText`, `textDisabled`, `selectDisabled`
- Emits: `change`
- Change payload: `{ selected, text }`

#### `QMenu`

- Source: [`src/components/common/QMenu.vue`](../src/components/common/QMenu.vue)
- Demo: [`src/app/home/menu.vue`](../src/app/home/menu.vue)
- Props: `items`, `persistent`, `noFrame`, `noShadow`, `focusedIndex`
- Emits: `action`
- Notes:
  - Use `persistent` for always-visible menus.
  - `focusedIndex` is based on navigable items, not absolute item array index.

#### `QLanguageSelector`

- Source: [`src/components/common/QLanguageSelector.vue`](../src/components/common/QLanguageSelector.vue)
- Demo: [`src/app/home/selector.vue`](../src/app/home/selector.vue)
- Props: `lang`, `noFlag`, `auto`, `presist`
- Emits: `change`
- Notes:
  - `presist` is intentionally spelled this way in the current API.
  - Event payload is `{ title, value }`.

#### `QCurrencySelector`

- Source: [`src/components/common/QCurrencySelector.vue`](../src/components/common/QCurrencySelector.vue)
- Demo: [`src/app/home/selector.vue`](../src/app/home/selector.vue)
- Props: `currency`
- Emits: `change`
- Notes: event payload is `{ title, value }`.

#### `QDatetimePicker`

- Source: [`src/components/common/QDatetimePicker.vue`](../src/components/common/QDatetimePicker.vue)
- Demo: [`src/app/home/datetime.vue`](../src/app/home/datetime.vue)
- Props: `modelValue`, `accept`, `disabled`
- Emits: `update:modelValue`, `change`
- Notes: `accept` is `date`, `time`, or `datetime`.

#### `QSwitch`

- Source: [`src/components/common/QSwitch.vue`](../src/components/common/QSwitch.vue)
- Demo: [`src/app/home/switch.vue`](../src/app/home/switch.vue)
- Props: `modelValue`, `disabled`, `theme`
- Emits: `update:modelValue`, `change`
- Notes: supported demo themes are `default`, `clear-sky`, and `plastic`.

#### `QTabs`

- Source: [`src/components/common/QTabs.vue`](../src/components/common/QTabs.vue)
- Demo: [`src/app/home/tab.vue`](../src/app/home/tab.vue)
- Props: `modelValue`, `tabs`, `initialIndex`, `variant`
- Emits: `change`, `update:modelValue`
- Notes:
  - `tabs` is an array of `{ id, title, icon? }`.
  - `variant` is `normal` or `plain`.

#### `QPagination`

- Source: [`src/components/common/QPagination.vue`](../src/components/common/QPagination.vue)
- Demo: [`src/app/home/pagination.vue`](../src/app/home/pagination.vue)
- Props: `modelValue`, `totalPage`, `hasPrev`, `hasNext`
- Emits: `change:next`, `change:prev`, `change:goto`, `update:modelValue`
- Notes: uses page count, not item count.

### Feedback, overlays, and disclosure

#### `QDialog`

- Source: [`src/components/common/QDialog.vue`](../src/components/common/QDialog.vue)
- Demo: [`src/app/home/dialog.vue`](../src/app/home/dialog.vue)
- Props: `modelValue`, `desktopMode`, `popupPosition`, `noFrame`, `title`, `width`, `height`, `position`, `persistent`, `class`
- Emits: `update:modelValue`, `close`
- Slots: `trigger`, `header`, default
- Notes:
  - `desktopMode` is `dialog` or `popup`.
  - Teleports to `body`.

#### `QMessageDialog`

- Source: [`src/components/common/QMessageDialog.vue`](../src/components/common/QMessageDialog.vue)
- Demo: [`src/app/home/dialog.vue`](../src/app/home/dialog.vue)
- Props: `modelValue`, `title`, `text`, `actions`, `icon`, `iconEmoji`, `iconColor`
- Emits: `update:modelValue`
- Notes: `actions` are truncated to at most two buttons.

#### `QTooltip`

- Source: [`src/components/common/QTooltip.vue`](../src/components/common/QTooltip.vue)
- Demo: [`src/app/home/tooltip.vue`](../src/app/home/tooltip.vue)
- Props: `content`, `position`, `trigger`, `delay`, `hideDelay`, `disabled`, `maxWidth`, `class`, `offset`, `arrow`
- Slots: default trigger slot, optional `content` slot
- Notes: supports `hover`, `click`, and `focus`.

#### `QToast`

- Source: [`src/components/common/QToast.vue`](../src/components/common/QToast.vue)
- Demo: [`src/app/home/toast.vue`](../src/app/home/toast.vue)
- Props: `modelValue`, `type`, `message`, `duration`, `closable`, `icon`, `class`
- Emits: `update:modelValue`, `close`
- Slots: default overrides `message`

#### `QToastContainer`

- Source: [`src/components/common/QToastContainer.vue`](../src/components/common/QToastContainer.vue)
- Demo: [`src/app/home/toast.vue`](../src/app/home/toast.vue)
- Props: `position`, `maxCount`
- Exposed methods: `addToast`, `removeToast`, `closeAll`
- Notes: usually controlled through `useToast()` instead of direct template usage.

#### `useToast`

- Source: [`src/composables/useToast.ts`](../src/composables/useToast.ts)
- Demo: [`src/app/home/toast.vue`](../src/app/home/toast.vue)
- API:
  - `show(options)`
  - `success(message, options?)`
  - `error(message, options?)`
  - `warning(message, options?)`
  - `info(message, options?)`
  - `closeAll()`

#### `QProgress`

- Source: [`src/components/common/QProgress.vue`](../src/components/common/QProgress.vue)
- Demo: [`src/app/home/progress.vue`](../src/app/home/progress.vue)
- Props: `infinite`, `color`, `max`, `value`
- Notes: `color` supports at least `blue`, `green`, `orange`, and `red`.

#### `QFence`

- Source: [`src/components/common/QFence.vue`](../src/components/common/QFence.vue)
- Demo: [`src/app/home/fence.vue`](../src/app/home/fence.vue)
- Props: `link`, `text`, `type`, `icon`
- Notes:
  - `type` supports `default`, `warning`, `error`, and `success`.
  - `icon` is a global component name string when using the plugin.

#### `QBadge`

- Source: [`src/components/common/QBadge.vue`](../src/components/common/QBadge.vue)
- Demo: [`src/app/home/badge.vue`](../src/app/home/badge.vue)
- Props: `type`, `size`, `variant`, `rounded`, `dot`, `closable`
- Emits: `close`
- Notes:
  - `type`: `default`, `primary`, `success`, `warning`, `danger`, `info`
  - `size`: `sm`, `md`, `lg`
  - `variant`: `filled`, `outlined`, `light`, plus theme-aware `technical` and `bracket`

#### `QSkeleton`

- Source: [`src/components/common/QSkeleton.vue`](../src/components/common/QSkeleton.vue)
- Demo: [`src/app/home/skeleton.vue`](../src/app/home/skeleton.vue)
- Props: `variant`, `width`, `height`, `animation`, `rounded`, `count`, `class`
- Slots: default
- Notes:
  - `variant`: `text`, `avatar`, `image`, `card`, `button`
  - `animation`: `wave`, `pulse`, `none`

#### `QCollapse`

- Source: [`src/components/common/QCollapse.vue`](../src/components/common/QCollapse.vue)
- Demo: [`src/app/home/collapse.vue`](../src/app/home/collapse.vue)
- Props: `modelValue`, `accordion`, `bordered`, `ghost`, `size`
- Emits: `update:modelValue`, `change`

#### `QCollapseItem`

- Source: [`src/components/common/QCollapseItem.vue`](../src/components/common/QCollapseItem.vue)
- Demo: [`src/app/home/collapse.vue`](../src/app/home/collapse.vue)
- Props: `name`, `title`, `subtitle`, `disabled`, `hideArrow`
- Emits: `expand`, `collapse`
- Slots: `icon`, `title`, `subtitle`, `extra`, `arrow`, default

#### `QDrawer`

- Source: [`src/components/common/QDrawer.vue`](../src/components/common/QDrawer.vue)
- Demo: [`src/app/home/drawer.vue`](../src/app/home/drawer.vue)
- Props: `modelValue`, `title`, `placement`, `size`, `closable`, `maskClosable`, `showMask`, `lockScroll`, `zIndex`
- Emits: `update:modelValue`, `open`, `close`
- Slots: `header`, default, `footer`
- Notes: teleports to `body`.

### Display, media, and decorative primitives

#### `QAvatar`

- Source: [`src/components/common/QAvatar.vue`](../src/components/common/QAvatar.vue)
- Demo: [`src/app/home/avatar.vue`](../src/app/home/avatar.vue)
- Props: `src`, `alt`, `size`, `variant`, `borderType`, `borderColor`
- Slots: default slot when no `src`
- Notes:
  - `variant`: `circle`, `rounded`, `square`
  - `borderType`: `none`, `solid`, `hollow`

#### `QDivider`

- Source: [`src/components/common/QDivider.vue`](../src/components/common/QDivider.vue)
- Demo: [`src/app/home/frame.vue`](../src/app/home/frame.vue)
- Props: `label`, `focus`, `double`
- Notes: use this instead of bare `.divider` when you need labeled or theme-token-aware section rules.

#### `QPremiumDecoration`

- Source: [`src/components/common/QPremiumDecoration.vue`](../src/components/common/QPremiumDecoration.vue)
- Demo: [`src/app/home/premium.vue`](../src/app/home/premium.vue)
- Props: `borderRadius`
- Slots: default
- Notes: adds a premium stripe to the left edge of its slot content.

#### `QPackCover`

- Source: [`src/components/common/QPackCover.vue`](../src/components/common/QPackCover.vue)
- Demo: [`src/app/home/cover.vue`](../src/app/home/cover.vue)
- Props: `title`, `subtitle`, `desc`, `src`, `alt`, `width`
- Notes: height is derived from width.

#### `QCard`

- Source: [`src/components/common/QCard.vue`](../src/components/common/QCard.vue)
- Demo: [`src/app/home/card.vue`](../src/app/home/card.vue)
- Props: `variant`, `hoverable`, `eyebrow`, `title`, `subtitle`, `marker`, `markerStyle`
- Slots: `media`, `header`, default, `footer`
- Notes:
  - `variant`: `default`, `dashed`, `annotated`, or `tile`
  - `marker` is used by `annotated` for the annotation label and by `tile` for the corner code
  - `markerStyle`: `plate` or `chip`, only used by `annotated`
  - `markerStyle="plate"` splits `marker` on `/` into a spec number and spec type
  - Morph theme adds stronger annotation marker, leader line, and tile code styling.

#### `QMediaFrame`

- Source: [`src/components/common/QMediaFrame.vue`](../src/components/common/QMediaFrame.vue)
- Demo: [`src/app/home/media-frame.vue`](../src/app/home/media-frame.vue)
- Props: `src`, `alt`, `ratio`, `objectFit`, `topLabel`, `bottomLabel`, `caption`, `crt`, `showCorners`, `showCoordinates`
- Slots: default media slot, `caption`
- Notes:
  - Useful for screenshots, image panels, diagram frames, and editorial media.
  - `crt` enables the optional overlay effect.

#### `QShare`

- Source: [`src/components/common/QShare.vue`](../src/components/common/QShare.vue)
- Demo: [`src/app/home/share.vue`](../src/app/home/share.vue)
- Props: `url`, `text`, `layout`, `services`
- Notes:
  - `layout` is `row` or `column`.
  - Uses built-in dialogs for Mastodon host input and generic QR sharing.
  - Depends on globally registered Quail components and icons.

#### `QPaymentApproachItem`

- Source: [`src/components/common/QPaymentApproachItem.vue`](../src/components/common/QPaymentApproachItem.vue)
- Demo: [`src/app/home/payment.vue`](../src/app/home/payment.vue)
- Props: `name`, `desc`, `icons`, `symbol`, `disabled`
- Slots: default slot appears between description and symbol
- Notes: `icons` are payment asset ids such as `visa`, `mastercard`, `paypal`, `wallet`, `evm`.

#### `QPaymentApproachSelect`

- Source: [`src/components/common/QPaymentApproachSelect.vue`](../src/components/common/QPaymentApproachSelect.vue)
- Demo: [`src/app/home/payment.vue`](../src/app/home/payment.vue)
- Props: `channels`, `defaultChannel`
- Emits: `select`
- Notes:
  - Mutates the passed channel objects' `selected` flags.
  - Best used with a dedicated reactive array copy in the consuming app.

## 7. Icon Catalog

Icons are exported from [`src/components/icons/index.ts`](../src/components/icons/index.ts). Color icons are brand-specific and should usually be used as-is. The rest follow `currentColor`.

### Usage

```vue
<QIconSearch class="icon" />
<QIconColorGithub class="icon" />
```

### Brand and color icons (`QIconColor*`)

```txt
QIconColorTelegram
QIconColorFeed
QIconColorTwitter
QIconColorFacebook
QIconColorLinkedin
QIconColorHackernews
QIconColorDiscord
QIconColorLine
QIconColorBluesky
QIconColorMastodon
QIconColorShare
QIconColorGithub
QIconColorSteam
QIconColorInstagram
QIconColorX
QIconColorSlack
QIconColorYoutube
```

### Monochrome and utility icons (`QIcon*`)

```txt
QIconArrowUpRight
QIconArrowLeft
QIconArrowRight
QIconBatteryMid
QIconBatteryFull
QIconCamera
QIconCheckCircle
QIconChevronDown
QIconChevronUp
QIconCommunity
QIconCopy
QIconCode
QIconDesktop
QIconDownloadCloud
QIconEcosystem
QIconFaceFrown
QIconFeather
QIconFilter
QIconHelp
QIconImage
QIconInfoSquare
QIconLinkBroken
QIconLogout
QIconMagicWand
QIconMail
QIconMenu
QIconMobile
QIconMoonStar
QIconPencil
QIconPlus
QIconQuail
QIconSearch
QIconSun
QIconTooling
QIconTrash
QIconUnsplash
QIconUserCircle
QIconZapSquare
QIconBitcoinCircle
QIconDollarCircle
QIconBold
QIconItalic
QIconExpand
QIconFileLock
QIconHead
QIconLink
QIconOrderedList
QIconQuote
QIconStrikeThrough
QIconUnorderedList
QIconBookOpen
QIconCheckHeart
QIconCompass
QIconClockRewind
QIconMessageChatSquare
QIconPaperclip
QIconPin
QIconSettings
QIconShoppingBag
QIconUsers
QIconDataflow
QIconFaceHappy
QIconMessageSquare
QIconShareSquare
QIconArrowUp
QIconArrowDown
QIconQrCode
QIconRefresh
QIconWallet
QIconCheckVerified
QIconFlash
QIconInbox
QIconKeyboard
QIconSpeedoMeter
QIconInfoCircle
QIconKey
QIconFingerprint
QIconFingerprintLock
QIconMusicNote
QIconPuzzle
QIconVideo
QIconCloseCircle
QIconEditorDelete
QIconLayoutRight
QIconStars
QIconMarkdown
QIconChevronDownDouble
QIconChevronUpDouble
QIconCpuChip
QIconEmail
QIconGrid
QIconPasscode
QIconStickerCircle
QIconEdit
QIconLinkExternal
QIconNavigationPointer
QIconNavigationPointerOff
QIconRefreshSingle
QIconSend
QIconShare
QIconTranslate
QIconThumbsUp
QIconUploadCloud
QIconCoinsHand
QIconLock
QIconLockKeyholeCircle
QIconPasscodeLock
QIconShieldTick
QIconBarChart
QIconBarChartSquare
QIconGithub
```

## 8. Source Of Truth Files

If you need exact implementation details, these are the next files to open:

- [`src/index.ts`](../src/index.ts)
- [`src/components/common/index.ts`](../src/components/common/index.ts)
- [`src/components/icons/index.ts`](../src/components/icons/index.ts)
- [`src/theme/index.ts`](../src/theme/index.ts)
- [`src/styles/base.scss`](../src/styles/base.scss)
- [`src/styles/layout/helper.scss`](../src/styles/layout/helper.scss)
- [`src/styles/component.scss`](../src/styles/component.scss)
- [`src/styles/theme/morph.scss`](../src/styles/theme/morph.scss)
- [`src/app/home.vue`](../src/app/home.vue)
- [`src/app/home`](../src/app/home)

When building new UI in another app, the shortest reliable workflow is:

1. Install `quail-ui` and import `quail-ui/style.css`.
2. Register the full `QuailUI` plugin unless you have a strong reason not to.
3. Pick the closest demo section from `src/app/home/*`.
4. Reuse Quail tokens, helper classes, and icons instead of inventing equivalents.
5. Use `applyTheme()` to stay aligned with `light`, `dark`, or `morph`.
