<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: Object,
  tabs: {
    type: Array<any>,
    required: true,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["change", "update:modelValue"]);

const selectedTab = ref(props.tabs[props.initialIndex]);

const selectedIndex = ref(props.initialIndex);

watch(() => props.modelValue, (tab:any) => {
	selectedIndex.value = props.tabs.findIndex((t:any) => t.id === tab.id);
  selectedTab.value = tab || props.tabs[0];
});

function selectTab(ix: number, tab: any) {
  selectedIndex.value = ix;
  selectedTab.value = tab;
  emit("change", {index: ix, tab: tab});
  emit('update:modelValue', tab);
}


function genCls(tab:any, ix: number) {
  const ret = [];
  if (selectedIndex.value === ix) {
    ret.push("selected outlined");
  } else {
    ret.push("plain");
  }
  if (tab.icon) {
    ret.push("with-icon");
  }
  if (tab.title) {
    ret.push("with-label");
  }
  return ret.join(" ");
}

</script>

<template>
  <div class="q-tabs">
    <QButton class="q-tab-button sm" :class="genCls(tab, ix)"
      v-for="tab, ix in tabs" :key="`tab-button-${ix}`" @click="selectTab(ix, tab)">
      <template v-if="tab.icon">
        <component :is="tab.icon" class="q-tab-button-icon" />
      </template>
      <div class="q-tab-button-label">
        {{ tab.title }}
      </div>
    </QButton>
  </div>
</template>

<style lang="scss" scoped>
.q-tabs {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: hsl(240 4.8% 95.9%);
  padding: .25rem;
  &:deep(.q-button) {
    transition: none;
    border-radius: 4px !important;
    &.outlined {
      background-color: white !important;
      border: 1px solid var(--vt-c-divider-light-2);
    }
    &.plain {
      border: 1px solid transparent !important;
      opacity: 0.6 !important;
      &:hover {
        background-color: transparent !important;
      }
    }
  }
  .q-tab-button {
    &.with-icon.with-label {
      .q-tab-button-icon {
        margin-right: 0.5rem;
      }
    }
    .q-tab-button-icon {
      height: 16px;
      width: 16px;
      max-width: 16px;
    }
  }
}
</style>