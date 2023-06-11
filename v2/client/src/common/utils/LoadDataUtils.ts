import { toRaw } from 'vue';
import _ from 'lodash';
import NotifyUtils from 'src/common/utils/NotifyUtils';
import { ListMetadata, Metadata } from 'src/common/models/Metadata';

const confError =
  'Error na request, deve ser uma função ou um objeto { load, initialParams }';

export interface SearchOptions {
  erase?: boolean;
  options?: OptionsParams;
  [key: string]: unknown;
}

interface OptionsParams {
  [key: string]: unknown;
}

class Request {
  errorMsg() {
    if (process.env.DEV) {
      NotifyUtils.notifyError(confError);
    }
  }

  async callService(load: unknown, options: object): Promise<unknown> {
    switch (typeof load) {
      case 'function':
        const optKey1 = 'options' as ObjectKey;
        if (options && optKey1) {
          options = _.merge(options, _.merge(options[optKey1], options));
        }
        return await load({ ...options });
      case 'object':
        type ObjectKey = keyof typeof load;
        // Verifica se existe initialOptions para o service e realiza o merge deles
        const optKey2 = 'initialOptions' as ObjectKey;
        if (load && optKey2) {
          options = _.merge(options, _.merge(load[optKey2], options));
        }

        // Verifica e pega a key load do service
        const loadKey = 'service' as ObjectKey;
        if (load && loadKey) {
          return await this.callService(load[loadKey], options);
        }
        return null;
      default:
        this.errorMsg();
        return null;
    }
  }
}

class FetchAllData {
  request: Request = new Request();
  loadList?: object;
  onLoad: ((arg0: unknown) => unknown) | undefined;
  onError: ((arg0: unknown) => unknown) | undefined;
  onSuccess: ((arg0: unknown) => unknown) | undefined;
  auto = false;
  loading = false;
  dataLoaded = false;

  error: unknown[] = [];
  result?: Metadata;
  initialOptions: object = {};
  controller: AbortController;

  constructor({
    loadList = {},
    auto = false,
    initialOptions = {},
    onLoad = void 0,
    onError = void 0,
    onSuccess = void 0,
  }) {
    this.controller = new AbortController();
    this.onLoad = onLoad;
    this.onError = onError;
    this.onSuccess = onSuccess;
    this.initialOptions = initialOptions;
    this.loadList = loadList;
    this.auto = auto;
    if (this.auto) {
      this.autoLoad().then((r) => console.log(r));
    }
  }

  get hasResult() {
    return !_.isNil(this.result);
  }

  get hasError() {
    return !!this.error.length;
  }

  async autoLoad() {
    return await this.fetchAll();
  }

  async fetchAll(options: object = {}) {
    try {
      this.error = [];
      this.loading = true;
      this.result = {};

      type ObjectKey = keyof typeof options;
      const services = _.entries(this.loadList);
      for await (const [key, value] of services) {
        let opt = {};
        const optKey = key as ObjectKey;
        if (optKey) {
          opt = options[optKey];
        }
        // TODO: Verificar como remover a dependência do toRaw
        this.result[key] = await this.request.callService(value, {
          ...opt,
          signal: this.controller.signal,
        });
      }
      this.dataLoaded = true;
      this.onSuccess?.(this.result);
    } catch (e) {
      console.log('[LoadDataUtils.FetchAllData]', e?.toString());
      this.error.push(e);
      await this.onError?.(this.error);
    } finally {
      this.loading = false;
    }
  }
}

class Pagination {
  load: unknown;
  onLoad: ((arg0: unknown) => unknown) | undefined;
  onError: ((arg0: unknown) => unknown) | undefined;
  onSuccess: ((arg0: unknown) => unknown) | undefined;
  auto = false;
  loading = false;
  dataLoaded = false;
  infinite = false;
  request: Request = new Request();
  error: unknown[] = [];
  list: unknown[] = [];
  private result?: ListMetadata;
  params = {
    more: false,
    page: 0,
    fields: null,
  };
  // TODO: Historico
  paginationInfo = {
    more: false,
    count: 0,
    endPosition: 0,
    maxPages: 0,
    page: 0,
    rpp: 10,
    fields: null,
  };

  method: string;
  listKey: string;
  controller: AbortController;

  constructor({
    load = {},
    auto = false,
    listKey = 'resultList',
    params = {},
    infinite = false,
    onLoad = void 0,
    onError = void 0,
    onSuccess = void 0,
    method = 'GET',
  } = {}) {
    this.controller = new AbortController();
    this.method = method;
    if (typeof load === 'object' || typeof load === 'function') {
      this.load = load;
    }

    this.auto = auto;

    this.onLoad = onLoad;
    this.onError = onError;
    this.onSuccess = onSuccess;

    this.result = {};
    this.listKey = listKey;
    this.infinite = infinite;

    this.params = {
      ...{
        page: 0,
        rpp: 10,
        more: false,
        fields: null,
      },
      ...params,
    };

    if (auto) {
      this.search().then((r) => console.log(r));
    }
  }

  async autoLoad() {
    return await this.search();
  }

