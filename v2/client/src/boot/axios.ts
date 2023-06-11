import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import { Request } from 'src/common/utils/AxiosUtils';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
    $api: Request;
  }
}

export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$axios = axios;
  Vue.prototype.$api = new Request();
});
