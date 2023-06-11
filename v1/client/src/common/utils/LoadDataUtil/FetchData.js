import _ from 'lodash'
import { Request } from './Request'

class FetchData {
  constructor({
    load = {},
    auto = false,
    onLoad = undefined,
    onError = undefined,
    onSuccess = undefined,
  } = {}) {
    this.load = load
    this.onLoad = onLoad
    this.onError = onError
    this.onSuccess = onSuccess
    this.auto = auto
    this.loading = false
    this.dataLoaded = false
    this.request = new Request()
    this.error = []
    this.result = {}
    this.controller = new AbortController()

    if (this.auto) {
      this.autoLoad().then((r) => console.log(r))
    }
  }

  get hasError() {
    return !!this.error.length
  }

  get isNull() {
    return _.isNil(this.result)
  }

  async autoLoad() {
    return await this.fetch()
  }

  async fetch(options = {}) {
    try {
      this.loading = true
      this.result = {}

      if (!this.load) {
        this.request.errorMsg()
        return
      }

      this.result = await this.request.callService(
        this.load,
        _.merge(
          {
            AxiosConfig: {
              signal: this.controller.signal,
            },
          },
          options
        )
      )

      this.dataLoaded = true
      if (this.onSuccess) {
        await this.onSuccess({ result: this.result })
      }
    } catch (e) {
      console.log('[LoadDataUtils.Fetch]', e?.toString())
      this.error.push(e)
      if (this.onError) {
        await this.onError(this.error)
      }
    } finally {
      this.loading = false
      if (this.onLoad) {
        await this.onLoad({ result: this.result })
      }
    }
  }
}

export { FetchData }
