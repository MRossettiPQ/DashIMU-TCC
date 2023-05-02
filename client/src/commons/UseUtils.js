import ValidatorsUtils from "./utils/ValidatorsUtils";
import { i18n } from "boot/i18n";

export const ValidatorPlugin = {
  install: function install(Vue) {
    Vue.prototype.$validators = new ValidatorsUtils(i18n).getAllValidators();
  },
};
