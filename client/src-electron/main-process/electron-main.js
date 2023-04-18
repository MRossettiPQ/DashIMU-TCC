import {app, BrowserWindow, nativeTheme, Tray, Menu, nativeImage, shell, Notification} from 'electron'
import {CustomServer} from '../src/CustomServer'
import environment from '../environment'
import path from 'path'
import packageFile from '../../package.json'

let mainWindow
class ElectronApp {
  loaded = false
  loading = false
  tray
  server = new CustomServer()

  async createTrayMenu() {
    // Generate tray icon
    // eslint-disable-next-line no-undef
    const icon = nativeImage.createFromPath(path.resolve(__dirname, './assets/icon.png'))
    this.tray = new Tray(icon)

    // Tray icon menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        type: 'normal',
        icon: icon.resize({width: 16, height: 16}),
        click: async () => {
          await shell.openExternal(process.env.APP_URL)
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Close',
        type: 'normal',
        click: async () => {
          // Close app
          await app.quit()
        },
      },
    ])

    this.tray.setContextMenu(contextMenu)
    this.tray.setToolTip(packageFile.productName)
    this.tray.setTitle(packageFile.productName)
  }

  async showNotification(title, body, icon) {
    const notification = new Notification({
      title,
      body,
      icon,
    })

    notification.on('click', (event) => {
      event.preventDefault()

      shell.openExternal(process.env.APP_URL, {
        activate: true,
      })
    })

    notification.show()
  }

  async quit() {
    // Close app
    console.log('quit')
    await this.server.close()
    await app.quit()
  }

  async createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      useContentSize: true,
      webPreferences: {
        // Change from /quasar.conf.js > electron > nodeIntegration;
        // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
        nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
        nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

        // More info: /quasar-cli/developing-electron-apps/electron-preload-script
        // preload: path.resolve(__dirname, 'electron-preload.js')
      }
    })

    await mainWindow.loadURL(process.env.APP_URL)

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  async boot() {
    try {
      this.loading = true
      console.log(`\x1b[35m[ELECTRON] - Init\x1b[0m`)

      app.on('ready', this.createWindow)

      app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          app.quit()
        }
      })

      app.on('activate', async () => {
        if (mainWindow === null) {
          await this.createWindow()
        }
      })

      await this.server.boot()

      await this.createTrayMenu()

      // eslint-disable-next-line no-undef
      await this.showNotification('Dash IMU', 'Dashboard pronto para uso', path.resolve(__dirname, './assets/icon.png'))

      // await this.showNotification('STORAGE_SRC', path.resolve(yargs?.STORAGE_SRC), path.resolve(__dirname, './assets/icon.png'))
      //
      // await this.showNotification('NODE_ENV', yargs?.NODE_ENV, path.resolve(__dirname, './assets/icon.png'))
      //
      // await this.showNotification('JWT_SECRET', yargs?.JWT_SECRET, path.resolve(__dirname, './assets/icon.png'))

      console.log(`\x1b[35m[ELECTRON] - Initialized\x1b[0m`)
      this.loaded = true
    } catch (e) {
      console.log(e)
      // eslint-disable-next-line no-undef
      await this.showNotification('Error ao carregar app', '', path.resolve(__dirname, './assets/icon.png'))
      await app.quit()
    } finally {
      this.loading = true
    }
  }
}

// eslint-disable-next-line no-unused-vars
const run = (async () => {
  try {
    if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
      require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
    }
  } catch (_) {
    console.log(_)
  }

  //**
  // * Set `__statics` path to static files in production;
  // * The reason we are setting it here is that the path needs to be evaluated at runtime
  //**
  if (process.env.PROD) {
    // eslint-disable-next-line no-undef
    global.__statics = __dirname
  }

  const electronApp = new ElectronApp()
  await electronApp.boot()
})()
