import { ref, onMounted, onUnmounted } from 'vue';

// Global state - shared across all components
const hasKeyboard = ref(false);
const listeners: Set<() => void> = new Set();
let initialized = false;

function detectInitialState(): boolean {
  if (typeof window === 'undefined') return true;

  // Check if it's a touch-only device using media query
  // hover: hover means the device has a hover-capable pointing device (mouse)
  // pointer: fine means the device has an accurate pointing device (mouse, not finger)
  const hasHoverCapability = window.matchMedia('(hover: hover)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

  // If device has hover and fine pointer, likely has keyboard too
  if (hasHoverCapability && hasFinePointer) {
    return true;
  }

  // Check for known desktop user agents (fallback)
  const ua = navigator.userAgent.toLowerCase();
  const isDesktop = !(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua));

  return isDesktop;
}

function handleKeyDown(event: KeyboardEvent) {
  // Ignore modifier-only key presses
  if (['Control', 'Alt', 'Shift', 'Meta'].includes(event.key)) {
    return;
  }

  // Keyboard detected!
  if (!hasKeyboard.value) {
    hasKeyboard.value = true;
    // Notify all listeners
    listeners.forEach(fn => fn());
  }
}

function initKeyboardDetection() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  // Set initial state based on device detection
  hasKeyboard.value = detectInitialState();

  // Listen for keyboard events to detect external keyboards (e.g., iPad + keyboard)
  window.addEventListener('keydown', handleKeyDown, { passive: true });
}

function cleanupKeyboardDetection() {
  if (typeof window === 'undefined') return;
  window.removeEventListener('keydown', handleKeyDown);
  initialized = false;
}

/**
 * Composable to detect if a physical keyboard is available.
 *
 * - On desktop: assumes keyboard is available
 * - On mobile/tablet: starts with no keyboard assumed
 * - When any key is pressed: marks keyboard as available
 *
 * This handles iPad with external keyboard correctly.
 */
export function useKeyboard() {
  onMounted(() => {
    initKeyboardDetection();
  });

  /**
   * Register a callback to be called when keyboard is detected.
   * Useful for lazy-registering keyboard shortcuts.
   */
  function onKeyboardDetected(callback: () => void) {
    if (hasKeyboard.value) {
      // Already detected, call immediately
      callback();
    } else {
      listeners.add(callback);
    }

    // Return cleanup function
    return () => {
      listeners.delete(callback);
    };
  }

  return {
    hasKeyboard,
    onKeyboardDetected,
  };
}

// Also export for direct use
export { hasKeyboard };
