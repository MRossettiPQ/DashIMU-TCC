import { Component } from 'vue';
import { Dialog, QDialogOptions } from 'quasar';

export interface DialogPayload {
  [key: string]: object | string | boolean | null;
}
export interface ComponentProps {
  [key: string]: unknown;
}

// Apenas para projetos com Vue
const DialogUtils = new (class DialogUtils {
  async show(
    component?: Component | null,
    componentProps?: ComponentProps,
    props?: QDialogOptions
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      Dialog.create({
        component,
        ...componentProps,
        ...props,
      } as QDialogOptions)
        .onOk((payload: DialogPayload) => resolve(payload))
        .onCancel(() => reject())
        .onDismiss(() => reject());
    });
  }
})();

export { DialogUtils, Dialog };
