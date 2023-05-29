declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DEV: boolean;
    ENV: string;
    SERVER_API: string;
    SOCKET_URL: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
