const POPUP_CLOSE_EVENT = 'quailui:close-popup';

function closePopupMenu() {
  window.dispatchEvent(new CustomEvent(POPUP_CLOSE_EVENT));
}

function onPopupClose(handler: () => void): () => void {
  window.addEventListener(POPUP_CLOSE_EVENT, handler);
  return () => window.removeEventListener(POPUP_CLOSE_EVENT, handler);
}

function debounce(func: any, delay: number): any {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function(this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export {
  closePopupMenu,
  onPopupClose,
  debounce,
}
