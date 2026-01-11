<script lang="ts" setup>
import { ref, computed, type Component } from 'vue';
import QToast from './QToast.vue';

interface ToastItem {
  id: number;
  type: string;
  message: string;
  duration: number;
  closable: boolean;
  icon?: Component;
}

const props = defineProps({
  position: {
    type: String,
    default: 'top',
  },
  maxCount: {
    type: Number,
    default: 5,
  },
});

const toasts = ref<ToastItem[]>([]);
let idCounter = 0;

const containerCls = computed(() => {
  return ['q-toast-container', `q-toast-container-${props.position}`];
});

function addToast(options: Partial<ToastItem> & { message: string }) {
  const id = ++idCounter;
  const toast: ToastItem = {
    id,
    type: options.type || 'info',
    message: options.message,
    duration: options.duration ?? 3000,
    closable: options.closable ?? false,
    icon: options.icon,
  };

  if (toasts.value.length >= props.maxCount) {
    toasts.value.shift();
  }

  toasts.value.push(toast);
  return id;
}

function removeToast(id: number) {
  const index = toasts.value.findIndex((t) => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
}

function closeAll() {
  toasts.value = [];
}

defineExpose({
  addToast,
  removeToast,
  closeAll,
});
</script>

<template>
  <Teleport to="body">
    <div :class="containerCls">
      <TransitionGroup name="q-toast-list">
        <QToast
          v-for="toast in toasts"
          :key="toast.id"
          :model-value="true"
          :type="toast.type"
          :message="toast.message"
          :duration="toast.duration"
          :closable="toast.closable"
          :icon="toast.icon"
          @close="removeToast(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style lang="scss">
.q-toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;

  .q-toast {
    pointer-events: auto;
  }

  &.q-toast-container-top {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }
  &.q-toast-container-top-left {
    top: 20px;
    left: 20px;
    align-items: flex-start;
  }
  &.q-toast-container-top-right {
    top: 20px;
    right: 20px;
    align-items: flex-end;
  }
  &.q-toast-container-bottom {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    flex-direction: column-reverse;
  }
  &.q-toast-container-bottom-left {
    bottom: 20px;
    left: 20px;
    align-items: flex-start;
    flex-direction: column-reverse;
  }
  &.q-toast-container-bottom-right {
    bottom: 20px;
    right: 20px;
    align-items: flex-end;
    flex-direction: column-reverse;
  }
}

.q-toast-list-enter-active,
.q-toast-list-leave-active {
  transition: all 0.3s ease;
}
.q-toast-list-enter-from,
.q-toast-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.q-toast-list-move {
  transition: transform 0.3s ease;
}
</style>
