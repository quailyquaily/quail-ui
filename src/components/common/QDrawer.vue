<script lang="ts" setup>
import { computed, watch, onMounted, onUnmounted } from 'vue';
import QIconCloseCircle from '../icons/QIconCloseCircle.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  placement: {
    type: String,
    default: 'right', // left, right, top, bottom
  },
  size: {
    type: String,
    default: '300px',
  },
  closable: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  showMask: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 1000,
  },
});

const emit = defineEmits(['update:modelValue', 'open', 'close']);

const isHorizontal = computed(() => props.placement === 'left' || props.placement === 'right');

const drawerStyle = computed(() => {
  const style: Record<string, string> = {};
  if (isHorizontal.value) {
    style.width = props.size;
    style.height = '100%';
  } else {
    style.width = '100%';
    style.height = props.size;
  }
  return style;
});

const drawerCls = computed(() => {
  return ['q-drawer', `q-drawer-${props.placement}`];
});

function close() {
  emit('update:modelValue', false);
  emit('close');
}

function handleMaskClick() {
  if (props.maskClosable) {
    close();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    emit('open');
    if (props.lockScroll) {
      document.body.style.overflow = 'hidden';
    }
  } else {
    if (props.lockScroll) {
      document.body.style.overflow = '';
    }
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="q-drawer-mask">
      <div
        v-if="modelValue && showMask"
        class="q-drawer-mask"
        :style="{ zIndex }"
        @click="handleMaskClick"
      ></div>
    </Transition>
    <Transition :name="`q-drawer-${placement}`">
      <div
        v-if="modelValue"
        :class="drawerCls"
        :style="{ ...drawerStyle, zIndex: zIndex + 1 }"
      >
        <div v-if="title || closable || $slots.header" class="q-drawer-header">
          <slot name="header">
            <div class="q-drawer-title">{{ title }}</div>
          </slot>
          <button v-if="closable" class="q-drawer-close" @click="close">
            <QIconCloseCircle class="icon" />
          </button>
        </div>
        <div class="q-drawer-body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="q-drawer-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.q-drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
}

.q-drawer {
  position: fixed;
  background: var(--q-bg-white);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;

  &.q-drawer-right {
    top: 0;
    right: 0;
    bottom: 0;
  }

  &.q-drawer-left {
    top: 0;
    left: 0;
    bottom: 0;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }

  &.q-drawer-top {
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &.q-drawer-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
  }
}

.q-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--q-c-dark-4);
  flex-shrink: 0;
}

.q-drawer-title {
  font-size: 1rem;
  font-weight: 600;
}

.q-drawer-close {
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s;

  .icon {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 1;
  }
}

.q-drawer-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.q-drawer-footer {
  padding: 16px;
  border-top: 1px solid var(--q-c-dark-4);
  flex-shrink: 0;
}

// Animations
.q-drawer-mask-enter-active,
.q-drawer-mask-leave-active {
  transition: opacity 0.3s ease;
}
.q-drawer-mask-enter-from,
.q-drawer-mask-leave-to {
  opacity: 0;
}

.q-drawer-right-enter-active,
.q-drawer-right-leave-active,
.q-drawer-left-enter-active,
.q-drawer-left-leave-active,
.q-drawer-top-enter-active,
.q-drawer-top-leave-active,
.q-drawer-bottom-enter-active,
.q-drawer-bottom-leave-active {
  transition: transform 0.3s ease;
}

.q-drawer-right-enter-from,
.q-drawer-right-leave-to {
  transform: translateX(100%);
}

.q-drawer-left-enter-from,
.q-drawer-left-leave-to {
  transform: translateX(-100%);
}

.q-drawer-top-enter-from,
.q-drawer-top-leave-to {
  transform: translateY(-100%);
}

.q-drawer-bottom-enter-from,
.q-drawer-bottom-leave-to {
  transform: translateY(100%);
}

// Dark mode
.dark {
  .q-drawer {
    background: var(--q-bg-dark);
    color: var(--q-c-light);
  }

  .q-drawer-header {
    border-bottom-color: var(--q-c-light-4);
  }

  .q-drawer-footer {
    border-top-color: var(--q-c-light-4);
  }
}
</style>
