<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Textarea</h2>
    <div class="grid gap-4 grid-cols-3">
      <div class="mb-4">
        <QTextarea v-model="inputValue" placeholder="type here!" />
        </div>
        <div class="mb-4">
          <QTextarea v-model="inputValue" placeholder="type here!" :error='true' :hint-text="'Some errors!'"/>
        </div>
        <div>
          <QTextarea v-model="inputValue" placeholder="type here!" :max="100" :hint-icon="'QIconMarkdown'" :hint-text="'Markdown Enabled.'"/>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('');
</script>

<style scoped lang="scss">
</style>