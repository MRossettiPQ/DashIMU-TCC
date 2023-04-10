const { CustomServer } = require('./src/CustomServer')
const { app, Tray, Menu, nativeImage, shell } = require('electron')
const environment = require('./environment')

class ElectronApp {
  loaded = false
  loading = false
  tray
  server = new CustomServer()

  async createTrayMenu() {
    // Generate tray icon
    const icon = nativeImage.createFromPath('./assets/icon.png')
    this.tray = new Tray(icon)

    // Tray icon menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        type: 'normal',
        icon: icon.resize({ width: 32, height: 32 }),
        click: async () => {
          // Open Window in browser
          await shell.openExternal(environment.electron.url)
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
    this.tray.setToolTip('This is my application')
    this.tray.setTitle('This is my title')
  }

  async boot() {
    try {
      this.loading = true
      console.log(`\x1b[35m[ELECTRON] - Init\x1b[0m`)

      await app.whenReady()

      await this.createTrayMenu()

      await this.server.boot()
      console.log(`\x1b[35m[ELECTRON] - Initialized\x1b[0m`)
      this.loaded = true
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = true
    }
  }
}

// eslint-disable-next-line no-unused-vars
const run = (async () => {
  const electronApp = new ElectronApp()
  await electronApp.boot()
})()
