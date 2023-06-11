import { Dialog } from "quasar";
import _ from "lodash";

// Apenas para projetos com quasar em js
export default class DialogUtils {
  static async show(component, componentProps = {}, props = {}) {
    return new Promise((resolve, reject) => {
      const dialogCreator = _.merge(component ? { component } : null, componentProps, props);
      Dialog.create(dialogCreator)
        .onOk((payload) => resolve(payload))
        .onCancel(() => reject())
        .onDismiss((e) => resolve(e));
    });
  }

  static async create(props) {
    return new Promise((resolve, reject) => {
      Dialog.create(props)
        .onOk((payload) => resolve(payload))
        .onCancel((e) => reject(e))
        .onDismiss((e) => reject(e));
    });
  }
}
