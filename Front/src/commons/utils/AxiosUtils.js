import AutenticacaoUtils from "../../commons/utils/AutenticacaoUtils";
import {notifyError, notifySuccess} from "../../commons/utils/NotifyUtils";
import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.SERVER_API
});

Axios.interceptors.response.use((response) => {
  if (response.config.method.toUpperCase() !== 'GET') {
    if (response.data && (response.data.message || response.data.msg)) {
      notifySuccess(response.data.message || response.data.msg);
    }
  }
  if (response.config.method.toUpperCase() !== 'POST'){
    if (response.data && (response.data.message || response.data.msg)) {
      notifySuccess(response.data.message || response.data.msg);
    }
  }

  return response;
}, (error) => {
  if (error.response.status === 404) {
    notifyError("Endpoint não encontrado");
  }

  if (error.response && error.response.data && (error.response.data.message || error.response.data.msg)) {
    notifyError(error.response.data.message || error.response.data.msg);
  }

  if (error.response && error.response.data && typeof error.response.data == 'string') {
    notifyError(error.response.data);
  }
  return Promise.reject(error);
});

Axios.interceptors.request.use(
  (config) => {
    let token = AutenticacaoUtils.getToken();
    token ? config.headers['x-access-token'] = token : void 0;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  });

export {
  Axios
};
