import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import commonjs from "@rollup/plugin-commonjs";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        commonjs({
          dynamicRequireTargets: ["**/node_modules/sqlite3/**"],
          ignoreDynamicRequires: true,
        }),
        dynamicImportVars(),
      ],
    },
  },
  plugins: [
    electron([
      {
        // Main-Process entry file of the Electron App.
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          options.reload();
        },
      },
    ]),
  ],
});
