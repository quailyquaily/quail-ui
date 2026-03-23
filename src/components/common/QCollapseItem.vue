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
  position: relative;
  transition:
    background-color 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;

  &:not(:last-child):not(.ghost) {
    border-bottom: 1px solid var(--q-collapse-border-color);
  }

  &.ghost {
    margin-bottom: 8px;
    border: 1px solid var(--q-collapse-border-color);
    border-radius: var(--q-radius-md);
    overflow: hidden;
    background: var(--q-collapse-shell-bg);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.active:not(.ghost) {
    z-index: 1;
    box-shadow: var(--q-collapse-item-shadow);
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
      min-height: 44px;
      padding: 10px 12px;
    }
    .q-collapse-item-title {
      font-size: 0.8125rem;
    }
    .q-collapse-item-content {
      padding: 10px 12px 12px;
      font-size: 0.8125rem;
    }
    .q-collapse-item-arrow .icon {
      width: 14px;
      height: 14px;
    }
  }

  &.q-collapse-item-md {
    .q-collapse-item-header {
      min-height: 56px;
      padding: 14px 16px;
    }
    .q-collapse-item-title {
      font-size: 0.9375rem;
    }
    .q-collapse-item-content {
      padding: 14px 16px 16px;
      font-size: 0.875rem;
    }
  }

  &.q-collapse-item-lg {
    .q-collapse-item-header {
      min-height: 64px;
      padding: 18px 20px;
    }
    .q-collapse-item-title {
      font-size: 1rem;
    }
    .q-collapse-item-content {
      padding: 18px 20px 20px;
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
  position: relative;
  min-height: 56px;
  background-color: var(--q-collapse-header-bg);
  transition:
    background-color 0.22s ease,
    color 0.22s ease;

  &:hover:not(.disabled) {
    background-color: var(--q-collapse-header-hover-bg);
  }

  &.active {
    background-color: var(--q-collapse-header-active-bg);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      bottom: 10px;
      width: 2px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--q-collapse-header-active-accent) 24%, transparent);
    }
  }
}

.q-collapse-item-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--q-collapse-border-color) 72%, transparent);
  background: var(--q-collapse-icon-bg);
  color: var(--q-collapse-icon-color);

  .icon {
    width: 18px;
    height: 18px;
    opacity: 1;
  }
}

.q-collapse-item-main {
  flex: 1;
  min-width: 0;
}

.q-collapse-item-title {
  color: var(--q-collapse-title-color);
  font-weight: 600;
  line-height: 1.4;
}

.q-collapse-item-subtitle {
  margin-top: 2px;
  font-size: 0.8125rem;
  color: var(--q-collapse-subtitle-color);
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
  margin-left: 6px;
  color: var(--q-collapse-arrow-color);
  opacity: 0.72;
  transition:
    color 0.22s ease,
    opacity 0.22s ease;

  .icon {
    width: 16px;
    height: 16px;
    color: currentColor;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.q-collapse-item-header:hover:not(.disabled) .q-collapse-item-arrow,
.q-collapse-item-header.active .q-collapse-item-arrow {
  opacity: 1;
  color: var(--q-collapse-arrow-active-color);
}

.q-collapse-item-content-wrapper {
  overflow: hidden;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.q-collapse-item-content {
  position: relative;
  line-height: 1.6;
  color: var(--q-collapse-body-color);
  background-color: var(--q-collapse-content-bg);
  border-top: 1px solid var(--q-collapse-content-border);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: color-mix(in srgb, var(--q-collapse-header-active-accent) 10%, transparent);
  }
}

.q-collapse-item.ghost {
  .q-collapse-item-header {
    background-color: var(--q-collapse-header-bg);

    &:hover:not(.disabled) {
      background-color: var(--q-collapse-header-hover-bg);
    }
  }

  &.active .q-collapse-item-header {
    border-radius: var(--q-radius-md) var(--q-radius-md) 0 0;
  }

  .q-collapse-item-content {
    background-color: var(--q-collapse-content-bg);
    border-top: 1px dashed var(--q-collapse-content-border);
    border-left: 0;
    margin-left: 0;
    border-radius: 0 0 var(--q-radius-md) var(--q-radius-md);
  }
}

</style>
