import { DataTypes, ModelStatic, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, Model, OrderItem } from "sequelize";
// import mysql, { Pool, QueryError } from "mysql2";
import sqlite3 from "sqlite3";
import path from "path";
import { glob } from "glob";
import environment from "../../environment";
import { translate } from "../utils/i18nUtil";
import { logColor } from "../utils/LogUtil";
import { throwError } from "../utils/RequestUtil";

export interface CustomModelStatic extends ModelStatic<any> {
  // Extensão com função que gera as associações entre as entidades
  associate?: any;
}

export interface LoadedCustomModels {
  // Todos os modelos carregados no projeto
  [key: string]: CustomModelStatic;
}

// class SQLite {}
//
// class MariaMySQL {
//   async createDatabase(pool: Pool) {
//     const sql = `CREATE DATABASE IF NOT EXISTS ${environment.database.sequelize.maria_mysql.database};`;
//     return await this.asyncQuerySQL(pool, sql);
//   }
//
//   async checkDatabaseIfExists(pool: Pool) {
//     const sql = `SHOW DATABASES LIKE "${environment.database.sequelize.maria_mysql.database}"`;
//     return await this.asyncQuerySQL(pool, sql);
//   }
//
//   async createDatabaseIfNotExists() {
//     const pool = mysql.createPool({
//       host: environment.database.sequelize.maria_mysql.host,
//       port: environment.database.sequelize.maria_mysql.port,
//       user: environment.database.sequelize.maria_mysql.username,
//       password: environment.database.sequelize.maria_mysql.password,
//     });
//     await this.checkDatabaseIfExists(pool);
//     await this.createDatabase(pool);
//     await pool.end();
//   }
//
//   asyncQuerySQL(pool: Pool, sql: string) {
//     logColor("SERVER:DATABASE:SQL", sql);
//     return new Promise((resolve, reject) => {
//       pool.query(sql, (err: QueryError, result: any) => {
//         if (err != null) {
//           logColor("SERVER:DATABASE:SQL:ERROR", err?.toString(), "fg.red");
//           return reject(err);
//         }
//         if (result) {
//           //console.log('[DATABASE:SQL:RESULT] - ', result)
//           return resolve(result);
//         }
//       });
//     });
//   }
// }

class CustomDatabase {
  // TODO Database connection using Sequelize - configure in environment
  sequelize: Sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, `${environment.database.sequelize.sqlite.storage}.sqlite`),
    logging: (logMessage) => logColor("SEQUELIZE:LOG", logMessage, "fg.magenta"),
    benchmark: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 900000,
      idle: 100000,
    },
  });

  // mariaMysql?: MariaMySQL;
  // sqlite?: SQLite;
  models: LoadedCustomModels = {};

  constructor() {
    // switch (environment.database.dialect) {
    //   case "mysql":
    //   case "mariadb":
    //     this.sequelize = new Sequelize({
    //       ...environment.database.sequelize.maria_mysql,
    //       logging: (logMessage) => logColor("SEQUELIZE:LOG", logMessage),
    //     });
    //     break;
    //   case "sqlite":
    //     this.sequelize = new Sequelize({
    //       ...environment.database.sequelize.sqlite,
    //       storage: path.join(__dirname, `${environment.database.sequelize.sqlite.storage}.sqlite`),
    //       logging: (logMessage) => logColor("SEQUELIZE:LOG", logMessage, "fg.magenta"),
    //     });
    //     break;
    //   default:
    //     break;
    // }
  }

  initDataBase() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = new sqlite3.Database(`${environment.database.sequelize.sqlite.storage}.sqlite`);
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
        // TODO - { force : false } option to drop the data from the database -> if true it will delete the entire database at each startup
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
    // Exemplo:  import User from "../../app/User/Models/User";
    const modelsPath: string[] = await glob("./src/app/**/Models/**.ts");
    for (const filePath of modelsPath) {
      const { default: model } = await import(path.resolve(filePath));
      // Load model
      const Model: CustomModelStatic = model(this.sequelize);
      Object.assign(this.models, { [model.name]: Model });
      Object.assign(this, { [model.name]: Model });
      logColor("SERVER:SEQUELIZE:MODELS", model.name);
    }

    type ModelsKeys = keyof typeof this.models;
    // Find all associations, Model by Model
    for (const modelName of Object.keys(this.models)) {
      // Verifica se existe initialOptions para o service e realiza o merge deles
      const optKey = modelName as ModelsKeys;
      if (optKey) {
        const customModel: CustomModelStatic = this.models[optKey];
        if (typeof customModel?.associate === "function") {
          this.models[optKey] = customModel?.associate(this.models);
        }
      }
    }
  }
}

const Database: CustomDatabase = new CustomDatabase();

// TODO DataTypes, Sequelize, CreationOptional, InferAttributes, InferCreationAttributes, Model são exports diretos do mesmos elementos do SEQUELIZE
export { Database as default, Database, CustomDatabase, DataTypes, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes, type OrderItem, Model };
