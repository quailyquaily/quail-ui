<template>
  <button
    ref="buttonRef"
    :class="cls"
    :disabled="!validated"
    :aria-label="realAriaLabel"
  >
    <span v-if="!href" class="button-inner">
      <slot></slot>
      <span v-if="displayShortcut" class="shortcut-badge">{{ displayShortcut }}</span>
    </span>
    <a v-else :href="href" class="button-inner" :title="title" :target="target" :rel="rel">
      <slot></slot>
      <span v-if="displayShortcut" class="shortcut-badge">{{ displayShortcut }}</span>
    </a>
    <div v-if="props.loading" class="ocean">
      <div class="wave"></div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed, useSlots, ref, onMounted, onUnmounted } from 'vue';
import { useUtil } from '../../composables/useUtil';
import { useKeyboard } from '../../composables/useKeyboard';

const slots = useSlots();

const { extractText, extractIconName, browserDetect } = useUtil();
const { hasKeyboard, onKeyboardDetected } = useKeyboard();

const buttonRef = ref<HTMLButtonElement | null>(null);
const shortcutPressed = ref(false);

const props = defineProps({
  class: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '_self',
  },
  rel: {
    type: String,
    default: 'nofollow noopener noreferrer',
  },
  title: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  shortcut: {
    type: String,
    default: '',
  }
});


// Map common shortcut names to event.key values
const keyNameMap: Record<string, string> = {
  'del': 'delete',
  'esc': 'escape',
  'ins': 'insert',
  'pgup': 'pageup',
  'pgdn': 'pagedown',
  'enter': 'enter',
  'return': 'enter',
  'space': ' ',
  'up': 'arrowup',
  'down': 'arrowdown',
  'left': 'arrowleft',
  'right': 'arrowright',
};

// Parse shortcut string into components
function parseShortcut(shortcut: string) {
  const parts = shortcut.split('+').map(p => p.trim().toLowerCase());
  let key = parts[parts.length - 1];
  // Map common key names to event.key values
  key = keyNameMap[key] || key;
  const modifiers = {
    ctrl: parts.includes('ctrl'),
    cmd: parts.includes('cmd') || parts.includes('meta'),
    alt: parts.includes('alt'),
    shift: parts.includes('shift'),
  };
  return { key, modifiers };
}

// Format shortcut for display with OS-specific modifier symbols
// Only show when keyboard is available (hides on mobile/tablet without keyboard)
const displayShortcut = computed(() => {
  if (!props.shortcut || !hasKeyboard.value) return '';

  const { isMac } = browserDetect();
  const parts = props.shortcut.split('+').map(p => p.trim());

  return parts.map(part => {
    const lower = part.toLowerCase();
    if (lower === 'ctrl') return isMac ? '⌃' : 'Ctrl';
    if (lower === 'cmd' || lower === 'meta') return isMac ? '⌘' : 'Ctrl';
    if (lower === 'alt') return isMac ? '⌥' : 'Alt';
    if (lower === 'shift') return isMac ? '⇧' : 'Shift';
    return part.toUpperCase();
  }).join(isMac ? '' : '+');
});

// Handle keyboard events
function handleKeyDown(event: KeyboardEvent) {
  if (!props.shortcut || props.disabled) return;

  // Don't trigger shortcuts when typing in input fields
  const target = event.target as HTMLElement;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
    return;
  }

  const { key, modifiers } = parseShortcut(props.shortcut);
  const { isMac } = browserDetect();

  // Check if the key matches
  if (event.key.toLowerCase() !== key) return;

  // Check modifiers - on Mac, Cmd maps to metaKey; Ctrl maps to ctrlKey
  // On Windows/Linux, both Cmd and Ctrl map to ctrlKey
  const cmdOrCtrlPressed = isMac ? event.metaKey : event.ctrlKey;
  const wantsCmd = modifiers.cmd || modifiers.ctrl;

  if (wantsCmd !== cmdOrCtrlPressed) return;
  if (modifiers.alt !== event.altKey) return;
  if (modifiers.shift !== event.shiftKey) return;

  // Prevent default browser behavior
  event.preventDefault();

  // Show pressed state
  shortcutPressed.value = true;

  // Trigger native button click
  buttonRef.value?.click();
}

// Handle key up to release pressed state
function handleKeyUp(event: KeyboardEvent) {
  if (!props.shortcut || !shortcutPressed.value) return;

  const { key } = parseShortcut(props.shortcut);
  if (event.key.toLowerCase() === key) {
    shortcutPressed.value = false;
  }
}

// Track if listeners are registered
const listenersRegistered = ref(false);

