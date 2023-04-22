const path = require("path");
const { Sequelize } = require("sequelize");
const environment = require("../../Environment");
const { logColor } = require("../Utils/LogUtil");
const { translate } = require("../Utils/i18nUtil");
const { throwError } = require("../Utils/RequestUtil");
const { glob, sync } = require("glob");

class MariaMySQL {}

class CustomDatabase {
  sequelize;
  mariaMysql;
  sqlite;
  models = {};

  constructor() {
    switch (environment.database.dialect) {
      case "mysql":
      case "mariadb":
        this.sequelize = new Sequelize({
          ...environment.database.sequelize.maria_mysql,
          logging: (logMessage) => logColor("SEQUELIZE:LOG", logMessage),
        });
        break;
      case "sqlite":
        this.sequelize = new Sequelize({
          ...environment.database.sequelize.sqlite,
          storage: path.join(__dirname, environment.database.sequelize.sqlite.storage),
          logging: (logMessage) => logColor("SEQUELIZE:LOG", logMessage, "fg.magenta"),
        });
        break;
      default:
        break;
    }
  }

  initDataBase() {
    return new Promise(async (resolve, reject) => {
      try {
        // switch (environment.database.dialect) {
        //   case "mysql":
        //   case "mariadb":
        //     this.mariaMysql = new MariaMySQL();
        //     // Before init sequelize
        //     await this.mariaMysql.createDatabaseIfNotExists();
        //     break;
        //   default:
        //     break;
        // }

        // Init and sync sequelize
        // TODO - { force : false } option to drop the data = require(the database -> if true it will delete the entire database at each startup
        await this.sequelize?.sync({ alter: environment.database.syncOptions.alter, force: environment.database.syncOptions.wipe_on_start });
        logColor("SERVER:DATABASE", translate("database.rsync"));
        resolve(true);
      } catch (e) {
        logColor("SERVER:DATABASE", translate("database.rsync_error"), "fg.red");
        reject(e);
      }
    });
  }

  async loadModels() {
    if (!environment.database.dialect) {
      return throwError({
        local: "SERVER:SEQUELIZE:MODELS-ERROR",
        message: "Dialect não foi descrito no .env",
        log: "Dialect não foi descrito no .env",
      });
    }

    logColor("SERVER:SEQUELIZE", translate("sequelize.load_models"));
    // Exemplo:  import User = require("../../app/User/Models/User";
    const modelsPath = await glob("./src/CustomServer/App/**/Models/**.js", {});
    console.log(modelsPath);
    for (const filePath of modelsPath) {
      const model = await require(path.resolve(filePath));
      // Load model
      const Model = model(this.sequelize, Sequelize);
      Object.assign(this.models, { [model.name]: Model });
      Object.assign(this, { [model.name]: Model });
      logColor("SERVER:SEQUELIZE:MODELS", model.name);
    }

    // Find all associations, Model by Model
    for (const modelName of Object.keys(this.models)) {
      // Verifica se existe initialOptions para o service e realiza o merge deles
      const customModel = this.models[modelName];
      if (typeof customModel?.associate === "function") {
        this.models[modelName] = customModel?.associate(this.models);
      }
    }
  }
}

const Database = new CustomDatabase();

module.exports = { CustomDatabase, Database };
