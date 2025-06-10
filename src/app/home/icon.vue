<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Icons</h2>
    <div class="q-text-caption q-c-dark-3 mb-2">QIconColor*</div>
    <div class="grid gap-2 grid-cols-2 md-grid-cols-3 lg-grid-cols-5 mb-4">
      <div v-for="icon in colorIcons" class="icon-wrapper">
        <div class="icon-wrapper-top">
          <component :is="icon" :data-name="icon.name" class="icon"/>
        </div>
        <div class="icon-wrapper-bottom">
          <span class="label q-text-caption">{{ icon.name }}</span>
          <div class="spacer"></div>
          <QButton class="xxs icon plain copy-button" @click="copyIcon(icon.name)">
            <QIconCopy class="icon" />
          </QButton>
        </div>
      </div>
    </div>
    <div class="q-text-caption q-c-dark-3 mb-2">QIcon*</div>
    <div class="grid gap-4 grid-cols-2 md-grid-cols-3 lg-grid-cols-5">
      <div v-for="icon in monoIcons" class="icon-wrapper">
        <div class="icon-wrapper-top">
          <component :is="icon" :data-name="icon.name" class="icon"/>
        </div>
        <div class="icon-wrapper-bottom">
          <span class="label q-text-caption">{{ icon.name }}</span>
          <div class="spacer"></div>
          <QButton class="xxs icon plain copy-button" @click="copyIcon(icon.name)">
            <QIconCopy class="icon" />
          </QButton>
        </div>
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
const copyIcon = (name: string) => {
  navigator.clipboard.writeText(name);
};
</script>

<style scoped lang="scss">
.icon-wrapper {
  .icon-wrapper-top {
    .icon {
      height: 16px;
      width: 16px;
      min-width: 16px;
    }
  }
  .icon-wrapper-bottom {
    display: flex;
    align-items: center;
    height: 24px;
    .label {
      font-family: monospace;
    }
    .copy-button {
      .icon {
        height: 12px !important;
        width: 12px !important;
      }
    }
  }
}
</style>