import * as Icons from './components/icons';
import * as Common from './components/common';
import { closePopupMenu } from './util';
import './style.scss';

const QuailUI = {
  install(app:any, options:any) {
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
          "https://static.quail.ink/assets/squircle.min.js"
        );
        const w = (window as any);
        w._quailui_use_squircle = true;
      }
    }

    document.body.addEventListener('click', (e) => {
      closePopupMenu();
    })
  }
};

export { Icons, Common, QuailUI }
