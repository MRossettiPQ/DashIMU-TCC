const { CustomServer } = require('./src/CustomServer')
const { app, Tray, Menu, nativeImage, shell, Notification } = require('electron')
const environment = require('./environment')
const path = require('path')
const packageFile = require('./package.json')

class ElectronApp {
  loaded = false
  loading = false
  tray
  server = new CustomServer()

  async createTrayMenu() {
    // Generate tray icon
    const icon = nativeImage.createFromPath(path.resolve(__dirname, './assets/icon.png'))
    this.tray = new Tray(icon)

    // Tray icon menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        type: 'normal',
        icon: icon.resize({ width: 16, height: 16 }),
        click: async () => {
          await shell.openExternal(`${environment.electron.url}:${this.server.port}/`)
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

      shell.openExternal(`${environment.electron.url}:${this.server.port}/`, {
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

  async boot() {
    try {
      this.loading = true
      console.log(`\x1b[35m[ELECTRON] - Init\x1b[0m`)

      await app.whenReady()

      await this.server.boot()

      await this.createTrayMenu()

      await this.showNotification('Dash IMU', 'Dashboard pronto para uso', path.resolve(__dirname, './assets/icon.png'))

      console.log(`\x1b[35m[ELECTRON] - Initialized\x1b[0m`)
      this.loaded = true
    } catch (e) {
      console.log(e)
      await this.showNotification('Error ao carregar app', '', path.resolve(__dirname, './assets/icon.png'))
      await app.quit()
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
