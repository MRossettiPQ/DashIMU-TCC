const { Sequelize } = require('sequelize')
const { settings } = require('../../settings')
const { logColor } = require('../utils/LogUtil')
const { glob } = require('glob')
const { resolve } = require('path')
const { throwError } = require('../utils/RequestUtil')
const { translate } = require('../utils/i18nUtil')

module.exports = new (class CustomDatabase {
  // TODO Database connection using Sequelize - configure in environment
  sequelize
  sqlite
  models = {}

  constructor() {
    this.sequelize = new Sequelize({
      ...settings.database.sequelize[settings.database.dialect],
      dialect: settings.database.dialect,
      logging: (logMessage) => logColor('SEQUELIZE:LOG', logMessage),
    })
  }

  async initDataBase() {
    try {
      // Init and sync sequelize
      // TODO - { force : false } option to drop the data from the database -> if true it will delete the entire database at each startup
      await this.sequelize?.sync({ alter: settings.database.syncOptions.alter, force: settings.database.syncOptions.wipe_on_start })
      logColor('SERVER:DATABASE', translate('database.rsync'))
    } catch (e) {
      logColor('SERVER:DATABASE', translate('database.rsync_error'), 'fg.red')
      throw Error(e.toString())
    }
  }

  async loadModels() {
    if (!settings.database.dialect || !settings.database.sequelize?.[settings.database.dialect]) {
      return throwError({
        local: 'SERVER:SEQUELIZE:MODELS-ERROR',
        message: 'Dialect não foi descrito no .env',
        log: 'Dialect não foi descrito no .env',
      })
    }

    logColor('SERVER:SEQUELIZE', translate('sequelize.load_models'))
    const modelsPath = await glob('./src/custom-server/app/**/models/**.js')
    for (const filePath of modelsPath) {
      const model = await require(resolve(filePath))
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
