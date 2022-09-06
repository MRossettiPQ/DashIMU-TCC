import { Axios } from "../utils/AxiosUtils";
import _ from "lodash";

// Class
class Pagination {
  constructor(
    url,
    params,
    infinite,
    listContentAttr = "content",
    onNewPage,
    method,
    axiosApi
  ) {
    // Startup parameters
    this.axiosApi = axiosApi;
    this.url = url;
    this.params = { ...{ page: 1, limit: 10, fields: null }, ...params }; // Default
    this.fixedParams = _.cloneDeep(this.params);

    this.infinite = infinite;
    this.list = [];

    this.listContentAttr = listContentAttr;
    this.next = false;
    this.prev = false;
    this.more = false;
    this.loading = false;

    // Callback function
    this.onNewPage = onNewPage;

    // Post or Get
    this.method = method;
    this.lastBody = {}; // to Post method

    // Extra data
    this.totalPages = null;
    this.currentPage = null;
  }

  hasNext() {
    return this.next;
  }

  hasPrev() {
    return this.prev;
  }

  hasMore() {
    return this.next;
  }

  hasPagination() {
    return this.prev || this.next;
  }

  isEmpty() {
    return this.list && this.list.length === 0;
  }

  async loadMore() {
    try {
      if (!this.more) {
        return;
      }
      this.params.page += 1;
      return this.search(false);
    } catch (e) {
      console.log(e);
    }
  }

  async loadNext() {
    try {
      if (!this.more) {
        return;
      }
      this.params.page += 1;
      await this.search(false, this.lastBody);
    } catch (e) {
      console.log(e);
    }
  }

  async loadPrev() {
    try {
      if (this.params.page < 2) {
        return;
      }
      this.params.page -= 1;
      await this.search(false, this.lastBody);
    } catch (e) {
      console.log(e);
    }
  }

  async search(params = {}, body = {}) {
    try {
      this.loading = true;

      if (params) {
        this.params = Object.assign({}, this.fixedParams, params);
        this.list = [];
      }
      let data;

      switch (this.method) {
        case "get":
          ({ data } = await this.axiosApi.get(this.url, {
            params: this.params,
          }));
          break;

        case "post":
          if (!body) {
            body = this.lastBody;
          }
          this.lastBody = body;
          ({ data } = await this.axiosApi.post(this.url, body, {
            params: this.params,
          }));
          break;

        default:
          console.error("Incorrect pagination method");
          break;
      }

      let content = _.get(data, this.listContentAttr);

      this.list = this.infinite
        ? [...this.list, ...content.resultList]
        : content.resultList;
      this.params.page = content.page;
      this.params.rpp = content.rpp;

      this.prev = content.page > 1;
      this.next = this.more = content.more;

      if (this.onNewPage) {
        this.onNewPage(data.content);
      }
    } catch (e) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }
}

class Fetch {
  constructor(url, params, onFetch, method, axiosApi) {
    // Startup parameters
    this.axiosApi = axiosApi;
    this.url = url;
    this.params = { ...{ page: 1, limit: 10 }, ...params }; // Default
    this.fixedParams = _.cloneDeep(this.params);

    this.loading = false;

    // Callback function
    this.onFetch = onFetch;

    // Post or Get
    this.method = method;
    this.lastBody = {}; // to Post method
  }

  isEmpty() {
    return this.list && this.list.length === 0;
  }

  async search(params = {}, body = {}) {
    try {
      this.loading = true;

      if (params) {
        this.params = Object.assign({}, this.fixedParams, params);
        this.list = [];
      }
      let data;

      switch (this.method) {
        case "get":
          ({ data } = await this.axiosApi.get(this.url, {
            params: this.params,
          }));
          break;

        case "post":
          if (!body) {
            body = this.lastBody;
          }
          this.lastBody = body;
          ({ data } = await this.axiosApi.post(this.url, body, {
            params: this.params,
          }));
          break;

        default:
          console.error("Incorrect pagination method");
          break;
      }

      if (this.onFetch) {
        this.onFetch(data.content);
      }
    } catch (e) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }
}

// Export
export class PaginationUtils {
  static create({
    url,
    params = {},
    infinite = false,
    listContentAttr = "content",
    onNewPage,
    method = "get",
    axiosApi = Axios,
  }) {
    return new Pagination(
      url,
      params,
      infinite,
      listContentAttr,
      onNewPage,
      method,
      axiosApi
    );
  }
}

export class FetchUtils {
  static create({
    url,
    params = {},
    onFetch,
    method = "get",
    axiosApi = Axios,
  }) {
    return new Fetch(url, params, onFetch, method, axiosApi);
  }
}
