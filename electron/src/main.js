const { app, BrowserWindow, Tray, Menu, nativeImage, shell } = require("electron");
const { CustomServer } = require("./CustomServer");
const environment = require("./CustomServer/Environment");
const packageFile = require("../package.json");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

class AppElectron {
  server;
  tray;

  async boot() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", this.generateWindow);

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", async () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        await this.generateWindow();
      }
    });
    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and import them here.
  }

  async generateWindow() {
    this.server = new CustomServer();
    await this.server.boot();

    await this.createTrayMenu();

    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        nodeIntegration: true,
      },
    });

    // and load the index.html of the app.
    await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    await this.showNotification(packageFile.productName, "Pronto para uso", path.resolve(__dirname, "./CustomServer/Assets/icon.png"));
  }

  async showNotification(title, body, icon) {
    const notification = new Notification({
      title,
      body,
      icon,
    });

    notification.on("click", this.open);

    notification.show();
  }

  async open(event) {
    event?.preventDefault();
    await shell.openExternal(`${environment.electron.url}:${this.server.port}/`);
  }

  async createTrayMenu() {
    // Generate tray icon
    const icon = nativeImage.createFromPath(path.resolve(__dirname, "./CustomServer/Assets/icon.png"));
    this.tray = new Tray(icon);

    // Tray icon menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Open",
        type: "normal",
        icon: icon.resize({ width: 16, height: 16 }),
        click: () => this.open(),
      },
      {
        type: "separator",
      },
      {
        label: "Close",
        type: "normal",
        click: async () => {
          // Close app
          await app.quit();
        },
      },
    ]);

    this.tray.setContextMenu(contextMenu);
    this.tray.setToolTip(packageFile.productName);
    this.tray.setTitle(packageFile.productName);
  }
}

(async () => {
  const el = new AppElectron();
  await el.boot();
})();
