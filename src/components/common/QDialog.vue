<script lang="ts" setup>
import { computed, ref, watch,
  nextTick,
  Ref,
  onMounted,
  onUnmounted
} from 'vue';
import { useUtil } from "../../composables/useUtil";
import { onPopupClose } from "../../util";
const { browserDetect } = useUtil();
const { isMobile } = browserDetect();

const props = defineProps({
  modelValue: Boolean,
  desktopMode: {
    type: String,
    default: 'dialog' // dialog, popup
  },
  popupPosition: { // only available in popup mode
    type: String,
    default: 'bottom',
  },
  noFrame: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '500px',
  },
  height: {
    type: String,
    default: 'auto',
  },
  position: {
    type: String,
    default: 'center',
  },
  persistent: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const shaking = ref(false);
const isOpen = ref(props.modelValue);
const popupPos = ref<{ top?: string; bottom?: string; left?: string }>({ top: '0', left: '0' });
const triggerWrapper:Ref<any> = ref(null);
const dialogMask:Ref<any> = ref(null);

const isDesktopPopup = computed(() => {
  return !isMobile && props.desktopMode === 'popup';
});

const dialogStyle = computed(() => {
  const w = document.body.clientWidth < 720 ? '100%' : props.width;
  const h = props.height;
  const ret:any = {
    width: w,
    height: h,
  };
  if (isDesktopPopup.value) {
    // Position relative to trigger wrapper
    if (props.popupPosition === 'top') {
      ret.bottom = popupPos.value.bottom;
    } else {
      ret.top = popupPos.value.top;
    }
    ret.left = popupPos.value.left;
  }
  return ret;
});

const dialogCls = computed(() => {
  let cls = [];
  if (shaking.value) {
    cls.push('shaking');
  }
  if (!isMobile) {
    cls.push(`desktop-mode-${props.desktopMode}`);
  }
  if (props.noFrame) {
    cls.push('no-frame');
  }
  return cls.join(' ');
});

const dialogMaskCls = computed(() => {
  let cls = [];
  if (isDesktopPopup.value) {
    cls.push('desktop-mode-popup');
  }

  if (isMobile) {
    // Allow choosing top/bottom alignment for non-popup dialogs
    if (props.popupPosition === 'top') {
      cls.push('position-top');
    } else {
      cls.push('position-bottom');
    }
  }
  return cls.join(' ');
});

watch(
  () => props.modelValue,
  (value) => {
    isOpen.value = value;
    nextTick(() => {
      if (!isMobile && props.desktopMode === 'popup') {
        if (triggerWrapper.value.children) {
          const el:any = (triggerWrapper.value.children as any)[0]
          if (el) {
            const rect = el.getBoundingClientRect();
            const offset = rect.height + 8;
            const left = 0;
            if (isDesktopPopup.value) {
              if (props.popupPosition === 'top') {
                popupPos.value = { bottom: `${offset}px`, left: `${left}px` };
              } else {
                popupPos.value = { top: `${offset}px`, left: `${left}px` };
              }
            }
          }
        }
      }
      // disable scroll
      if (value) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'auto';
      }
    })
  }
);

function close () {
  if (props.persistent) {
    // shake the dialog
    shaking.value = true;
    setTimeout(() => {
      shaking.value = false;
    }, 300);
    return
  };
  isOpen.value = false;
  // enable scroll
  document.body.style.overflowY = 'auto';

  emit('update:modelValue', false);
  emit('close');
};

function v() {};

// Popup close handler
function handlePopupClose() {
  close();
}

// Focus trap for accessibility
function handleKeyDown(event: KeyboardEvent) {
  if (!isOpen.value) return;

  if (event.key === 'Escape' && !props.persistent) {
    close();
    return;
  }

  if (event.key !== 'Tab') return;

  const dialog = dialogMask.value?.querySelector('.q-dialog') as HTMLElement;
  if (!dialog) return;

  const focusable = dialog.querySelectorAll<HTMLElement>(
    'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

let cleanupPopupClose: (() => void) | null = null;

onMounted(() => {
  if (props.desktopMode === "popup") {
    cleanupPopupClose = onPopupClose(handlePopupClose);
  }
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  cleanupPopupClose?.();
  window.removeEventListener("keydown", handleKeyDown);
  // Restore body scroll
  document.body.style.overflowY = 'auto';
})

</script>
<template>
  <div class="q-dialog-trigger-wrapper" ref="triggerWrapper" :class="props.class" >
    <slot name="trigger"></slot>
    <template v-if="isDesktopPopup">
      <Transition>
        <div v-if="isOpen" class="q-dialog" :style="dialogStyle" @click.stop="v" :class="dialogCls">
          <div class="q-dialog-body">
            <slot></slot>
          </div>
        </div>
      </Transition>
    </template>
  </div>
  <template v-if="!isDesktopPopup">
    <Transition>
      <div v-if="isOpen" class="q-dialog-mask" @click="close" :class="dialogMaskCls" ref="dialogMask">
        <div class="q-dialog" :style="dialogStyle" @click.stop="v" :class="dialogCls">
          <div class="q-dialog-header">
            <template v-if="title">
              <div class="q-dialog-title">{{ title }}</div>
            </template>
            <slot v-else name="header"></slot>
          </div>
          <div class="q-dialog-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </template>
</template>

<style lang="scss">
.q-dialog-trigger-wrapper {
  position: relative;
}
.q-dialog-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--q-bg-overlay);
  z-index: 100;
  &.desktop-mode-popup {
    background-color: transparent;
    position: static;
  }
  &.position-top {
    align-items: flex-start;
  }
}

.q-dialog {
  background-color: var(--q-c-white);
  padding: 0rem;
  border-radius: 6px;
  z-index: 101;
  &.shaking {
    animation: shake 0.3s;
  }
  &.no-frame {
    background-color: transparent;
    .q-dialog-header {
      display: none;
    }
    .q-dialog-body {
      padding: 0;
    }
    &.desktop-mode-popup {
      box-shadow: none;
    }
  }
  &.desktop-mode-popup {
    position: absolute;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
}

.q-dialog-header {
  display: flex;
  align-items: center;
  max-height: 78px;
  .q-dialog-title {
    flex: 1;
    text-align: center;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 1rem;
  }
}

.q-dialog-body {
  height: calc(100% - 78px);
  padding: 0 1rem 1rem;
  overflow-y: auto;
  max-height: 600px;
  margin-bottom: cal(safe-area-inset-bottom);
}

@media only screen and (max-width: 720px) {
  .q-dialog-mask {
    align-items: flex-end;
  }
  .q-dialog-mask.position-top {
    align-items: flex-start;
  }
  .q-dialog {
    width: 100%;
    border-radius: 0;
    bottom: 0;
    background-color: var(--q-c-white);
    .q-dialog-body {
      height: calc(100% - 78px);
      overflow-y: auto;
      margin-bottom: cal(safe-area-inset-bottom);
      padding-bottom: 28px;
    }
  }
}

@keyframes shake {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.02);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.dark {
  .q-dialog {
    background-color: var(--q-c-black);
    border: 0.5px solid var(--q-c-light-4);
  }
}
</style>
