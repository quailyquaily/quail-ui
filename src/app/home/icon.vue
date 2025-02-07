<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Icons</h2>
    <div class="q-text-caption q-c-dark-3 mb-2">QIconColor*</div>
    <div class="grid gap-2 grid-cols-2 md-grid-cols-3 lg-grid-cols-5 mb-4">
      <div v-for="icon in colorIcons" class="icon-wrapper frame">
          <component :is="icon" :data-name="icon.name" class="icon"/>
          <span class="label text-xs ml-2">{{ icon.name }}</span>
        </div>
    </div>
    <div class="q-text-caption q-c-dark-3 mb-2">QIcon*</div>
    <div class="grid gap-2 grid-cols-2 md-grid-cols-3 lg-grid-cols-5">
      <div v-for="icon in monoIcons" class="icon-wrapper frame">
          <component :is="icon" :data-name="icon.name" class="icon"/>
          <span class="label text-xs ml-2">{{ icon.name }}</span>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import * as icons from "../../components/icons";
const colorIcons = computed(() => {
  const newKeys = Object.keys(icons).filter((k) => {
    return k.startsWith("QIconColor");
  });
  const ret:any = {};
  newKeys.forEach((k) => {
    ret[k] = (icons as any)[k];
  });
  return ret;
});
const monoIcons = computed(() => {
  const newKeys = Object.keys(icons).filter((k) => {
    return !k.startsWith("QIconColor");
  });
  const ret:any = {};
  newKeys.forEach((k) => {
    ret[k] = (icons as any)[k];
  });
  return ret;
});
</script>

<style scoped lang="scss">
.icon-wrapper {
  padding: 1rem 0.5rem !important;
  display: flex;
  align-items: center;
  height: 24px;
  .icon {
    height: 20px;
    width: 20px;
    min-width: 20px;
  }
  .label {
    font-family: monospace;
  }
}
</style>