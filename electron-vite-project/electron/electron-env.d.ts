/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */

    NODE_ENV: string;
    SEQUELIZE_DIALECT: string;
    JWT_SECRET: string;
    STORAGE_SRC: string;

    DIST: string;
    /** /dist/ or /public/ */
    PUBLIC: string;
  }
}
