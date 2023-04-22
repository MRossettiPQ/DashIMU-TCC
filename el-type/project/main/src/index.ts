import { app } from 'electron';
import './security-restrictions';
import { restoreOrCreateWindow } from '/@/main-window';
import { platform } from 'node:process';
import { CustomServer } from '/@/custom-server';

class AppElectron {
  loading = false;
  server = new CustomServer();

  async boot() {
    try {
      this.loading = true;
      /**
       * Prevent electron from running multiple instances.
       */
      const isSingleInstance = app.requestSingleInstanceLock();
      if (!isSingleInstance) {
        await app.quit();
        process.exit(0);
      }
      app.on('second-instance', async () => await restoreOrCreateWindow());

      /**
       * Disable Hardware Acceleration to save more system resources.
       */
      await app.disableHardwareAcceleration();

      /**
       * Shout down background process if all windows was closed
       */
      app.on('window-all-closed', async () => {
        if (platform !== 'darwin') {
          await app.quit();
        }
      });

      /**
       * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
       */
      app.on('activate', async () => await restoreOrCreateWindow());

      if (!this.server.started) {
        await this.server.boot();
      }

      await app.whenReady();

      /**
       * Create the application window when the background process is ready.
       */
      await restoreOrCreateWindow();

      /**
       * Install Vue.js or any other extension in development mode only.
       * Note: You must install `electron-devtools-installer` manually
       */

      // if (import.meta.env.DEV) {
      //   app
      //     .whenReady()
      //     .then(() => import('electron-devtools-installer'))
      //     .then(module => {
      //       const {default: installExtension, VUEJS3_DEVTOOLS} =
      //         // @ts-expect-error Hotfix for https://github.com/cawa-93/vite-electron-builder/issues/915
      //         typeof module.default === 'function' ? module : (module.default as typeof module);
      //
      //       return installExtension(VUEJS3_DEVTOOLS, {
      //         loadExtensionOptions: {
      //           allowFileAccess: true,
      //         },
      //       });
      //     })
      //     .catch(e => console.error('Failed install extension:', e));
      // }

      /**
       * Check for app updates, install it in background and notify user that new version was installed.
       * No reason run this in non-production build.
       * @see https://www.electron.build/auto-update.html#quick-setup-guide
       *
       * Note: It may throw "ENOENT: no such file app-update.yml"
       * if you compile production app without publishing it to distribution server.
       * Like `npm run compile` does. It's ok 😅
       */
      // if (import.meta.env.PROD) {
      //   app
      //     .whenReady()
      //     .then(() => import('electron-updater'))
      //     .then(module => {
      //       const autoUpdater =
      //         module.autoUpdater ||
      //         // @ts-expect-error Hotfix for https://github.com/electron-userland/electron-builder/issues/7338
      //         (module.default.autoUpdater as (typeof module)['autoUpdater']);
      //       return autoUpdater.checkForUpdatesAndNotify();
      //     })
      //     .catch(e => console.error('Failed check and install updates:', e));
      // }
    } catch (e) {
      console.log('Catch do electron');
      console.log(e);
      process.exit(1);
    } finally {
      this.loading = false;
    }
  }

  async autoUpdater() {
    if (import.meta.env.PROD) {
      // const module = import('electron-updater');
      // const autoUpdater =
      //   module?.autoUpdater ||
      //   // @ts-expect-error Hotfix for https://github.com/electron-userland/electron-builder/issues/7338
      //   (module?.default.autoUpdater as (typeof module)['autoUpdater']);
      // return autoUpdater.checkForUpdatesAndNotify();
    }
  }

  // async createTrayMenu() {
  //
  // }
}

(async () => {
  const el = new AppElectron();
  await el.boot();
})();
