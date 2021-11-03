import Vue from "vue";
import axios from "axios";
import Axios from "axios";
import { Notify, throttle } from "quasar";

Vue.prototype.$axios = axios;

const AxiosApi = Axios.create({
  baseURL: process.env.SERVER
});

let notifySuccess = throttle(msg => {
  Notify.create({
    message: msg,
    textColor: "white",
    color: "positive",
    icon: "check"
  });
}, 500);

let notifyError = throttle(msg => {
  Notify.create({
    message: msg,
    textColor: "white",
    color: "negative",
    icon: "priority_high"
  });
}, 500);
