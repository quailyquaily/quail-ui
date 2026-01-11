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

const cls = computed(() => {
  const classes = [
    'q-badge',
    `q-badge-${props.type}`,
    `q-badge-${props.size}`,
    `q-badge-${props.variant}`,
  ];
  if (props.rounded) classes.push('q-badge-rounded');
  if (props.dot) classes.push('q-badge-dot');
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
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  white-space: nowrap;
  vertical-align: middle;

  // Sizes
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

  // Dot variant
  &.q-badge-dot {
    padding: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;

    .q-badge-dot-indicator {
      display: none;
    }
  }

  // Close button
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

  // Type: Default
  &.q-badge-default {
    &.q-badge-filled {
      background: var(--q-c-dark-4);
      color: var(--q-c-dark);
    }
    &.q-badge-outlined {
      background: transparent;
      border: 1px solid var(--q-c-dark-4);
      color: var(--q-c-dark-2);
    }
    &.q-badge-light {
      background: var(--q-c-dark-5);
      color: var(--q-c-dark-2);
    }
  }

  // Type: Primary
  &.q-badge-primary {
    &.q-badge-filled {
      background: var(--q-c-blue);
      color: white;
    }
    &.q-badge-outlined {
      background: transparent;
      border: 1px solid var(--q-c-blue);
      color: var(--q-c-blue);
    }
    &.q-badge-light {
      background: var(--q-c-blue-dimm-2);
      color: var(--q-c-blue-dark);
    }
  }

  // Type: Success
  &.q-badge-success {
    &.q-badge-filled {
      background: var(--q-c-green);
      color: white;
    }
    &.q-badge-outlined {
      background: transparent;
      border: 1px solid var(--q-c-green);
      color: var(--q-c-green);
    }
    &.q-badge-light {
      background: var(--q-c-green-dimm-2);
      color: var(--q-c-green-dark);
    }
  }

  // Type: Warning
  &.q-badge-warning {
    &.q-badge-filled {
      background: var(--q-c-orange);
      color: white;
    }
    &.q-badge-outlined {
      background: transparent;
      border: 1px solid var(--q-c-orange);
      color: var(--q-c-orange);
    }
    &.q-badge-light {
      background: var(--q-c-orange-dimm-2);
      color: var(--q-c-orange-dark);
    }
  }

  // Type: Danger
  &.q-badge-danger {
    &.q-badge-filled {
      background: var(--q-c-red);
      color: white;
    }
    &.q-badge-outlined {
      background: transparent;
      border: 1px solid var(--q-c-red);
      color: var(--q-c-red);
    }
    &.q-badge-light {
      background: var(--q-c-red-dimm-2);
      color: var(--q-c-red-dark);
    }
  }

  // Type: Info
  &.q-badge-info {
    &.q-badge-filled {
      background: var(--q-c-dark-3);
      color: white;
    }
    &.q-badge-outlined {
      background: transparent;
      border: 1px solid var(--q-c-dark-3);
      color: var(--q-c-dark-2);
    }
    &.q-badge-light {
      background: var(--q-c-dark-5);
      color: var(--q-c-dark-2);
    }
  }
}

// Dark mode
.dark {
  .q-badge {
    &.q-badge-default {
      &.q-badge-filled {
        background: var(--q-c-light-4);
        color: var(--q-c-light);
      }
      &.q-badge-outlined {
        border-color: var(--q-c-light-4);
        color: var(--q-c-light-2);
      }
      &.q-badge-light {
        background: var(--q-c-light-5);
        color: var(--q-c-light-2);
      }
    }

    &.q-badge-primary.q-badge-light {
      background: rgba(13, 117, 252, 0.25);
      color: var(--q-c-blue-light);
    }

    &.q-badge-success.q-badge-light {
      background: rgba(16, 185, 129, 0.25);
      color: var(--q-c-green-light);
    }

    &.q-badge-warning.q-badge-light {
      background: rgba(217, 119, 6, 0.25);
      color: var(--q-c-orange-light);
    }

    &.q-badge-danger.q-badge-light {
      background: rgba(174, 19, 0, 0.25);
      color: var(--q-c-red-light);
    }

    &.q-badge-info {
      &.q-badge-filled {
        background: var(--q-c-light-3);
      }
      &.q-badge-outlined {
        border-color: var(--q-c-light-3);
        color: var(--q-c-light-2);
      }
      &.q-badge-light {
        background: var(--q-c-light-5);
        color: var(--q-c-light-2);
      }
    }
  }
}
</style>
