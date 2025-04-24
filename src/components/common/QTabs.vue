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
  variant: {
    type: String,
    default: "normal", // normal, plain
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
  if (props.variant === "normal") {
    if (selectedIndex.value === ix) {
      ret.push("selected outlined");
    } else {
      ret.push("non-selected plain");
    }
  } else if (props.variant === "plain") {
    if (selectedIndex.value === ix) {
      ret.push("selected plain");
    } else {
      ret.push("non-selected plain");
    }
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
  <div class="q-tabs" :class="props.variant">
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
  &.normal {
    border-radius: 6px;
    background-color: var(--q-bg-light-float);
    padding: .25rem;
    &:deep(.q-button) {
      transition: none;
      border-radius: 4px !important;
      &.selected {
        background-color: white !important;
        border: 0.5px solid var(--q-c-dark-4);
      }
      &.non-selected {
        border: 0.5px solid transparent !important;
        opacity: 0.6 !important;
        &:hover {
          background-color: transparent !important;
        }
      }
    }
  }
  &.plain {
    box-shadow: inset 0 -0.5px 0 0 var(--q-c-dark-4);
    padding: 0;
    &:deep(.q-button) {
      transition: all 0.2s ease-in-out;
      border-radius: 0 !important;
      border-bottom: 1px solid transparent;
      &.selected {
        color: var(--q-c-red) !important;
        border-bottom: 1px solid var(--q-c-red);
      }
      &.non-selected {
        color: var(--q-c-dark) !important;
      }
      &:hover {
        background-color: var(--q-c-red-dimm-1);
      }
    }
  }
}
.dark {
  .q-tabs {
    &.normal {
      background-color: var(--q-bg-dark-2);
      box-shadow: inset 0 0 0 1px var(--q-c-light-5);
      &:deep(.q-button) {
        &.selected {
          background-color: var(--q-bg-dark) !important;
          border: 0.5px solid var(--q-c-dark-4);
        }
      }
    }
    &.plain {
      box-shadow: inset 0 -0.5px 0 0 var(--q-c-light-4);
      &:deep(.q-button) {
        &.selected {
          color: var(--q-c-red-light) !important;
          border-bottom: 1px solid var(--q-c-red-light);
        }
        &.non-selected {
          color: var(--q-c-light-2) !important;
        }
        &:hover {
          background-color: var(--q-c-red-dimm-2);
        }
      }
    }
  }
}
</style>