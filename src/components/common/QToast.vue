<script lang="ts" setup>
import { computed, ref, watch, onMounted, onUnmounted, type Component } from 'vue';
import QIconCheckCircle from '../icons/QIconCheckCircle.vue';
import QIconCloseCircle from '../icons/QIconCloseCircle.vue';
import QIconInfoCircle from '../icons/QIconInfoCircle.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'info', // success, error, warning, info
  },
  message: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 3000,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Object as () => Component | null,
    default: null,
  },
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'close']);
const isVisible = ref(props.modelValue);
let timer: ReturnType<typeof setTimeout> | null = null;

const iconComponent = computed(() => {
  if (props.icon) return props.icon;
  const icons: Record<string, Component> = {
    success: QIconCheckCircle,
    error: QIconCloseCircle,
    warning: QIconInfoCircle,
    info: QIconInfoCircle,
  };
  return icons[props.type] || QIconInfoCircle;
});

const cls = computed(() => {
  const classes = ['q-toast', `q-toast-${props.type}`];
  if (props.class) classes.push(props.class);
  return classes.join(' ');
});

function close() {
  isVisible.value = false;
  emit('update:modelValue', false);
  emit('close');
}

function startTimer() {
  if (props.duration > 0) {
    timer = setTimeout(close, props.duration);
  }
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

watch(
  () => props.modelValue,
  (val) => {
    isVisible.value = val;
    if (val) {
      startTimer();
    } else {
      clearTimer();
    }
  },
);

onMounted(() => {
  if (props.modelValue) {
    startTimer();
  }
});

onUnmounted(() => {
  clearTimer();
});
</script>

<template>
  <Transition name="q-toast">
    <div v-if="isVisible" :class="cls" @mouseenter="clearTimer" @mouseleave="startTimer">
      <div class="q-toast-icon">
        <component :is="iconComponent" class="icon" />
      </div>
      <div class="q-toast-content">
        <slot>{{ message }}</slot>
      </div>
      <button v-if="closable" class="q-toast-close" @click="close">
        <QIconCloseCircle class="icon" />
      </button>
    </div>
  </Transition>
</template>

<style lang="scss">
.q-toast {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: var(--q-c-white);
  border-radius: var(--q-radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  max-width: 400px;

  .q-toast-icon {
    margin-right: 12px;
    display: flex;
    align-items: center;
    .icon {
      width: 20px;
      height: 20px;
    }
  }

  .q-toast-content {
    flex: 1;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .q-toast-close {
    margin-left: 12px;
    padding: 4px;
    border: none;
    background: transparent;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    &:hover {
      opacity: 1;
    }
    .icon {
      width: 14px;
      height: 14px;
    }
  }

  &.q-toast-success {
    .q-toast-icon .icon {
      color: var(--q-c-green);
    }
  }
  &.q-toast-error {
    .q-toast-icon .icon {
      color: var(--q-c-red);
    }
  }
  &.q-toast-warning {
    .q-toast-icon .icon {
      color: var(--q-c-orange);
    }
  }
  &.q-toast-info {
    .q-toast-icon .icon {
      color: var(--q-c-blue);
    }
  }
}

.q-toast-enter-active,
.q-toast-leave-active {
  transition: all 0.3s ease;
}
.q-toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.q-toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

.dark {
  .q-toast {
    background: var(--q-bg-dark-float);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}
</style>
