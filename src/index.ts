import * as Icons from './components/icons';
import * as Common from './components/common';
import { closePopupMenu } from './util';

// Re-export all components for tree-shaking support
export * from './components/icons';
export * from './components/common';

// Export utility functions
export { closePopupMenu, onPopupClose, debounce } from './util';

// Export composables
export { useToast } from './composables/useToast';
export type { ToastOptions } from './composables/useToast';
export { useKeyboard, hasKeyboard } from './composables/useKeyboard';
export {
  THEME_STORAGE_KEY,
  THEME_IDS,
  applyTheme,
  getThemeOptions,
  isTheme,
  readStoredTheme,
  resolveInitialTheme,
} from './theme';
export type { QuailTheme, ThemeOption } from './theme';

/**
 * Enable or disable TUI (Text User Interface) mode
 * In TUI mode, all UI components use monospace font
 * @param enabled - Whether to enable TUI mode
 */
export function setTUIMode(enabled: boolean) {
  if (enabled) {
    document.body.classList.add('tui');
  } else {
    document.body.classList.remove('tui');
  }
}

const QuailUI = {
  install(app:any, options:any) {
    // Import styles only when using full plugin
    import('./style.scss');

    if (options?.debug) {
      console.log('options', options);
    }
    for (const [name, component] of Object.entries(Icons)) {
      if (options?.debug) {
        console.log('[quail-ui] register icon component', name, component);
      }
      app.component(name, component);
    }
    for (const [name, component] of Object.entries(Common)) {
      if (options?.debug) {
        console.log('[quail-ui] register common component', name, component);
      }
      app.component(name, component);
    }

    if (options?.useSquircle) {
      if ("paintWorklet" in CSS) {
        if (options?.debug) {
          console.log("[quail-ui] add CSS paintWorklet")
        }
        (CSS as any)?.paintWorklet?.addModule(
          "https://static.quaily.com/assets/squircle.min.js"
        );
        const w = (window as any);
        w._quailui_use_squircle = true;
      }
    }

    // Prevent duplicate click handlers
    if (!(window as any).__quailui_click_handler_installed) {
      document.body.addEventListener('click', () => closePopupMenu());
      (window as any).__quailui_click_handler_installed = true;
    }

    // TUI mode - use monospace font for all components
    if (options?.tui) {
      if (options?.debug) {
        console.log("[quail-ui] TUI mode enabled");
      }
      setTUIMode(true);
    }
  }
};

export { Icons, Common, QuailUI }
