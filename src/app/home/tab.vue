<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Tab</h2>

    <div class="demo-groups">
      <!-- Variants -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Variants</div>
        <div class="flow">
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Normal</div>
            <QTabs v-model="selectedTab" :tabs="tabs"/>
          </div>
          <div>
            <div class="q-text-caption q-c-dark-3 mb-2">Plain</div>
            <QTabs v-model="selectedTab" :tabs="tabs" variant="plain"/>
          </div>
        </div>
      </div>

      <!-- Interaction -->
      <div class="demo-group">
        <div class="group-label q-text-caption q-c-dark-3">Interaction</div>
        <div class="flow">
          <QButton class="outlined" @click="selectedTab = tabs[1]">Select Tab 2</QButton>
          <div class="frame p-3 q-text-desc">
            Selected tab id: {{ selectedTab.id }}
          </div>
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
</style>
