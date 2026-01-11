<script lang="ts" setup>
import { inject, computed, ref, watch, nextTick, onMounted } from 'vue';
import QIconChevronDown from '../icons/QIconChevronDown.vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hideArrow: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['expand', 'collapse']);

const collapse = inject<{
  isActive: (key: string) => boolean;
  toggle: (key: string) => void;
  size: string;
  ghost: boolean;
}>('collapse');

const isActive = computed(() => collapse?.isActive(props.name) ?? false);
const size = computed(() => collapse?.size ?? 'md');
const ghost = computed(() => collapse?.ghost ?? false);

const contentRef = ref<HTMLElement | null>(null);
const contentHeight = ref(0);
const isAnimating = ref(false);

function updateHeight() {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight;
  }
}

watch(isActive, (val, oldVal) => {
  if (val !== oldVal) {
    isAnimating.value = true;
    nextTick(() => {
      updateHeight();
      setTimeout(() => {
        isAnimating.value = false;
      }, 300);
    });

    if (val) {
      emit('expand');
    } else {
      emit('collapse');
    }
  }
}, { immediate: true });

onMounted(() => {
  updateHeight();
});

function handleClick() {
  if (!props.disabled) {
    collapse?.toggle(props.name);
  }
}

const itemCls = computed(() => {
  const classes = ['q-collapse-item', `q-collapse-item-${size.value}`];
  if (isActive.value) classes.push('active');
  if (props.disabled) classes.push('disabled');
  if (ghost.value) classes.push('ghost');
  return classes.join(' ');
});

const headerCls = computed(() => {
  const classes = ['q-collapse-item-header'];
  if (props.disabled) classes.push('disabled');
  if (isActive.value) classes.push('active');
  return classes.join(' ');
});

const wrapperStyle = computed(() => {
  if (!isActive.value) {
    return { height: '0px' };
  }
  return { height: contentHeight.value + 'px' };
});
</script>

<template>
  <div :class="itemCls">
    <div :class="headerCls" @click="handleClick">
      <div class="q-collapse-item-icon" v-if="$slots.icon">
        <slot name="icon"></slot>
      </div>
      <div class="q-collapse-item-main">
        <div class="q-collapse-item-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="subtitle || $slots.subtitle" class="q-collapse-item-subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </div>
      </div>
      <div v-if="$slots.extra" class="q-collapse-item-extra" @click.stop>
        <slot name="extra"></slot>
      </div>
      <div v-if="!hideArrow" class="q-collapse-item-arrow">
        <slot name="arrow">
          <QIconChevronDown class="icon" :class="{ rotated: isActive }" />
        </slot>
      </div>
    </div>
    <div class="q-collapse-item-content-wrapper" :style="wrapperStyle">
      <div ref="contentRef" class="q-collapse-item-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.q-collapse-item {
  &:not(:last-child):not(.ghost) {
    border-bottom: 1px solid var(--q-c-dark-4);
  }

  &.ghost {
    margin-bottom: 4px;
    border-radius: var(--q-radius-md);
    overflow: hidden;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.disabled {
    .q-collapse-item-header {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  // Sizes
  &.q-collapse-item-sm {
    .q-collapse-item-header {
      padding: 8px 12px;
    }
    .q-collapse-item-title {
      font-size: 0.8125rem;
    }
    .q-collapse-item-content {
      padding: 8px 12px;
      font-size: 0.8125rem;
    }
    .q-collapse-item-arrow .icon {
      width: 14px;
      height: 14px;
    }
  }

  &.q-collapse-item-md {
    .q-collapse-item-header {
      padding: 12px 16px;
    }
    .q-collapse-item-title {
      font-size: 0.9375rem;
    }
    .q-collapse-item-content {
      padding: 12px 16px;
      font-size: 0.875rem;
    }
  }

  &.q-collapse-item-lg {
    .q-collapse-item-header {
      padding: 16px 20px;
    }
    .q-collapse-item-title {
      font-size: 1rem;
    }
    .q-collapse-item-content {
      padding: 16px 20px;
      font-size: 0.9375rem;
    }
    .q-collapse-item-arrow .icon {
      width: 18px;
      height: 18px;
    }
  }
}

.q-collapse-item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;

  &:hover:not(.disabled) {
    background-color: var(--q-c-dark-5);
  }
}

.q-collapse-item-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    width: 18px;
    height: 18px;
    opacity: 0.7;
  }
}

.q-collapse-item-main {
  flex: 1;
  min-width: 0;
}

.q-collapse-item-title {
  font-weight: 500;
  line-height: 1.4;
}

.q-collapse-item-subtitle {
  margin-top: 2px;
  font-size: 0.8125rem;
  color: var(--q-c-dark-3);
  line-height: 1.4;
}

.q-collapse-item-extra {
  flex-shrink: 0;
}

.q-collapse-item-arrow {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    width: 16px;
    height: 16px;
    color: var(--q-c-dark-3);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.q-collapse-item-content-wrapper {
  overflow: hidden;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.q-collapse-item-content {
  line-height: 1.6;
  color: var(--q-c-dark-1);
  background-color: var(--q-bg-light-float);
  border-top: 1px solid var(--q-c-dark-5);
}

// Ghost mode - no content background
.q-collapse-item.ghost {
  .q-collapse-item-header {
    background-color: var(--q-c-dark-5);
    border-radius: var(--q-radius-md);

    &:hover:not(.disabled) {
      background-color: var(--q-c-dark-5);
    }
  }

  &.active .q-collapse-item-header {
    border-radius: var(--q-radius-md) var(--q-radius-md) 0 0;
  }

  .q-collapse-item-content {
    background-color: transparent;
    border-left: 1px solid var(--q-c-dark-4);
    margin-left: 16px;
    padding-left: 14px;
  }
}

// Dark mode
.dark {
  .q-collapse-item {
    &:not(:last-child):not(.ghost) {
      border-bottom-color: var(--q-c-light-4);
    }
  }

  .q-collapse-item-header {
    color: var(--q-c-light);
    background: var(--q-bg-dark-2);

    &:hover:not(.disabled) {
      background-color: var(--q-c-light-5);
    }
  }

  .q-collapse-item-subtitle {
    color: var(--q-c-light-3);
  }

  .q-collapse-item-arrow .icon {
    color: var(--q-c-light-3);
  }

  .q-collapse-item-content {
    color: var(--q-c-light-2);
    background-color: transparent;
    border-top: 1px solid var(--q-c-light-5);
  }

  .q-collapse-item.ghost {
    .q-collapse-item-header {
      background-color: var(--q-c-light-5);

      &:hover:not(.disabled) {
        background-color: var(--q-c-light-4);
      }
    }

    .q-collapse-item-content {
      background-color: transparent;
      border-left-color: var(--q-c-light-4);
    }
  }
}
</style>
