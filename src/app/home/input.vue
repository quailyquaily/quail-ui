<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Input</h2>
    <div class="grid gap-4 grid-cols-2 mb-4">
      <QInput v-model="defaultInputValue" type="text" placeholder="type here!" :hint-text="'Less than 10 charactors'" :max="10"/>
      <QInput v-model="inputValue" type="text" placeholder="type here!" :error="true" :hint-text="'Some errors!'"/>
      <QInput v-model="inputValue" type="text" placeholder="type here!" :disabled="true" :hint-text="'Some errors!'"/>
      <QInput v-model="inputValue" type="text" placeholder="type here!" :disabled="true"/>
      <QInput v-model="inputValue" type="text" placeholder="type here!" />
      <QInput v-model="inputValue" type="text" placeholder="type here!" :max="100">
        <template #prepend-out>
          <QSwitch class="mr-2" v-model="switchValue"/>
        </template>
        <template #prepend>
          <QIconSearch class="text-field-icon ml-3" />
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
    <div>
      <div class="q-text-caption q-c-dark-3 mb-2">search input</div>
      <div class="grid gap-4 grid-cols-2">
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const switchValue = ref(false);
const inputValue = ref('');
const searchValue = ref('');
const defaultInputValue = ref('Hello!');

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
</style>