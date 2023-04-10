const { Sequelize } = require('sequelize')
const path = require('path')
const mysql = require('mysql2')
const environment = require('../../../environment')
const { logColor } = require('../utils/LogUtil')
const { glob } = require('glob')
const { throwError } = require('../Utils/RequestUtil')
const { translate } = require('../Utils/i18nUtil')

class MariaMySQL {
  async createDatabase(pool) {
    const sql = `CREATE DATABASE IF NOT EXISTS ${environment.database.sequelize.maria_mysql.database};`
    return await this.asyncQuerySQL(pool, sql)
  }

  async checkDatabaseIfExists(pool) {
    const sql = `SHOW DATABASES LIKE "${environment.database.sequelize.maria_mysql.database}"`
    return await this.asyncQuerySQL(pool, sql)
  }

  async createDatabaseIfNotExists() {
    const pool = mysql.createPool({
      host: environment.database.sequelize.maria_mysql.host,
      port: environment.database.sequelize.maria_mysql.port,
      user: environment.database.sequelize.maria_mysql.username,
      password: environment.database.sequelize.maria_mysql.password,
    })
    await this.checkDatabaseIfExists(pool)
    await this.createDatabase(pool)
    await pool.end()
  }

  asyncQuerySQL(pool, sql) {
    logColor('SERVER:DATABASE:SQL', sql)
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err != null) {
          logColor('SERVER:DATABASE:SQL:ERROR', err?.toString(), 'fg.red')
          return reject(err)
        }
        if (result) {
          //console.log('[DATABASE:SQL:RESULT] - ', result)
          return resolve(result)
        }
      })
    })
  }
}

module.exports = new (class CustomDatabase {
  // TODO Database connection using Sequelize - configure in environment
  sequelize
  mariaMysql
  sqlite
  models = {}

  constructor() {
    switch (environment.database.dialect) {
      case 'mysql':
      case 'mariadb':
        this.sequelize = new Sequelize({
          ...environment.database.sequelize.maria_mysql,
          logging: (logMessage) => logColor('SEQUELIZE:LOG', logMessage),
        })
        break
      case 'sqlite':
        this.sequelize = new Sequelize({
          ...environment.database.sequelize.sqlite,
          storage: path.resolve(__dirname, `${environment.database.sequelize.sqlite.storage}.sqlite`),
          logging: (logMessage) => logColor('SEQUELIZE:LOG', logMessage, 'fg.magenta'),
        })
        break
      default:
        break
    }
  }

  initDataBase() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        switch (environment.database.dialect) {
          case 'mysql':
          case 'mariadb':
            this.mariaMysql = new MariaMySQL()
            // Before init sequelize
            await this.mariaMysql.createDatabaseIfNotExists()
            break
          default:
            break
        }

        // Init and sync sequelize
        // TODO - { force : false } option to drop the data from the database -> if true it will delete the entire database at each startup
        await this.sequelize?.sync({ alter: environment.database.syncOptions.alter, force: environment.database.syncOptions.wipe_on_start })
        logColor('SERVER:DATABASE', translate('database.rsync'))
        resolve(true)
      } catch (e) {
        logColor('SERVER:DATABASE', translate('database.rsync_error'), 'fg.red')
        reject(e)
      }
    })
  }

  async loadModels() {
    if (!environment.database.dialect) {
      return throwError({
        local: 'SERVER:SEQUELIZE:MODELS-ERROR',
        message: 'Dialect não foi descrito no .env',
        log: 'Dialect não foi descrito no .env',
      })
    }

    logColor('SERVER:SEQUELIZE', translate('sequelize.load_models'))
    // Exemplo:  import User from "../../app/User/Models/User";
    const modelsPath = await glob('./src/app/**/Models/**.js')
    for (const filePath of modelsPath) {
      const model = await require(path.resolve(filePath))
      // Load model
      const Model = model(this.sequelize, Sequelize)
      Object.assign(this.models, { [model.name]: Model })
      Object.assign(this, { [model.name]: Model })
      logColor('SERVER:SEQUELIZE:MODELS', model.name)
    }

    // Find all associations, Model by Model
    for (const modelName of Object.keys(this.models)) {
      // Verifica se existe initialOptions para o service e realiza o merge deles
      const customModel = this.models[modelName]
      if (typeof customModel?.associate === 'function') {
        this.models[modelName] = customModel?.associate(this.models)
      }
    }
  }
})()
