import "reflect-metadata";
import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import moment from "moment";
import VueApexCharts from "vue-apexcharts";

import routes from "./routes";

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VueApexCharts);
// Vue.use(VueWebsocket);
// Vue.use(VueNativeSock, "ws://localhost:9090/api/socket", {
//   connectManually: true,
//   reconnection: true, // (Boolean) whether to reconnect automatically (false)
//   reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
//   reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
//   format: "json",
// });

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
moment.locale("pt-br");

export default function (/* { store, ssrContext } */) {
  return new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });
}
