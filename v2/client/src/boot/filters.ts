import { boot } from 'quasar/wrappers';
import FilterUtils from 'src/common/utils/FilterUtils';

declare module 'vue/types/vue' {
  interface Vue {
    $filters: unknown;
  }
}

export default boot(({ Vue }) => {
  Vue.prototype.$filters = FilterUtils;
});
