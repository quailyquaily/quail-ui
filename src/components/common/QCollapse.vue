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
  &.q-collapse-bordered {
    border: 1px solid var(--q-c-dark-4);
    border-radius: var(--q-radius-md);
    overflow: hidden;
  }

  &.q-collapse-ghost {
    background: transparent;
  }
}

.dark {
  .q-collapse.q-collapse-bordered {
    border-color: var(--q-c-light-4);
  }
}
</style>
