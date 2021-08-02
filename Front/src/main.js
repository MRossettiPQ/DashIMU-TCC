import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueApexCharts from "vue3-apexcharts";
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { FontAwesomeIcon } from './plugins/font-awesome'

createApp(App)
  .use(router)
  .use(store)
  // .use(BootstrapVue)  // Make BootstrapVue available throughout your project         
  // .use(IconsPlugin)   // Optionally install the BootstrapVue icon components plugin
  .use(VueApexCharts)
  // .component('apexchart', VueApexCharts)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
