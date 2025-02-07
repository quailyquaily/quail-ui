<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">DatetimePicker</h2>
    <div class="grid gap-4 grid-cols-2">
      <QDatetimePicker v-model="datetimeValue" />
      <QDatetimePicker v-model="datetimeValue" disabled />
      <QDatetimePicker v-model="datetimeValue" accept="date"/>
      <QDatetimePicker v-model="datetimeValue" accept="time" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const datetimeValue = ref("2023-10-23");
</script>