function registerKeyboardListeners() {
  if (listenersRegistered.value) return;
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  listenersRegistered.value = true;
}

function unregisterKeyboardListeners() {
  if (!listenersRegistered.value) return;
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  listenersRegistered.value = false;
}

let cleanupKeyboardDetection: (() => void) | undefined;

onMounted(() => {
  if (props.shortcut) {
    // If keyboard is already detected, register immediately
    // Otherwise, wait for keyboard to be detected (e.g., iPad with external keyboard)
    if (hasKeyboard.value) {
      registerKeyboardListeners();
    } else {
      // Lazy registration - only add listeners when keyboard is detected
      cleanupKeyboardDetection = onKeyboardDetected(() => {
        registerKeyboardListeners();
      });
    }
  }
});

onUnmounted(() => {
  unregisterKeyboardListeners();
  cleanupKeyboardDetection?.();
});

const cls = computed(() => {
  const ret = ['q-button touchable'];
  ret.push(props.class);
  if (props.loading) {
    ret.push('loading');
  }
  if (shortcutPressed.value) {
    ret.push('shortcut-active');
  }
  if ((window as any)?._quailui_use_squircle) {
    ret.push('squircle');
  }
  return ret.join(' ');
});

const validated = computed(() => {
  return !props.disabled;
});

const realAriaLabel = computed(() => {
  if (props.ariaLabel) {
    return props.ariaLabel;
  }
  if (props.title) {
    return props.title;
  }

  const defaultSlotNodes = slots.default?.();
  let text = '';

  if (defaultSlotNodes) {
    text = extractText(defaultSlotNodes).trim();
  }

  if (text === '' && cls.value.includes('icon')) {
    // try to get the text from the icon
    text = extractIconName(defaultSlotNodes);
  }

  // Return the extracted text if non-empty, otherwise undefined
  // so the aria-label attribute is only added when meaningful text is found.
  return text || undefined;
});
</script>

<style scoped lang="scss">
@use "@/styles/mixin/touchable.scss" as *;

.q-button {
  height: 44px;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  display: flex;
  cursor: default;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  line-height: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow:hidden;
  padding: 0;
  &.sm {
    height: 38px;
    font-size: 0.875rem;
    .button-inner {
      padding: 0.6rem 0.8rem;
    }
  }
  &.xs {
    height: 32px;
    font-size: 0.75rem;
    .button-inner {
      padding: 0.6rem 0.8rem;
    }
  }
  &.xxs {
    height: 24px;
    font-size: 0.7rem;
    .button-inner {
      padding: 0.4rem 0.8rem;
    }
  }
  .button-inner {
    padding: 0.8rem 1rem;
    align-self: center;
    color: inherit;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  .shortcut-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    padding: 0.15rem 0.45rem;
    font-size: 0.7rem;
    font-weight: 500;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    line-height: 1.3;
    min-width: 1.4em;

    // Hide on touch-only devices (no hover capability = likely no keyboard)
    @media (hover: none) {
      display: none;
    }
  }
  // For filled buttons (primary, highlight, danger, stripe): use light/white background
  &.primary .shortcut-badge,
  &.highlight .shortcut-badge,
  &.danger .shortcut-badge,
  &.stripe .shortcut-badge {
    background: rgba(255, 255, 255, 0.25);
    color: inherit;
  }
  // For outlined/plain buttons: subtle gray with border
  &.outlined .shortcut-badge,
  &.plain .shortcut-badge,
  &.placeholder .shortcut-badge {
    background: rgba(0, 0, 0, 0.06);
    color: rgba(0, 0, 0, 0.5);
  }
  :global(.dark) & .shortcut-badge {
    background: rgba(255, 255, 255, 0.15);
  }
  :global(.dark) &.outlined .shortcut-badge,
  :global(.dark) &.plain .shortcut-badge,
  :global(.dark) &.placeholder .shortcut-badge {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
  }
  &.weight-bold {
    font-weight: 500;
  }
  &:deep(.icon) {
    margin-right: 0.5rem;
    height: 16px !important;
    width: 16px !important;
    align-self: center;
  }
  &.block {
    width: 100%;
  }
  &.icon {
    padding: 0.8rem;
    width: 44px;
    &:deep(.icon) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0;
      height: 16px;
      width: 16px;
    }
    &.sm {
      padding: 0.6rem;
      width: 38px;
    }
    &.xs {
      padding: 0.6rem;
      width: 32px;
    }
    &.xxs {
      padding: 0.4rem;
      width: 24px;
    }
  }
}
</style>
