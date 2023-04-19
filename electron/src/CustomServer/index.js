const { Database } = require("./Core/Database");
const { logColor } = require("./Core/Utils/LogUtil");
const { i18n, translate } = require("./Core/Utils/i18nUtil");
const express = require("express");
const enableWs = require("express-ws");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const environment = require("./Environment");

class CustomServer {
  lang;
  loading = false;
  started = false;
  database = Database;
  port = 8000;

  constructor(lang = "pt-br") {
    this.lang = lang;
  }

  async boot() {
    try {
      this.loading = true;
      // Set locale
      await i18n.setLocale(this.lang);

      logColor("SERVER", translate("main.init"), "fg.blue");
      await this.database.loadModels();

      // Only after models are loaded
      logColor("SERVER", translate("main.load_routes"));
      const { Routes } = require("./Routes");

      // Instance express
      this.app = express();

      // Internationalization
      this.app.use(i18n.init);

      // Database initialization
      await this.database.initDataBase();

      // Cors rules
      this.app.use(cors());

      // Folder containing the SPA project after the build is performed
      this.app.use(express.static(__dirname + "/Public"));

      // Parse requests of content-type - application/json
      this.app.use(bodyParser.json({ limit: "50mb" }));

      // Parse requests of content-type - application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({ extended: true }));

      // Active web-socket on app express
      this.expressWs = enableWs(this.app);

      // Morgan logging
      this.app.use(morgan(environment.morgan.format));

      console.log("Routes", Routes);
      // Routes
      Routes(this.app, this.expressWs);

      // Listen server in port
      await this.listen();
      logColor("SERVER", `${translate("main.initialized")} ${environment.host.port}`, "fg.blue");

      this.started = true;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  async close() {
    // return this.app.close();
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
}

module.exports = { CustomServer };
