import * as Icons from './components/icons';
import * as Common from './components/common';
import { closePopupMenu } from './util';

// Re-export all components for tree-shaking support
export * from './components/icons';
export * from './components/common';

// Export utility functions
export { closePopupMenu, onPopupClose, debounce } from './util';

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
  }
};

export { Icons, Common, QuailUI }
