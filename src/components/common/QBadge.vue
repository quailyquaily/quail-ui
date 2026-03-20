<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'default', // default, primary, success, warning, danger, info
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
  },
  variant: {
    type: String,
    default: 'filled', // filled, outlined, light
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  dot: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const resolvedVariant = computed(() => {
  if (props.variant === 'technical' || props.variant === 'bracket') {
    return 'filled';
  }
  return props.variant;
});

const cls = computed(() => {
  const classes = [
    'q-badge',
    `q-badge-${props.type}`,
    `q-badge-${props.size}`,
    `q-badge-${resolvedVariant.value}`,
  ];
  if (props.rounded) classes.push('q-badge-rounded');
  if (props.dot) classes.push('q-badge-dot');
  if (props.closable && !props.dot) classes.push('q-badge-closable');
  return classes.join(' ');
});

function handleClose(e: Event) {
  e.stopPropagation();
  emit('close');
}
</script>

<template>
  <span :class="cls">
    <span v-if="dot" class="q-badge-dot-indicator"></span>
    <span v-else class="q-badge-content">
      <slot></slot>
    </span>
    <button v-if="closable && !dot" class="q-badge-close" @click="handleClose">
      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </span>
</template>

<style lang="scss">
.q-badge {
  --q-badge-bg-filled: var(--q-c-dark-5);
  --q-badge-text-filled: var(--q-c-dark);
  --q-badge-border: var(--q-c-dark-4);
  --q-badge-text-outlined: var(--q-c-dark-2);
  --q-badge-bg-light: color-mix(in srgb, var(--q-c-dark-5) 55%, white);
  --q-badge-text-light: var(--q-c-dark-2);
  --q-badge-frame-color: var(--q-c-dark-3);
  --q-badge-text-color: var(--q-c-dark);
  --q-badge-dot-color: var(--q-badge-border);
  --q-badge-open: "[";
  --q-badge-close: "]";

  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 20px;
  padding: 3px 8px;
  border: 1px solid transparent;
  border-radius: var(--q-radius-xs);
  background: transparent;
  color: inherit;
  font-family: var(--q-font-ui);
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  vertical-align: middle;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    opacity 0.18s ease;

  .q-badge-content {
    display: inline-flex;
    align-items: center;
  }

  &.q-badge-sm {
    font-size: 0.6875rem;
    padding: 2px 6px;
    border-radius: var(--q-radius-xs);
  }
  &.q-badge-md {
    font-size: 0.75rem;
    padding: 3px 8px;
    border-radius: var(--q-radius-xs);
  }
  &.q-badge-lg {
    font-size: 0.8125rem;
    padding: 4px 10px;
    border-radius: var(--q-radius-sm);
  }

  &.q-badge-rounded {
    border-radius: var(--q-radius-full);
  }

  &.q-badge-dot {
    padding: 0;
    width: 8px;
    height: 8px;
    min-height: 8px;
    background: var(--q-badge-dot-color);
    border: none;
    border-radius: 50%;

    .q-badge-dot-indicator {
      display: none;
    }
  }

  &.q-badge-filled {
    background: var(--q-badge-bg-filled);
    color: var(--q-badge-text-filled);
  }

  &.q-badge-outlined {
    background: transparent;
    border-color: var(--q-badge-border);
    color: var(--q-badge-text-outlined);
  }

  &.q-badge-light {
    background: var(--q-badge-bg-light);
    color: var(--q-badge-text-light);
  }

  .q-badge-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    padding: 0;
    margin-left: 2px;
    margin-right: -2px;
    background: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.15s;

    svg {
      width: 10px;
      height: 10px;
    }

    &:hover {
      opacity: 1;
    }
  }

  &.q-badge-default {
    --q-badge-bg-filled: var(--q-c-dark-5);
    --q-badge-text-filled: var(--q-c-dark);
    --q-badge-border: var(--q-c-dark-4);
    --q-badge-text-outlined: var(--q-c-dark-2);
    --q-badge-bg-light: color-mix(in srgb, var(--q-c-dark-5) 55%, white);
    --q-badge-text-light: var(--q-c-dark-2);
    --q-badge-frame-color: var(--q-c-dark-3);
    --q-badge-text-color: var(--q-c-dark);
    --q-badge-dot-color: var(--q-c-dark-3);
  }

  &.q-badge-primary {
    --q-badge-bg-filled: var(--q-c-blue-dimm-2);
    --q-badge-text-filled: var(--q-c-secondary);
    --q-badge-border: var(--q-c-blue);
    --q-badge-text-outlined: var(--q-c-blue);
    --q-badge-bg-light: color-mix(in srgb, var(--q-c-blue-dimm-1) 72%, white);
    --q-badge-text-light: var(--q-c-blue-dark);
    --q-badge-frame-color: var(--q-c-blue);
    --q-badge-text-color: var(--q-c-secondary);
    --q-badge-dot-color: var(--q-c-blue);
  }

  &.q-badge-success {
    --q-badge-bg-filled: var(--q-c-green-dimm-2);
    --q-badge-text-filled: var(--q-c-green-dark);
    --q-badge-border: var(--q-c-green);
    --q-badge-text-outlined: var(--q-c-green);
    --q-badge-bg-light: color-mix(in srgb, var(--q-c-green-dimm-1) 72%, white);
    --q-badge-text-light: var(--q-c-green-dark);
    --q-badge-frame-color: var(--q-c-green);
    --q-badge-text-color: var(--q-c-green-dark);
    --q-badge-dot-color: var(--q-c-green);
  }

  &.q-badge-warning {
    --q-badge-bg-filled: var(--q-c-orange-dimm-2);
    --q-badge-text-filled: var(--q-c-orange-dark);
    --q-badge-border: var(--q-c-orange);
    --q-badge-text-outlined: var(--q-c-orange);
    --q-badge-bg-light: color-mix(in srgb, var(--q-c-orange-dimm-1) 72%, white);
    --q-badge-text-light: var(--q-c-orange-dark);
    --q-badge-frame-color: var(--q-c-orange);
    --q-badge-text-color: var(--q-c-orange-dark);
    --q-badge-dot-color: var(--q-c-orange);
  }

  &.q-badge-danger {
    --q-badge-bg-filled: var(--q-c-red-dimm-2);
    --q-badge-text-filled: var(--q-c-red-dark);
    --q-badge-border: var(--q-c-red);
    --q-badge-text-outlined: var(--q-c-red);
    --q-badge-bg-light: color-mix(in srgb, var(--q-c-red-dimm-1) 72%, white);
    --q-badge-text-light: var(--q-c-red-dark);
    --q-badge-frame-color: var(--q-c-red);
    --q-badge-text-color: var(--q-c-red-dark);
    --q-badge-dot-color: var(--q-c-red);
  }

  &.q-badge-info {
    --q-badge-bg-filled: var(--q-c-dark-5);
    --q-badge-text-filled: var(--q-c-dark);
    --q-badge-border: var(--q-c-dark-3);
    --q-badge-text-outlined: var(--q-c-dark-2);
    --q-badge-bg-light: color-mix(in srgb, var(--q-c-dark-5) 55%, white);
    --q-badge-text-light: var(--q-c-dark-2);
    --q-badge-frame-color: var(--q-c-dark-3);
    --q-badge-text-color: var(--q-c-dark-2);
    --q-badge-dot-color: var(--q-c-dark-3);
  }
}

