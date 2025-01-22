<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Tab</h2>
    <div class="grid gap-4 grid-cols-1">
      <div class="flex">
        <QTabs v-model="selectedTab" :tabs="tabs" />
        <QButton class="outlined ml-4" @click="selectedTab = tabs[1]">Select Tab 2</QButton>
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