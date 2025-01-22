<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">TextFieldWithButton</h2>
    <div class="grid gap-4 grid-cols-3">
      <QTextFieldWithButton v-model="fieldValue" type="text" placeholder="type here!"  action-label="Go!" button-cls="primary" @submit="submit"/>
      <QTextFieldWithButton v-model="fieldValue" type="email" placeholder="your email here!" action-label="Subscribe" @submit="submit"/>
      <QTextFieldWithButton v-model="fieldValue" type="text" placeholder="type here!"  default-text="some default text" button-cls="highlight elevated" action-label="Go!" @submit="submit"/>
      <QTextFieldWithButton v-model="fieldValue" type="text" placeholder="type here!"  default-text="some default text" button-cls="danger" action-label="Do something" @submit="submit"/>
      <QTextFieldWithButton v-model="fieldValue" type="email" layout="horizontal" placeholder="your email here!" action-label="Subscribe" @submit="submit"/>
      <QTextFieldWithButton v-model="fieldValue" type="email" layout="horizontal" placeholder="your email here!" action-label="Subscribe" button-cls="highlight elevated" @submit="submit"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fieldValue = ref<string>('');
const submit = () => {
  console.log('submit', fieldValue.value);
}
</script>