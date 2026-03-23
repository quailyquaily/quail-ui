<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Input</h2>

    <div class="demo-groups">
      <!-- Basic -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Basic</div>
        <div class="demo-row">
          <QInput v-model="defaultInputValue" type="text" placeholder="type here!" :hint-text="'Less than 10 charactors'" :max="10"/>
          <QInput v-model="inputValue" type="text" placeholder="type here!" />
        </div>
      </div>

      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Sizes</div>
        <div class="demo-row">
          <QInput v-model="smallInputValue" class="sm" type="text" placeholder="small input" />
          <QInput v-model="xsInputValue" class="xs" type="text" placeholder="xs input" />
        </div>
      </div>

      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Height Comparison</div>
        <div class="comparison-list">
          <div class="comparison-row">
            <div class="comparison-label q-text-caption q-c-dark-3">Default 44px</div>
            <QInput v-model="comparisonDefaultValue" type="text" placeholder="default input" />
            <QButton class="outlined">Default button</QButton>
          </div>
          <div class="comparison-row">
            <div class="comparison-label q-text-caption q-c-dark-3">Small 38px</div>
            <QInput v-model="comparisonSmallValue" class="sm" type="text" placeholder="small input" />
            <QButton class="sm outlined">Small button</QButton>
          </div>
          <div class="comparison-row">
            <div class="comparison-label q-text-caption q-c-dark-3">XS 32px</div>
            <QInput v-model="comparisonXsValue" class="xs" type="text" placeholder="xs input" />
            <QButton class="xs outlined">XS button</QButton>
          </div>
        </div>
      </div>

      <!-- States -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">States</div>
        <div class="demo-row">
          <QInput v-model="inputValue" type="text" placeholder="type here!" :error="true" :hint-text="'Some errors!'"/>
          <QInput v-model="inputValue" type="text" placeholder="disabled" :disabled="true"/>
        </div>
      </div>

      <!-- With Slots -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">With Slots</div>
        <div class="demo-row">
          <QInput v-model="inputValue" type="text" placeholder="type here!" :max="100">
            <template #prepend-out>
              <QSwitch class="mr-2" v-model="switchValue"/>
            </template>
            <template #prepend>
              <QIconSearch class="text-field-icon ml-2" />
            </template>
            <template #append>
              <QButton class="outlined xs icon">
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

      <!-- Search Input -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Search Input</div>
        <div class="demo-row">
          <QSearchInput v-model="searchValue" :items="searchItems"
            placeholder="Search here. e.g. apple"
            @keyup="searchInputKeyup" @select="selectSearchResult"
          />
          <div class="frame p-3 q-text-desc">
            search result: {{ searchValue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const switchValue = ref(false);
const inputValue = ref('');
const searchValue = ref('');
const defaultInputValue = ref('Hello!');
const smallInputValue = ref('');
const xsInputValue = ref('');
const comparisonDefaultValue = ref('');
const comparisonSmallValue = ref('');
const comparisonXsValue = ref('');

const searchItems = computed(() => {
  const source = [
    "Apple", "Banana", "Cherry", "Donut", "Apple Pie", "Banana Split",
  ];
  const ret = source.map((item) => {
    return {
      title: item,
      subtitle: `This is a ${item}`,
      action: () => {
        console.log("search item selected", item);
      },
    };
  });
  return ret.filter((item) => item.title.toLowerCase().includes(searchValue.value.toLowerCase()));
})

function searchInputKeyup(val:any) {
  console.log("searchInputChanged", val);
}

function selectSearchResult(val:any) {
  console.log("select result ", val);
}
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

.comparison-list {
  display: grid;
  gap: 0.75rem;
}

.comparison-row {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

.comparison-label {
  font-weight: 500;
}
</style>
