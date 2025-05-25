<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Textarea</h2>
    <div class="grid gap-4 grid-cols-2">
      <div class="mb-4">
        <QTextarea v-model="inputValue" placeholder="type here!" />
      </div>
      <div class="mb-4">
        <QTextarea v-model="inputValue" placeholder="type here!" :disabled="true"/>
      </div>
      <div class="mb-4">
        <QTextarea v-model="inputValue" placeholder="type here!" :error='true' :hint-text="'Some errors!'"/>
      </div>
      <div>
        <QTextarea v-model="inputValue" placeholder="type here!" :max="100" :hint-icon="'QIconMarkdown'" :hint-text="'Markdown Enabled.'"/>
      </div>
      <div>
        <QTextarea v-model="inputValue" placeholder="type here!" :max="100" :hint-icon="'QIconMarkdown'" :hint-text="'Markdown Enabled.'" :disabled="true"/>
      </div>
      <div>
        <QTextarea v-model="inputValue" placeholder="type here!" :max="100" :hint-icon="'QIconMarkdown'" :hint-text="'Markdown Enabled.'">
          <template #prepend-out>
            <QButton class="outlined icon mr-2 sm">
              <QIconArrowLeft class="icon" />
            </QButton>
          </template>
          <template #prepend>
            <QIconSearch class="icon text-field-icon q-c-dark-3 ml-3 mt-3" />
          </template>
          <template #append>
            <QButton class="plain icon mt-1 mr-1 sm danger">
              <QIconMagicWand class="icon text-field-icon" />
            </QButton>
          </template>
          <template #append-out>
            <QButton class="highlight icon sm ml-2">
              <QIconMenu class="icon" />
            </QButton>
          </template>
        </QTextarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('');
</script>

<style scoped lang="scss">
.text-field-icon {
  width: 16px;
  height: 16px;
}
</style>