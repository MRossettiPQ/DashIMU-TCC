import AuthenticateUtils from "./AuthenticateUtils";
import { notifyError, notifySuccess } from "src/commons/utils/NotifyUtils";
import axios from "axios";
import Vue from "vue";

const Axios = axios.create(
  process.env.ENV === "development" && {
    baseURL: process.env.SERVER_API,
  }
);

Axios.interceptors.response.use(
  (response) => {
    if (response.config.method.toUpperCase() !== "GET") {
      if (response.data && (response.data.message || response.data.msg)) {
        notifySuccess(response.data.message || response.data.msg);
      }
    }
    if (response.config.method.toUpperCase() !== "POST") {
      if (response.data && (response.data.message || response.data.msg)) {
        notifySuccess(response.data.message || response.data.msg);
      }
    }

    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      notifyError(error.response.data.message || error.response.data.msg);
      await Vue.prototype.$store.dispatch("Authentication/logout");
    }

    if (error.response.status === 404) {
      notifyError(this.$t("axios.404"));
    }

    if (
      error.response &&
      error.response.data &&
      (error.response.data.message || error.response.data.msg)
    ) {
      notifyError(error.response.data.message || error.response.data.msg);
    }

    if (
      error.response &&
      error.response.data &&
      typeof error.response.data == "string"
    ) {
      notifyError(error.response.data);
    }
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  (config) => {
    let token = AuthenticateUtils.getToken();
    token ? (config.headers["x-access-token"] = token) : void 0;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { Axios };
