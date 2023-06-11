import { notifyError } from '../NotifyUtils'
import _ from 'lodash'

const confError = 'Error na request, deve ser uma função ou um objeto { load, initialParams }'
class Request {
  errorMsg() {
    if (process.env.DEV) {
      notifyError(confError)
    }
  }

  async callService(load, options) {
    switch (typeof load) {
      case 'function':
        if (options) {
          options = _.merge(options, _.merge(options['options'], options))
        }
        return await load({ ...options })
      case 'object':
        // Verifica se existe initialOptions para o service e realiza o merge deles
        if (load) {
          options = _.merge(options, _.merge(load['initialOptions'], options))
        }
        // Verifica e pega a key load do service
        if (load) {
          return await this.callService(load['service'], options)
        }
        return null
      default:
        this.errorMsg()
        return null
    }
  }
}

export { Request }
