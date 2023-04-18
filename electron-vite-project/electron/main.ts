// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

process.env.DIST = join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, "../public");

import { join } from "path";
import { app, BrowserWindow, Tray, nativeImage, shell, Menu, Notification, App } from "electron";
import { CustomServer } from "./custom-server/CustomServer";
import environment from "./custom-server/environment";

let win: BrowserWindow | null;
// Here, you can also use other preload
const preload = join(__dirname, "./preload.js");
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const url = process.env["VITE_DEV_SERVER_URL"];

class AppElectron {
  app?: App;
  loaded = false;
  loading = false;
  tray?: Tray;
  server = new CustomServer();

  async createTrayMenu(): Promise<void> {
    const icon = nativeImage.createFromPath(join(__dirname, "../public/icon.png"));
    this.tray = new Tray(icon);

    // Tray icon menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Open",
        type: "normal",
        icon: icon.resize({ width: 16, height: 16 }),
        click: async () => this.clickNotification(),
      },
      {
        type: "separator",
      },
      {
        label: "Close",
        type: "normal",
        click: this.close,
      },
    ]);

    this.tray.setContextMenu(contextMenu);
    this.tray.setToolTip(environment.productName + (environment.env === "development" ? `- ${environment.env}` : ""));
    this.tray.setTitle(environment.productName);
  }

  async clickNotification(event?: Event) {
    event!?.preventDefault();
    console.log("clickNotification", `${environment.electron.url}:${environment.host.port}/`);
    await shell.openExternal(`${environment.electron.url}:${environment.host.port}/`);
  }

  async showNotification(title: string, body: string, icon: string) {
    const notification = new Notification({
      title,
      body,
      icon,
    });
    notification.on("click", this.clickNotification);
    notification.show();
  }

  async createWindow() {
    win = new BrowserWindow({
      icon: join(process.env.PUBLIC, "icon.png"),
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        preload,
      },
    });

    // Test active push message to Renderer-process.
    win.webContents.on("did-finish-load", () => {
      win?.webContents.send("main-process-message", new Date().toLocaleString());
    });

    if (url) {
      await win.loadURL(url);
    } else {
      // win.loadFile('dist/index.html')
      await win.loadFile(join(process.env.DIST, "index.html"));
    }
  }

  async onReady() {
    // cria uma janela (apenas em dev será usada)
    await this.createWindow();

    // Adiciona o tray menu ao sistema
    await this.createTrayMenu();

    // Notifica o sistema
    await this.showNotification("Dash IMU", "Dashboard pronto para uso", join(__dirname, "../public/icon.ico"));
  }

  async boot(): Promise<void> {
    try {
      this.loading = true;
      console.log("\x1b[35m[ELECTRON] - Init\x1b[0m");

      app.on("window-all-closed", () => {
        win = null;
      });

      // Inicializa o server
      await this.server.boot();

      // Aguarda o electron estar preparado
      await app.whenReady();

      // Gerar window e tray menu
      await this.onReady();
      // app.on("ready", this.onReady);

      console.log("\x1b[35m[ELECTRON] - Initialized\x1b[0m");
      this.loaded = true;
    } catch (e) {
      console.log("\x1b[31m[ELECTRON] - Error\x1b[0m");
      console.log(e);
      process.exit(0);
    } finally {
      this.loading = true;
    }
  }

  async close(): Promise<void> {
    await app.quit();
  }
}

(async () => {
  const appElectron = new AppElectron();
  await appElectron.boot();
})();
