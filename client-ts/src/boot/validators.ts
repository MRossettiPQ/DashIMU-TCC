import { boot } from 'quasar/wrappers';
import { ValidatorsUtils } from 'src/common/utils/ValidatorsUtils';

declare module 'vue/types/vue' {
  interface Vue {
    $rules: unknown;
  }
}

export default boot(({ Vue }) => {
  Vue.prototype.$rules = new ValidatorsUtils();
});
