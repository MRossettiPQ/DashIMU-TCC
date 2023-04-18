import express, { Express, Errback } from "express";
import { Database, CustomDatabase } from "./core/database";
import { i18n, translate } from "./core/utils/i18nUtil";
import { logColor } from "./core/utils/LogUtil";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import enableWs, { Instance as ExpressWebSocket } from "express-ws";
import environment from "./environment";

export interface ExpressWs extends Express {
  ws?: any;
}

class CustomServer {
  started = false;
  loading = false;
  app?: ExpressWs;
  lang: string;
  database: CustomDatabase = Database;
  expressWs?: ExpressWebSocket;

  constructor(lang = "pt-br") {
    this.lang = lang;
  }

  async boot(): Promise<void | Error> {
    try {
      this.loading = true;

      // Set locale
      await i18n.setLocale(this.lang);

      logColor("SERVER", translate("main.init"), "fg.blue");
      await Database.loadModels();

      // Only after models are loaded
      logColor("SERVER", translate("main.load_routes"));
      const { routes } = await import("./routes");

      // Instance express
      this.app = express();

      // Internationalization
      this.app.use(i18n.init);

      // Database initialization
      await Database.initDataBase();

      // Cors rules
      this.app.use(cors());

      // Folder containing the SPA project after the build is performed
      this.app.use(express.static(__dirname + "/public"));

      // Parse requests of content-type - application/json
      this.app.use(bodyParser.json({ limit: "50mb" }));

      // Parse requests of content-type - application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({ extended: true }));

      // Active web-socket on app express
      this.expressWs = enableWs(this.app);

      // Morgan logging
      this.app.use(morgan("combined"));

      // Routes
      routes(this.app, this.expressWs);

      // Listen server in port
      await this.listen();
      logColor("SERVER", `${translate("main.initialized")} ${environment.host.port}`, "fg.blue");

      this.started = true;
    } catch (e: any) {
      if (e as Errback) {
        logColor("SERVER", translate("main.express"), "fg.red");
      }
      throw Error(e.code || translate("main.error"));
    } finally {
      this.loading = false;
    }
  }

  async listen() {
    return new Promise((resolve, reject) => {
      if (!this.app) {
        return reject();
      }

      const server = this.app.listen(environment.host.port);
      process.once("uncaughtException", reject);
      server.once("error", reject);
      server.once("listening", resolve);
    });
  }

  async close(): Promise<void> {
    // return this.app.close();
  }
}

export { CustomServer, CustomServer as default };
