import { createApp, h, type Component } from 'vue';
import QToastContainer from '../components/common/QToastContainer.vue';

export interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
  closable?: boolean;
  icon?: Component;
}

interface ToastContainer {
  addToast: (options: ToastOptions) => number;
  removeToast: (id: number) => void;
  closeAll: () => void;
}

let toastContainer: ToastContainer | null = null;
let containerEl: HTMLElement | null = null;

function ensureContainer(position: string = 'top'): ToastContainer {
  if (!toastContainer) {
    containerEl = document.createElement('div');
    containerEl.id = 'q-toast-container-root';
    document.body.appendChild(containerEl);

    const app = createApp({
      render() {
        return h(QToastContainer, { position });
      },
    });

    const vm = app.mount(containerEl);
    toastContainer = (vm as any).$children?.[0] || vm;

    // Get the exposed methods from the component
    const containerComponent = (containerEl.querySelector('.q-toast-container') as any)?.__vueParentComponent?.exposed;
    if (containerComponent) {
      toastContainer = containerComponent;
    } else {
      // Fallback: access via the mounted component
      toastContainer = (vm as any);
    }
  }
  return toastContainer!;
}

// Alternative approach using a ref-based container
let containerInstance: any = null;

function getContainer(): ToastContainer {
  if (!containerInstance) {
    const container = document.createElement('div');
    container.id = 'q-toast-container-root';
    document.body.appendChild(container);

    const app = createApp(QToastContainer, { position: 'top' });
    containerInstance = app.mount(container);
  }
  return containerInstance;
}

export function useToast() {
  function show(options: ToastOptions): number {
    const container = getContainer();
    return container.addToast(options);
  }

  function success(message: string, options?: Partial<Omit<ToastOptions, 'message' | 'type'>>): number {
    return show({ ...options, message, type: 'success' });
  }

  function error(message: string, options?: Partial<Omit<ToastOptions, 'message' | 'type'>>): number {
    return show({ ...options, message, type: 'error' });
  }

  function warning(message: string, options?: Partial<Omit<ToastOptions, 'message' | 'type'>>): number {
    return show({ ...options, message, type: 'warning' });
  }

  function info(message: string, options?: Partial<Omit<ToastOptions, 'message' | 'type'>>): number {
    return show({ ...options, message, type: 'info' });
  }

  function closeAll(): void {
    const container = getContainer();
    container.closeAll();
  }

  return {
    show,
    success,
    error,
    warning,
    info,
    closeAll,
  };
}