.dark {
  .q-badge {
    &.q-badge-default {
      --q-badge-bg-filled: rgba(255, 255, 255, 0.08);
      --q-badge-text-filled: var(--q-c-light);
      --q-badge-border: var(--q-c-light-4);
      --q-badge-text-outlined: var(--q-c-light-2);
      --q-badge-bg-light: rgba(255, 255, 255, 0.05);
      --q-badge-text-light: var(--q-c-light-2);
      --q-badge-frame-color: var(--q-c-light-3);
      --q-badge-text-color: var(--q-c-light-2);
      --q-badge-dot-color: var(--q-c-light-3);
    }

    &.q-badge-primary {
      --q-badge-bg-filled: rgba(13, 117, 252, 0.18);
      --q-badge-text-filled: var(--q-c-blue-light);
      --q-badge-border: var(--q-c-blue-light);
      --q-badge-text-outlined: var(--q-c-blue-light);
      --q-badge-bg-light: rgba(13, 117, 252, 0.1);
      --q-badge-text-light: var(--q-c-blue-light);
      --q-badge-frame-color: var(--q-c-blue-light);
      --q-badge-text-color: var(--q-c-blue-light);
      --q-badge-dot-color: var(--q-c-blue-light);
    }

    &.q-badge-success {
      --q-badge-bg-filled: rgba(16, 185, 129, 0.18);
      --q-badge-text-filled: var(--q-c-green-light);
      --q-badge-border: var(--q-c-green-light);
      --q-badge-text-outlined: var(--q-c-green-light);
      --q-badge-bg-light: rgba(16, 185, 129, 0.1);
      --q-badge-text-light: var(--q-c-green-light);
      --q-badge-frame-color: var(--q-c-green-light);
      --q-badge-text-color: var(--q-c-green-light);
      --q-badge-dot-color: var(--q-c-green-light);
    }

    &.q-badge-warning {
      --q-badge-bg-filled: rgba(217, 119, 6, 0.18);
      --q-badge-text-filled: var(--q-c-orange-light);
      --q-badge-border: var(--q-c-orange-light);
      --q-badge-text-outlined: var(--q-c-orange-light);
      --q-badge-bg-light: rgba(217, 119, 6, 0.1);
      --q-badge-text-light: var(--q-c-orange-light);
      --q-badge-frame-color: var(--q-c-orange-light);
      --q-badge-text-color: var(--q-c-orange-light);
      --q-badge-dot-color: var(--q-c-orange-light);
    }

    &.q-badge-danger {
      --q-badge-bg-filled: rgba(174, 19, 0, 0.18);
      --q-badge-text-filled: var(--q-c-red-light);
      --q-badge-border: var(--q-c-red-light);
      --q-badge-text-outlined: var(--q-c-red-light);
      --q-badge-bg-light: rgba(174, 19, 0, 0.1);
      --q-badge-text-light: var(--q-c-red-light);
      --q-badge-frame-color: var(--q-c-red-light);
      --q-badge-text-color: var(--q-c-red-light);
      --q-badge-dot-color: var(--q-c-red-light);
    }

    &.q-badge-info {
      --q-badge-bg-filled: rgba(255, 255, 255, 0.08);
      --q-badge-text-filled: var(--q-bg-dark);
      --q-badge-border: var(--q-c-light-3);
      --q-badge-text-outlined: var(--q-c-light-2);
      --q-badge-bg-light: rgba(255, 255, 255, 0.05);
      --q-badge-text-light: var(--q-c-light-2);
      --q-badge-frame-color: var(--q-c-light-3);
      --q-badge-text-color: var(--q-c-light-2);
      --q-badge-dot-color: var(--q-c-light-3);
    }
  }
}

