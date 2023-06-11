import { notifyError } from "src/common/utils/NotifyUtils";

const message = "Existem erros no formulário, revise-o salve novamente.";
const FormUtils = new (class FormUtils {
  validate(form, callback, callbackError) {
    return form.validate().then((data) => {
      if (data) {
        callback(data);
        return;
      }

      notifyError(message);
      if (typeof callbackError === "function") {
        callbackError();
      }
    });
  }

  async validateAsync(form) {
    return new Promise((resolve, reject) => {
      if (typeof form === "object" && form) {
        return form
          .validate()
          .then((data) => {
            if (data) {
              resolve(data);
            } else {
              notifyError(message);
              reject();
            }
          })
          .catch(reject);
      }
      notifyError(message);
      reject();
    });
  }
})();

export { FormUtils };
