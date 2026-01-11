<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Textarea</h2>

    <div class="demo-groups">
      <!-- Basic -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Basic</div>
        <div class="demo-row">
          <QTextarea v-model="inputValue" placeholder="type here!" />
          <QTextarea v-model="inputValue" placeholder="with max length" :max="100" />
        </div>
      </div>

      <!-- States -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">States</div>
        <div class="demo-row">
          <QTextarea v-model="inputValue" placeholder="disabled" :disabled="true"/>
          <QTextarea v-model="inputValue" placeholder="with error" :error='true' :hint-text="'Some errors!'"/>
        </div>
      </div>

      <!-- With Hint -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">With Hint Icon</div>
        <div class="demo-row">
          <QTextarea v-model="inputValue" placeholder="type here!" :max="100" :hint-icon="'QIconMarkdown'" :hint-text="'Markdown Enabled.'"/>
          <QTextarea v-model="inputValue" placeholder="disabled with hint" :max="100" :hint-icon="'QIconMarkdown'" :hint-text="'Markdown Enabled.'" :disabled="true"/>
        </div>
      </div>

      <!-- With Slots -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">With Slots</div>
        <div class="demo-row">
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

.demo-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.demo-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.demo-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
</style>
