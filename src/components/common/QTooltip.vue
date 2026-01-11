<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: 'top', // top, bottom, left, right
  },
  trigger: {
    type: String,
    default: 'hover', // hover, click, focus
  },
  delay: {
    type: Number,
    default: 100,
  },
  hideDelay: {
    type: Number,
    default: 100,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: '300px',
  },
  class: {
    type: String,
    default: '',
  },
  offset: {
    type: Number,
    default: 6,
  },
  arrow: {
    type: Boolean,
    default: true,
  },
});

const isVisible = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);
const tooltipStyle = ref<Record<string, string>>({});
let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const tooltipCls = computed(() => {
  const classes = ['q-tooltip', `q-tooltip-${props.position}`];
  if (props.arrow) classes.push('q-tooltip-arrow');
  if (props.class) classes.push(props.class);
  return classes.join(' ');
});

function calculatePosition() {
  if (!triggerRef.value || !tooltipRef.value) return;

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const tooltipRect = tooltipRef.value.getBoundingClientRect();
  const offset = props.offset;

  let top = 0;
  let left = 0;

  switch (props.position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      break;
    case 'bottom':
      top = triggerRect.bottom + offset;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      break;
    case 'left':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.left - tooltipRect.width - offset;
      break;
    case 'right':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.right + offset;
      break;
  }

  // Boundary check
  const padding = 8;
  if (left < padding) left = padding;
  if (left + tooltipRect.width > window.innerWidth - padding) {
    left = window.innerWidth - tooltipRect.width - padding;
  }
  if (top < padding) top = padding;
  if (top + tooltipRect.height > window.innerHeight - padding) {
    top = window.innerHeight - tooltipRect.height - padding;
  }

  tooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    maxWidth: props.maxWidth,
  };
}

function show() {
  if (props.disabled) return;
  clearTimers();
  showTimer = setTimeout(() => {
    isVisible.value = true;
    nextTick(calculatePosition);
  }, props.delay);
}

function hide() {
  clearTimers();
  hideTimer = setTimeout(() => {
    isVisible.value = false;
  }, props.hideDelay);
}

function toggle() {
  if (isVisible.value) {
    hide();
  } else {
    show();
  }
}

function clearTimers() {
  if (showTimer) {
    clearTimeout(showTimer);
    showTimer = null;
  }
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function handleMouseEnter() {
  if (props.trigger === 'hover') {
    show();
  }
}

function handleMouseLeave() {
  if (props.trigger === 'hover') {
    hide();
  }
}

function handleClick(e: Event) {
  if (props.trigger === 'click') {
    e.stopPropagation();
    toggle();
  }
}

function handleFocusin() {
  if (props.trigger === 'focus') {
    show();
  }
}

function handleFocusout() {
  if (props.trigger === 'focus') {
    hide();
  }
}

function handleClickOutside(e: Event) {
  if (
    props.trigger === 'click' &&
    isVisible.value &&
    triggerRef.value &&
    tooltipRef.value &&
    !triggerRef.value.contains(e.target as Node) &&
    !tooltipRef.value.contains(e.target as Node)
  ) {
    isVisible.value = false;
  }
}

onMounted(() => {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleClickOutside);
  }
  window.addEventListener('scroll', calculatePosition, true);
  window.addEventListener('resize', calculatePosition);
});

onUnmounted(() => {
  clearTimers();
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', calculatePosition, true);
  window.removeEventListener('resize', calculatePosition);
});

watch(isVisible, (val) => {
  if (val) {
    nextTick(calculatePosition);
  }
});
</script>

<template>
  <div class="q-tooltip-wrapper">
    <div
      ref="triggerRef"
      class="q-tooltip-trigger"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
      @focusin="handleFocusin"
      @focusout="handleFocusout"
    >
      <slot></slot>
    </div>
    <Teleport to="body">
      <Transition name="q-tooltip">
        <div
          v-if="isVisible"
          ref="tooltipRef"
          :class="tooltipCls"
          :style="tooltipStyle"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <slot name="content">{{ content }}</slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
.q-tooltip-wrapper {
  display: inline-block;
}

.q-tooltip-trigger {
  display: inline-block;
}

.q-tooltip {
  position: fixed;
  z-index: 10000;
  padding: 8px 12px;
  background: var(--q-c-dark);
  color: var(--q-c-white);
  border-radius: var(--q-radius-sm);
  font-size: 0.8125rem;
  line-height: 1.4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  word-wrap: break-word;

  &.q-tooltip-arrow {
    &::before {
      content: '';
      position: absolute;
      border: 6px solid transparent;
    }

    &.q-tooltip-top::before {
      bottom: -11px;
      left: 50%;
      transform: translateX(-50%);
      border-top-color: var(--q-c-dark);
    }
    &.q-tooltip-bottom::before {
      top: -11px;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: var(--q-c-dark);
    }
    &.q-tooltip-left::before {
      right: -11px;
      top: 50%;
      transform: translateY(-50%);
      border-left-color: var(--q-c-dark);
    }
    &.q-tooltip-right::before {
      left: -11px;
      top: 50%;
      transform: translateY(-50%);
      border-right-color: var(--q-c-dark);
    }
  }
}

.q-tooltip-enter-active,
.q-tooltip-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.q-tooltip-enter-from,
.q-tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.dark {
  .q-tooltip {
    background: var(--q-c-light);
    color: var(--q-c-dark);

    &.q-tooltip-arrow {
      &.q-tooltip-top::before {
        border-top-color: var(--q-c-light);
      }
      &.q-tooltip-bottom::before {
        border-bottom-color: var(--q-c-light);
      }
      &.q-tooltip-left::before {
        border-left-color: var(--q-c-light);
      }
      &.q-tooltip-right::before {
        border-right-color: var(--q-c-light);
      }
    }
  }
}
</style>
