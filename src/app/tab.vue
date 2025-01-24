<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Tab</h2>
    <div class="grid gap-4 grid-cols-1">
      <div class="flex">
        <div>
          <div class="q-text-caption q-c-dark-3 mb-2">variant: normal</div>
          <QTabs v-model="selectedTab" :tabs="tabs" class="mr-4"/>
        </div>
        <div>
          <div class="q-text-caption q-c-dark-3 mb-2">variant: plain</div>
          <QTabs v-model="selectedTab" :tabs="tabs" variant="plain" class="mr-4"/>
        </div>
      </div>
      <div class="flex">
        <QButton class="outlined" @click="selectedTab = tabs[1]">Select Tab 2</QButton>
        <div class="frame p-3 ml-4 q-text-desc">
          Selected tab id: {{ selectedTab.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const tabs = computed(() => [
  { id: "tab1", title: "Tab 1", icon: "QIconSun" },
  { id: "tab2", icon: "QIconMagicWand" },
  { id: "tab3", title: "Tab 3" },
]);

const selectedTab = ref(tabs.value[0]);
</script>

<style scoped lang="scss">
</style>