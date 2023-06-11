import axios, { AxiosHeaders } from 'axios'
import { notifyError, notifySuccess } from 'src/common/utils/NotifyUtils'
import StorageUtils from 'src/common/utils/StorageUtils'

function headerCreator() {
  const token = StorageUtils.getTokenSync()
  const header = new AxiosHeaders()
  if (token) {
    header.setAuthorization(token)
  }
  return header
}

class Request {
  Axios = axios

  // Abaixo são utilitarios para configuração do Axios
  fulfilledRequest(config) {
    config.headers = headerCreator()
    return config
  }

  defaultReject(error) {
    return Promise.reject(error)
  }

  async fulfilledResponse(response) {
    const data = response.data
    const existMessage = typeof data?.message === 'string' && data?.message.length
    const existMsg = typeof data?.msg === 'string' && data?.msg.length

    switch (response.config.method?.toUpperCase()) {
      case 'GET':
        if (existMessage || existMsg) {
          notifySuccess(data.message || data.msg)
        }
        break
      case 'POST':
        if (existMessage || existMsg) {
          notifySuccess(data.message || data.msg)
        }
        break
      default:
        break
    }
    return response
  }

  async handlerReject(error) {
    const response = error?.response
    let msg = ''
    let haveMsg = false
    if (response && response.data) {
      haveMsg = false
      const data = response?.data
      const checkHtml = RegExp('<("[^"]*"|\'[^\']*\'|[^\'">])*>')
      if (typeof data === 'string' && checkHtml.test(data)) {
        haveMsg = true
        msg = response.statusText
      } else if (typeof data !== 'string') {
        if ((typeof data.message === 'string' && data?.message) || (typeof data.msg === 'string' && data?.msg)) {
          haveMsg = true
          msg = data?.message || data?.msg
        }
      }
      if (haveMsg) {
        notifyError(msg)
      }
    }
    return Promise.reject(error)
  }

  create(option = {}) {
    this.Axios = axios.create({ ...option })

    this.Axios.interceptors.response.use(this.fulfilledResponse, this.handlerReject)

    this.Axios.interceptors.request.use(this.fulfilledRequest, this.defaultReject)

    return this.Axios
  }
}

const Axios = new Request().create(
  process.env.DEV
    ? {
        baseURL: process.env.SERVER_API?.replace(/['"!@#$%^&*]/g, ''),
      }
    : null
)
export { Axios, Request }