  async abortRequest() {
    if (this.loading) {
      await this.controller.abort();
    }
  }

  async search(
    options: SearchOptions = {
      erase: false,
    }
  ) {
    this.loading = true;
    try {
      //
      if (!this.infinite) {
        this.list = [];
      }

      const reqResult: unknown = await this.request.callService(
        this.load,
        _.merge(
          {
            AxiosConfig: {
              signal: this.controller.signal,
            },
          },
          options
        )
      );

      this.result = <ListMetadata>reqResult;
      type ResultKey = keyof typeof reqResult;
      const optKey = this.listKey as ResultKey;
      if (optKey) {
        if (this.infinite && !options.erase) {
          // Se for infinito e não tiver que limpar a paginação
          this.list = this.list.concat(this.result[optKey]);
        } else {
          // Caso não seja infinito, ou se for infinito e quiser limpar a paginação
          this.list = <unknown[]>this.result[optKey];
        }
        delete this.result[optKey]; // remove a lista do result para não ficar duplicando com lixo
      }

      this.params = { ...this.params, ...(<object>reqResult) };
      this.paginationInfo = { ...this.paginationInfo, ...this.params };

      //
      this.dataLoaded = true;
      if (this.onSuccess) {
        await this.onSuccess?.({ list: toRaw(this.list) });
      }
    } catch (e) {
      console.log('[LoadDataUtils.Pagination]', e?.toString());
      this.error.push(e);
      if (this.onError) {
        await this.onError?.(this.error);
      }
    } finally {
      this.loading = false;
      if (this.onLoad) {
        await this.onLoad?.({ list: toRaw(this.list) });
      }
    }
  }

  get page(): number {
    return this.paginationInfo.page;
  }

  count(): number {
    return this.paginationInfo.count;
  }

  get maxPages(): number {
    return this.paginationInfo.maxPages;
  }

  hasPage(): boolean {
    return this.maxPages > 0;
  }

  hasNext() {
    return this.maxPages > this.page && this.hasPage;
  }

  hasPrev() {
    return this.maxPages < this.page && this.hasPage;
  }

  hasMore() {
    return this.params.more;
  }

  hasPagination() {
    return this.hasNext || this.hasPrev;
  }

  isEmpty(): boolean {
    return this.list && this.list.length === 0;
  }

  async loadMore() {
    try {
      if (!this.hasMore) {
        return;
      }
      this.params.page += 1;
      return this.search();
    } catch (e) {
      console.log(e);
    }
  }

  async loadNext() {
    try {
      if (!this.hasMore) {
        return;
      }
      this.params.page += 1;
      await this.search();
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
      await this.search();
    } catch (e) {
      console.log(e);
    }
  }
}

class FetchData {
  //  TODO: FetchData example
  //  function reqTest() {
  //    return {
  //      message: 'LOAD AQUI',
  //    };
  //  }
  //  loadObject = new FetchData({
  //     load: {
  //       service: reqTest,
  //       initialOptions: {
  //         params: {
  //           id: 1200,
  //           pdr: '213133',
  //         },
  //       },
  //     },
  //   });
  //  loadObject.load()
  //  loadFunction = new FetchData({
  //    load: reqTest,
  //  });
  //  loadFunction.fetch({ params: { id: 1200, pdr: 213133 } })

  load: unknown;
  onLoad: ((arg0: unknown) => unknown) | undefined;
  onError: ((arg0: unknown) => unknown) | undefined;
  onSuccess: ((arg0: unknown) => unknown) | undefined;
  auto = false;
  loading = false;
  dataLoaded = false;
  request: Request = new Request();

  error: unknown[] = [];
  result?: unknown = {};
  controller: AbortController;

  // ServiceName
  constructor({
    load = {},
    auto = false,
    onLoad = void 0,
    onError = void 0,
    onSuccess = void 0,
  } = {}) {
    this.controller = new AbortController();
    if (typeof load === 'object' || typeof load === 'function') {
      this.load = load;
    }

    this.onLoad = onLoad;
    this.onError = onError;
    this.onSuccess = onSuccess;
    this.auto = auto;

    this.result = {};

    if (this.auto) {
      this.autoLoad().then((r) => console.log(r));
    }
  }

  get hasError() {
    return !!this.error.length;
  }

  get isNull() {
    return _.isNil(this.result);
  }

  async autoLoad() {
    return await this.fetch();
  }

  async fetch(options: object = {}) {
    try {
      this.loading = true;
      // Clear previous result
      this.result = {};

      // Call API service
      if (!this.load) {
        this.request.errorMsg();
        return;
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
      );
      //
      this.dataLoaded = true;
      await this.onSuccess?.({ result: this.result });
    } catch (e) {
      console.log('[LoadDataUtils.Fetch]', e?.toString());
      this.error.push(e);
      await this.onError?.(this.error);
    } finally {
      this.loading = false;
      await this.onLoad?.({ result: this.result });
    }

    // TODO: Verificar como remover a dependência do toRaw
    // return toRaw(this.result);
  }
}

export { FetchData, FetchAllData, Pagination };
