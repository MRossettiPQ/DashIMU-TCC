import { Component } from 'vue';
import { Dialog, QDialogOptions } from 'quasar';
import _ from 'lodash';

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
    componentProps?: ComponentProps | null,
    props?: QDialogOptions
  ): Promise<unknown> {
    const dialogCreator: QDialogOptions = _.merge(
      component ? { component } : null,
      componentProps,
      props
    );
    return new Promise((resolve, reject) => {
      Dialog.create(dialogCreator)
        .onOk((payload: DialogPayload) => resolve(payload))
        .onCancel(() => reject())
        .onDismiss(() => reject());
    });
  }

  async create(props?: QDialogOptions): Promise<unknown> {
    return new Promise((resolve, reject) => {
      Dialog.create({
        ...props,
      } as QDialogOptions)
        .onOk((payload: DialogPayload) => resolve(payload))
        .onCancel(() => reject())
        .onDismiss(() => reject());
    });
  }
})();

export { DialogUtils, Dialog };
