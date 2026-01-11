<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';

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

// Refs for indicator animation
const tabsContainer = ref<HTMLElement | null>(null);
const tabButtons = ref<HTMLElement[]>([]);
const indicatorStyle = ref({
  left: '0px',
  width: '0px',
});

function updateIndicator() {
  nextTick(() => {
    const container = tabsContainer.value;
    const button = tabButtons.value[selectedIndex.value];
    if (container && button) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      indicatorStyle.value = {
        left: `${buttonRect.left - containerRect.left}px`,
        width: `${buttonRect.width}px`,
      };
    }
  });
}

watch(() => props.modelValue, (tab: any) => {
  selectedIndex.value = props.tabs.findIndex((t: any) => t.id === tab.id);
  selectedTab.value = tab || props.tabs[0];
  updateIndicator();
});

watch(selectedIndex, () => {
  updateIndicator();
});

onMounted(() => {
  updateIndicator();
});

function selectTab(ix: number, tab: any) {
  selectedIndex.value = ix;
  selectedTab.value = tab;
  emit("change", { index: ix, tab: tab });
  emit('update:modelValue', tab);
}

function setTabButtonRef(el: any, ix: number) {
  if (el) {
    tabButtons.value[ix] = el.$el || el;
  }
}


function genCls(tab:any, ix: number) {
  const ret = [];
  if (props.variant === "normal") {
    if (selectedIndex.value === ix) {
      ret.push("selected outlined border-radius-xs");
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
  <div class="q-tabs" :class="props.variant" ref="tabsContainer">
    <div class="q-tabs-indicator" :style="indicatorStyle"></div>
    <QButton class="q-tab-button sm" :class="genCls(tab, ix)"
      v-for="tab, ix in tabs" :key="`tab-button-${ix}`"
      :ref="(el: any) => setTabButtonRef(el, ix)"
      @click="selectTab(ix, tab)">
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
  position: relative;

  .q-tabs-indicator {
    position: absolute;
    bottom: 0;
    height: 2px;
    background-color: var(--q-c-red);
    // Elastic easing - slight overshoot then settle
    transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  .q-tab-button {
    position: relative;
    z-index: 1;
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

    .q-tabs-indicator {
      top: .25rem;
      bottom: .25rem;
      height: auto;
      background-color: white;
      border-radius: 4px;
      border: 0.5px solid var(--q-c-dark-4);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    &:deep(.q-button) {
      transition: none;
      background-color: transparent !important;
      border: 0.5px solid transparent !important;
      &.non-selected {
        opacity: 0.6 !important;
        &:hover {
          opacity: 0.8 !important;
        }
      }
    }
  }
  &.plain {
    box-shadow: inset 0 -0.5px 0 0 var(--q-c-dark-4);
    padding: 0;

    .q-tabs-indicator {
      bottom: 0;
      height: 2px;
      border-radius: 1px 1px 0 0;
    }

    &:deep(.q-button) {
      transition: color 0.2s ease-in-out;
      border-radius: 0 !important;
      border-bottom: none !important;
      &.squircle {
        --squircle-radius-bottom-left: 0px;
        --squircle-radius-bottom-right: 0px;
      }
      &.selected {
        color: var(--q-c-red) !important;
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
</style>

<style lang="scss">
.dark {
  .q-tabs {
    &.normal {
      background-color: var(--q-bg-dark-2);
      box-shadow: inset 0 0 0 1px var(--q-c-light-5);

      .q-tabs-indicator {
        background-color: var(--q-bg-dark-float);
        border: 0.5px solid var(--q-c-light-4);
        box-shadow: none;
      }
    }
    &.plain {
      box-shadow: inset 0 -0.5px 0 0 var(--q-c-light-4);

      .q-tabs-indicator {
        background-color: var(--q-c-red-light);
      }

      .q-button {
        &.selected {
          color: var(--q-c-red-light) !important;
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