body[data-theme="morph"] .q-badge,
body[data-theme="warm"] .q-badge {
  min-height: auto;
  padding: 1px 0;
  border: none !important;
  border-radius: 0;
  background: transparent !important;
  color: var(--q-badge-text-color);
  font-family: var(--q-font-mono);
  font-weight: 600;
  letter-spacing: 0.04em;
  box-shadow: none;
  gap: 0;
}

body[data-theme="morph"] .q-badge.q-badge-filled,
body[data-theme="warm"] .q-badge.q-badge-filled {
  background: var(--q-badge-bg-filled) !important;
  color: var(--q-badge-text-filled);
}

body[data-theme="morph"] .q-badge.q-badge-light,
body[data-theme="warm"] .q-badge.q-badge-light {
  --q-badge-open: "<";
  --q-badge-close: ">";
}

body[data-theme="morph"] .q-badge.q-badge-rounded,
body[data-theme="warm"] .q-badge.q-badge-rounded {
  --q-badge-open: "(";
  --q-badge-close: ")";
  border-radius: 6px !important;
}

body[data-theme="morph"] .q-badge:not(.q-badge-dot) .q-badge-content::before,
body[data-theme="warm"] .q-badge:not(.q-badge-dot) .q-badge-content::before {
  content: var(--q-badge-open);
  color: var(--q-badge-frame-color);
  margin-right: 12px;
}

body[data-theme="morph"] .q-badge:not(.q-badge-dot) .q-badge-content::after,
body[data-theme="warm"] .q-badge:not(.q-badge-dot) .q-badge-content::after {
  content: var(--q-badge-close);
  color: var(--q-badge-frame-color);
  margin-left: 12px;
}

body[data-theme="morph"] .q-badge.q-badge-closable,
body[data-theme="warm"] .q-badge.q-badge-closable {
  --q-badge-open: "[";
  --q-badge-close: "]";
  gap: 8px;
}

body[data-theme="morph"] .q-badge.q-badge-closable .q-badge-content::after,
body[data-theme="warm"] .q-badge.q-badge-closable .q-badge-content::after {
  content: "";
  display: none;
}

body[data-theme="morph"] .q-badge.q-badge-closable .q-badge-close,
body[data-theme="warm"] .q-badge.q-badge-closable .q-badge-close {
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--q-badge-text-color);
  opacity: 1;
  display: inline-flex;
  align-items: center;
  gap: 0;
}

body[data-theme="morph"] .q-badge.q-badge-closable .q-badge-close::after,
body[data-theme="warm"] .q-badge.q-badge-closable .q-badge-close::after {
  content: var(--q-badge-close);
  color: var(--q-badge-frame-color);
  margin-left: 8px;
}

body[data-theme="morph"] .q-badge.q-badge-closable .q-badge-close svg,
body[data-theme="warm"] .q-badge.q-badge-closable .q-badge-close svg {
  width: 8px;
  height: 8px;
}

body[data-theme="morph"] .q-badge.q-badge-dot,
body[data-theme="warm"] .q-badge.q-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--q-badge-dot-color) !important;
}
</style>
