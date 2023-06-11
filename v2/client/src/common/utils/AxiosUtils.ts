import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import NotifyUtils from 'src/common/utils/NotifyUtils';
import StorageUtils from 'src/common/utils/StorageUtils';

export interface ResponseBody {
  data?: Data;
}

interface ErrorBody {
  response: Response;
  [key: string]: unknown | ErrorBody;
}

interface Response {
  message?: string;
  msg?: string;
  statusText?: unknown | string;
  data?: string | Data;
  [key: string]: unknown | ErrorBody;
}

interface Data {
  content?: Bean;
  message: string;
  msg?: string;
}

interface Bean {
  [key: string]: unknown;
}

function headerCreator(): AxiosRequestHeaders {
  const token: string | null = StorageUtils.getTokenSync();
  const header: AxiosHeaders = new AxiosHeaders();
  if (token) {
    header.setAuthorization(token);
  }
  return <AxiosRequestHeaders>header;
}

class Request {
  Axios: AxiosInstance = axios;

  // Abaixo são utilitarios para configuração do Axios
  fulfilledRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    config.headers = headerCreator();
    return config;
  }

  defaultReject(error: unknown) {
    return Promise.reject(error);
  }

  async fulfilledResponse(response: AxiosResponse) {
    const data: Data = response.data;
    switch (response.config.method?.toUpperCase()) {
      case 'GET':
        if (data?.message || data?.msg) {
          NotifyUtils.notifySuccess(<string>(data.message || data.msg));
        }
        break;
      case 'POST':
        if (data?.message || data?.msg) {
          NotifyUtils.notifySuccess(<string>(data.message || data.msg));
        }
        break;
      default:
        break;
    }
    return response;
  }

  async handlerReject(error: ErrorBody) {
    const response = error?.response;
    let msg = '';
    let haveMsg = false;
    if (response && response.data) {
      haveMsg = false;
      const data = response?.data;
      const checkHtml = RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>');
      if (typeof data === 'string' && checkHtml.test(data)) {
        haveMsg = true;
        msg = <string>response.statusText;
      } else if (typeof data !== 'string') {
        if (
          (typeof data.message === 'string' && data?.message) ||
          (typeof data.msg === 'string' && data?.msg)
        ) {
          haveMsg = true;
          msg = <string>data?.message || <string>data?.msg;
        }
      }
      if (haveMsg) {
        NotifyUtils.notifyError(msg);
      }
    }
    return Promise.reject(error);
  }

  public create(option?: AxiosRequestConfig | null): AxiosInstance {
    this.Axios = axios.create({ ...option });

    this.Axios.interceptors.response.use(
      this.fulfilledResponse,
      this.handlerReject
    );

    this.Axios.interceptors.request.use(
      this.fulfilledRequest,
      this.defaultReject
    );

    return this.Axios;
  }
}

const Axios = new Request().create(
  process.env.DEV
    ? {
        baseURL: process.env.SERVER_API?.replace(/['"!@#$%^&*]/g, ''),
      }
    : null
);
export { Axios, Request };
