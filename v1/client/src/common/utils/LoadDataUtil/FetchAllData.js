import _ from 'lodash'
import { Request } from './Request'

class FetchAllData {
  result = {}

  constructor({
    loadList = {},
    auto = false,
    initialOptions = {},
    onLoad = undefined,
    onError = undefined,
    onSuccess = undefined,
  }) {
    this.request = new Request()
    this.loadList = loadList
    this.onLoad = onLoad
    this.onError = onError
    this.onSuccess = onSuccess
    this.auto = auto
    this.loading = false
    this.dataLoaded = false
    this.error = []
    this.result = undefined
    this.initialOptions = initialOptions
    this.controller = new AbortController()

    if (this.auto) {
      this.autoLoad().then((r) => console.log(r))
    }
  }

  get hasResult() {
    return !_.isNil(this.result)
  }

  get hasError() {
    return !!this.error.length
  }

  async autoLoad() {
    return await this.fetchAll()
  }

  async fetchAll(options = {}) {
    try {
      this.error = []
      this.loading = true
      this.result = {}

      const services = Object.entries(this.loadList)
      for await (const [key, value] of services) {
        let opt = {}
        const optKey = key
        if (optKey) {
          opt = options[optKey]
        }

        this.result[key] = await this.request.callService(value, {
          ...opt,
          signal: this.controller.signal,
        })
      }

      this.dataLoaded = true
      if (this.onSuccess) {
        this.onSuccess(this.result)
      }
    } catch (e) {
      console.log('[LoadDataUtils.FetchAllData]', e?.toString())
      this.error.push(e)
      if (this.onError) {
        await this.onError(this.error)
      }
    } finally {
      this.loading = false
    }
  }
}

export { FetchAllData }
