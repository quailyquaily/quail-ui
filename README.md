# Quail UI

The Vue3 UI library for [Quaily](https://quaily.com).

[Demo](https://quailyquaily.github.io/quail-ui/)

## Installation

```bash
npm install quail-ui
```

or with yarn

```bash
yarn add quail-ui
```

## Usage

Init Quail UI in your main.js file.

```js
import { createApp } from 'vue'
import { QuailUI, Icons } from 'quail-ui'

// import style
import 'quail-ui/dist/style.css'

// ...

const app = createApp(App)
app.use(QuailUI)
```

Use the components in your .vue files.

```vue
<template>
  <div class="image-uploader" :class="rounded? 'rounded':''">
    <QLoading v-if="loading" class="loading-mask"/>
    <QIconCamera class="icon"/>
  </div>
</template>
```

