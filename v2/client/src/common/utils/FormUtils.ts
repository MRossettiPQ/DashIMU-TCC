import NotifyUtils from 'src/common/utils/NotifyUtils';
import { QForm } from 'quasar';

const message = 'Existem erros no formulário, revise-o salve novamente.';
const FormUtils = new (class FormUtils {
  validate(
    form: QForm,
    callback: (param?: boolean) => unknown,
    callbackError: (param?: unknown[]) => unknown
  ) {
    return form.validate().then((data: boolean) => {
      if (data) {
        callback(data);
        return;
      }

      NotifyUtils.notifyError(message);
      if (typeof callbackError === 'function') {
        callbackError();
      }
      return;
    });
  }

  async validateAsync(form: QForm | undefined) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'object' && (form as QForm)) {
        return form
          .validate()
          .then((data: boolean) => {
            if (data) {
              resolve(data);
            } else {
              NotifyUtils.notifyError(message);
              reject();
            }
          })
          .catch(reject);
      }
      NotifyUtils.notifyError(message);
      reject();
    });
  }
})();

export { FormUtils };
