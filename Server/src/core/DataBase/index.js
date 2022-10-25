const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2')
const environment = require('../../../environment')
const { i18n } = require('../Utils/i18nUtil')

// Declare all models in project
const models = {}
// TODO Database connection using Sequelize - configure via environment
const sequelize = new Sequelize(
  environment.database.name,
  environment.database.user,
  environment.database.password,
  {
    host: environment.database.host,
    port: environment.database.port,
    dialect: environment.database.dialect,
    logging: environment.database.logging,
    pool: {
      max: environment.database.pool.max,
      min: environment.database.pool.min,
      acquire: environment.database.pool.acquire,
      idle: environment.database.pool.idle,
    },
  }
)

const createDatabaseIfNotExists = async () => {
  const pool = mysql.createPool({
    host: environment.database.host,
    port: environment.database.port,
    user: environment.database.user,
    password: environment.database.password,
  })
  pool.query(
    `SHOW DATABASES LIKE "${environment.database.name}"`,
    (err, result) => {
      if (!result.length) {
        pool.query(
          `CREATE DATABASE IF NOT EXISTS \`${environment.database.name}\`;`,
          (err, result) => {
            if (err != null) {
              console.error(
                '\x1b[31m',
                `[DATABASE] - ${i18n.__('database.error')}`,
                '\x1b[0m'
              )
              pool.end()
            }
            if (result != null) {
              console.log(`[DATABASE] - ${i18n.__('database.init')}`)
              pool.end()
            }
          }
        )
      }
    }
  )
}

const initDataBase = async () => {
  try {
    await createDatabaseIfNotExists()
    // TODO - { force : false } option to drop the data from the database -> if true it will delete the entire database at each startup
    await sequelize.sync({ force: environment.database.wipe_on_start })
    // console.log(sequelize)
    console.log(`[DATABASE] - ${i18n.__('database.rsync')}`)
  } catch (e) {
    console.error(
      `\x1b[31m[DATABASE] - ${i18n.__('database.rsync_error')}\x1b[0m`
    )
  }
}

function loadModels() {
  const appPath = path.resolve(__dirname, '..\\..\\app')

  fs.readdirSync(appPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const modelsPath = appPath + '\\' + dirent.name + '\\Models'
      const exist = fs.existsSync(modelsPath)
      if (exist) {
        fs.readdirSync(modelsPath)
          .filter((file) => {
            return (
              file.indexOf('.') !== 0 &&
              file !== appPath &&
              file.slice(-3) === '.js'
            )
          })
          .map((file) => {
            const model = require(path.join(modelsPath, file))
            const modelName = file.substring(0, file.indexOf('.js'))
            models[modelName] = model(sequelize, Sequelize)
          })
      }
    })
  // Find all associations, Model by Model
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models)
    }
  })
}

loadModels()

module.exports = {
  initDataBase,
  loadModels,
  Sequelize,
  sequelize,
  ...models,
}
