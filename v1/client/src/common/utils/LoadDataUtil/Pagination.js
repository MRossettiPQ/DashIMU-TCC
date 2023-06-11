import _ from 'lodash'
import { Request } from './Request'

class Pagination {
  constructor({
    load = {},
    auto = false,
    listKey = 'resultList',
    params = {},
    infinite = false,
    onLoad = undefined,
    onError = undefined,
    onSuccess = undefined,
    method = 'GET',
  } = {}) {
    this.load = load
    this.onLoad = onLoad
    this.onError = onError
    this.onSuccess = onSuccess
    this.auto = auto
    this.loading = false
    this.dataLoaded = false
    this.infinite = infinite
    this.request = new Request()
    this.error = []
    this.list = []
    this.result = undefined
    this.params = {
      more: false,
      page: 0,
      fields: null,
      ...params,
    }
    this.paginationInfo = {
      more: false,
      count: 0,
      endPosition: 0,
      maxPages: 0,
      page: 0,
      rpp: 10,
      fields: null,
    }
    this.method = method
    this.listKey = listKey
    this.controller = new AbortController()

    if (auto) {
      this.search().then((r) => console.log(r))
    }
  }

  async autoLoad() {
    return await this.search()
  }

  async abortRequest() {
    if (this.loading) {
      await this.controller.abort()
    }
  }

  async search(options = { erase: false }) {
    this.loading = true
    try {
      if (!this.infinite) {
        this.list = []
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
      const optKey = this.listKey
      if (optKey) {
        if (this.infinite && !options.erase) {
          this.list = this.list.concat(this.result[optKey])
        } else {
          this.list = this.result[optKey]
        }
        delete this.result[optKey]
      }

      this.params = { ...this.params, ...this.result }
      this.paginationInfo = { ...this.paginationInfo, ...this.params }

      this.dataLoaded = true
      if (this.onSuccess) {
        await this.onSuccess({ list: this.list })
      }
    } catch (e) {
      console.log('[LoadDataUtils.Pagination]', e?.toString())
      this.error.push(e)
      if (this.onError) {
        await this.onError(this.error)
      }
    } finally {
      this.loading = false
      if (this.onLoad) {
        await this.onLoad({ list: this.list })
      }
    }
  }

  get page() {
    return this.paginationInfo.page
  }

  count() {
    return this.paginationInfo.count
  }

  get maxPages() {
    return this.paginationInfo.maxPages
  }

  hasPage() {
    return this.maxPages > 0
  }

  hasNext() {
    return this.maxPages > this.page && this.hasPage()
  }

  hasPrev() {
    return this.maxPages < this.page && this.hasPage()
  }

  hasMore() {
    return this.params.more
  }

  hasPagination() {
    return this.hasNext() || this.hasPrev()
  }

  isEmpty() {
    return this.list.length === 0
  }

  async loadMore() {
    try {
      if (!this.hasMore()) {
        return
      }
      this.params.page += 1
      return this.search()
    } catch (e) {
      console.log(e)
    }
  }

  async loadNext() {
    try {
      if (!this.hasMore()) {
        return
      }
      this.params.page += 1
      await this.search()
    } catch (e) {
      console.log(e)
    }
  }

  async loadPrev() {
    try {
      if (this.params.page < 2) {
        return
      }
      this.params.page -= 1
      await this.search()
    } catch (e) {
      console.log(e)
    }
  }
}

export { Pagination }
