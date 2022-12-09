const express = require('express')
const enableWs = require('express-ws')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const environment = require('./environment')
const { initDataBase } = require('./src/core/DataBase')
const routes = require('./routes')
const { i18n } = require('./src/core/Utils/i18nUtil')
const yargs = require('yargs')
  .alias('l', 'locale')
  .alias('f', 'filename')
  .alias('c', 'content')
  .demandOption('locale').argv
let expressWs = null

module.exports = (async () => {
  try {
    // Set locale
    i18n.setLocale(yargs.locale)

    // Instance express
    const app = express()

    // Internationalization
    app.use(i18n.init)

    // Database initialization
    await initDataBase()

    // Cors rules
    app.use(cors())

    // Folder containing the SPA project after the build is performed
    app.use(express.static('public'))

    // Parse requests of content-type - application/json
    app.use(bodyParser.json({ limit: '50mb' }))

    // Parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))

    // Active web-socket on app express
    expressWs = enableWs(app)

    // Morgan logging
    app.use(morgan('combined'))

    // Routes
    routes(app, expressWs)

    // Set port, listen for requests
    app.listen(environment.host.port, () =>
      console.log(
        `[SERVER] - ${i18n.__('main.initialized')} ${environment.host.port}`
      )
    )
  } catch (e) {
    console.log(`[SERVER] - ${i18n.__('main.error')}  `)
    console.log(e)
  }
})()
