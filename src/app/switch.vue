<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Switch and Checkbox</h2>
    <div class="grid gap-4 grid-cols-4 mb-4">
      <QSwitch v-model="switchValue1" />
      <QSwitch v-model="switchValue2" />
      <QSwitch v-model="switchValue2" theme="clear-sky"/>
      <QSwitch v-model="switchValue2" theme="plastic"/>
    </div>
    <div class="grid gap-4 grid-cols-4">
      <div class="flex items-center">
        <input id="checkbox1" type="checkbox" class="q-checkbox" v-model="switchValue1" />
        <label for="checkbox1" class="q-text-body-title ml-3">Checkbox</label>
      </div>
      <div class="flex items-center">
        <input id="checkbox1" type="checkbox" class="q-checkbox" disabled v-model="switchValue1" />
        <label for="checkbox1" class="q-text-body-title ml-3">Checkbox</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const switchValue1 = ref(false);
const switchValue2 = ref(true);
</script>
