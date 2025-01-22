<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Input</h2>
    <div class="grid gap-4 grid-cols-2">
      <QInput v-model="inputValue" type="text" placeholder="type here!" :hint-text="'Less than 10 charactors'" :max="10"/>
      <QInput v-model="inputValue" type="text" placeholder="type here!" :error="true" :hint-text="'Some errors!'"/>
      <QInput v-model="inputValue" type="text" placeholder="type here!" :disabled="true"/>
      <QInput v-model="inputValue" type="text" placeholder="type here!" />
      <QInput v-model="inputValue" type="text" placeholder="type here!">
        <template #prepend-out>
          <QSwitch class="mr-2" v-model="switchValue"/>
        </template>
        <template #prepend>
          <QIconSearch class="icon ml-2" />
        </template>
        <template #append>
          <QButton class="outlined xs icon mr-2">
            <QIconSun class="icon" />
          </QButton>
        </template>
        <template #append-out>
          <QButton class="highlight icon ml-2">
            <QIconMenu class="icon" />
          </QButton>
        </template>
      </QInput>
      <div class="frame p-3 q-text-desc">
        <div>inputValue: {{ inputValue }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const switchValue = ref(false);
const inputValue = ref('');
</script>

<style scoped lang="scss">
</style>