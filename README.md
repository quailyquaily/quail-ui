# Quaily UI

A Vue 3 component library for [Quaily](https://quaily.com).

[Live Demo](https://quailyquaily.github.io/quail-ui/)

## Features

- 26+ UI components (Button, Input, Dialog, Menu, Tabs, etc.)
- 110+ SVG icons
- Theme support (light, dark, morph)
- TUI (Terminal UI) mode with monospace fonts
- Fully typed with TypeScript
- SCSS with CSS custom properties

## Installation

```bash
npm install quail-ui
```

or with yarn

```bash
yarn add quail-ui
```

## Usage

Initialize Quaily UI in your main.js/main.ts file:

```js
import { createApp } from 'vue'
import { QuailUI } from 'quail-ui'
import 'quail-ui/dist/index.css'

const app = createApp(App)
app.use(QuailUI)
app.mount('#app')
```

Use components in your .vue files:

```vue
<template>
  <QButton class="primary" @click="handleClick">
    Click Me
  </QButton>

  <QInput v-model="text" placeholder="Enter text..." />

  <QDialog v-model="showDialog" title="Hello">
    <p>Dialog content here</p>
  </QDialog>
</template>
```

### Usage via CDN (No Build Tools)

You can use Quaily UI directly in HTML without any build tools:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/quail-ui/dist/index.css" />
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js",
        "quail-ui": "https://unpkg.com/quail-ui/dist/index.js"
      }
    }
  </script>
</head>
<body>
  <div id="app">
    <q-button class="primary">Hello</q-button>
    <q-fence text="This is a notice" type="warning"></q-fence>
  </div>

  <script type="module">
    import { createApp } from 'vue'
    import { QuailUI } from 'quail-ui'

    const app = createApp({})
    app.use(QuailUI)
    app.mount('#app')
  </script>
</body>
</html>
```

## Components

| Component | Description |
|-----------|-------------|
| QButton | Button with variants (primary, outlined, plain, danger, etc.) |
| QInput | Text input with validation and slots |
| QTextarea | Multi-line text input |
| QDialog | Modal dialog |
| QMenu | Dropdown menu |
| QTabs | Tab navigation |
| QSwitch | Toggle switch |
| QProgress | Progress bar |
| QAvatar | User avatar |
| QPagination | Page navigation |
| QFence | Alert/notice box |
| ... | And more |

## Theme Switching

Quail UI includes three built-in themes:

- `light`
- `dark`
- `morph`

Use the exported theme helpers:

```js
import { applyTheme, resolveInitialTheme } from 'quail-ui'

// Initialize from localStorage / system preference
const initialTheme = resolveInitialTheme()
applyTheme(initialTheme)

// Switch theme
applyTheme('light')
applyTheme('dark')
applyTheme('morph')

// Optional: switch without persisting to localStorage
applyTheme('morph', false)
```

`applyTheme` updates `document.body.dataset.theme` and toggles `.dark/.light` body classes automatically.

For legacy usage, dark mode still works by toggling the `.dark` class on `<body>`.

## TUI Mode

Enable terminal-style UI with monospace fonts:

```js
document.body.classList.add('tui')
```

## License

MIT
