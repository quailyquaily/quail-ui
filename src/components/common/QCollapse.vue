<script lang="ts" setup>
import { ref, provide, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
  accordion: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  ghost: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const activeKeys = ref<string[]>([...props.modelValue]);

watch(() => props.modelValue, (val) => {
  activeKeys.value = [...val];
}, { deep: true });

function isActive(key: string): boolean {
  return activeKeys.value.includes(key);
}

function toggle(key: string) {
  if (props.accordion) {
    if (activeKeys.value.includes(key)) {
      activeKeys.value = [];
    } else {
      activeKeys.value = [key];
    }
  } else {
    const index = activeKeys.value.indexOf(key);
    if (index > -1) {
      activeKeys.value.splice(index, 1);
    } else {
      activeKeys.value.push(key);
    }
  }
  emit('update:modelValue', [...activeKeys.value]);
  emit('change', [...activeKeys.value]);
}

provide('collapse', {
  isActive,
  toggle,
  size: props.size,
  ghost: props.ghost,
});

const cls = computed(() => {
  const classes = ['q-collapse', `q-collapse-${props.size}`];
  if (props.bordered && !props.ghost) classes.push('q-collapse-bordered');
  if (props.ghost) classes.push('q-collapse-ghost');
  return classes.join(' ');
});
</script>

<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.q-collapse {
  --q-collapse-shell-bg: var(--q-bg-white);
  --q-collapse-border-color: var(--q-c-dark-4);
  --q-collapse-header-bg: color-mix(in srgb, var(--q-bg-light) 72%, white);
  --q-collapse-header-hover-bg: color-mix(in srgb, var(--q-bg-light-2) 68%, white);
  --q-collapse-header-active-bg: color-mix(in srgb, var(--q-bg-light-float) 90%, white);
  --q-collapse-header-active-accent: var(--q-c-dark);
  --q-collapse-title-color: var(--q-c-dark);
  --q-collapse-subtitle-color: var(--q-c-dark-3);
  --q-collapse-body-color: var(--q-c-dark-2);
  --q-collapse-content-bg: color-mix(in srgb, var(--q-bg-light-float) 92%, white);
  --q-collapse-content-border: var(--q-c-dark-5);
  --q-collapse-icon-bg: color-mix(in srgb, var(--q-bg-light) 80%, white);
  --q-collapse-icon-color: var(--q-c-dark-2);
  --q-collapse-arrow-color: var(--q-c-dark-3);
  --q-collapse-arrow-active-color: var(--q-c-dark);
  --q-collapse-item-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
  position: relative;
  display: grid;
  gap: 0;

  &.q-collapse-bordered {
    border: 1px solid var(--q-collapse-border-color);
    border-radius: var(--q-radius-md);
    overflow: hidden;
    background: var(--q-collapse-shell-bg);
  }

  &.q-collapse-ghost {
    background: transparent;
  }
}

.dark {
  .q-collapse {
    --q-collapse-shell-bg: color-mix(in srgb, var(--q-bg-dark-2) 94%, black);
    --q-collapse-border-color: var(--q-c-light-4);
    --q-collapse-header-bg: color-mix(in srgb, var(--q-bg-dark-2) 92%, black);
    --q-collapse-header-hover-bg: color-mix(in srgb, var(--q-bg-dark-2) 82%, black);
    --q-collapse-header-active-bg: color-mix(in srgb, var(--q-bg-dark-2) 88%, black);
    --q-collapse-header-active-accent: var(--q-c-light);
    --q-collapse-title-color: var(--q-c-light);
    --q-collapse-subtitle-color: var(--q-c-light-3);
    --q-collapse-body-color: var(--q-c-light-2);
    --q-collapse-content-bg: color-mix(in srgb, var(--q-bg-dark-2) 90%, black);
    --q-collapse-content-border: var(--q-c-light-5);
    --q-collapse-icon-bg: color-mix(in srgb, var(--q-bg-dark-2) 82%, black);
    --q-collapse-icon-color: var(--q-c-light-2);
    --q-collapse-arrow-color: var(--q-c-light-3);
    --q-collapse-arrow-active-color: var(--q-c-light);
    --q-collapse-item-shadow: 0 12px 28px rgba(0, 0, 0, 0.26);
  }
}
</style>
