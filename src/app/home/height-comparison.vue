<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Height Comparison</h2>

    <div class="height-compare-row">
      <QButton class="outlined q-height-control">Outlined Button</QButton>
      <QInput
        v-model="inputValue"
        class="q-height-control"
        placeholder="QInput"
      />
      <QDropdownMenu
        class="q-height-control"
        :items="dropdownItems"
        :initial-item="selectedDropdownItem"
        @change="onDropdownChange"
      />
      <QTextFieldWithButton
        v-model="textFieldValue"
        class="q-height-control"
        layout="horizontal"
        placeholder="Horizontal TextFieldWithButton"
        action-label="Submit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type DropdownItem = {
  title: string;
};

const inputValue = ref('');
const textFieldValue = ref('demo@example.com');

const dropdownItems: DropdownItem[] = [
  { title: 'Option A' },
  { title: 'Option B' },
  { title: 'Option C' },
];

const selectedDropdownItem = ref<DropdownItem>(dropdownItems[0]);

function onDropdownChange(item: DropdownItem) {
  selectedDropdownItem.value = item;
}
</script>

<style scoped lang="scss">
.height-compare-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.height-compare-row :deep(.q-height-control) {
  width: 100%;
}

.height-compare-row :deep(.q-text-field-with-button.q-height-control.horizontal) {
  max-width: none;
}
</style>
