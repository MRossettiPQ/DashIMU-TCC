const express = require('express')
const enableWs = require('express-ws')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const environment = require('./environment')
const { i18n } = require('./src/core/Utils/i18nUtil')
const { logColor } = require('./src/core/Utils/LogUtil')
const Database = require('./src/core/database')
let expressWs = null

class RServer {
  app

  lang

  constructor(lang = 'pt-br') {
    this.lang = lang
  }

  async init() {
    try {
      logColor('SERVER', i18n.__('main.init'), 'fg.blue')
      await Database.loadModels()

      // Only after models are loaded
      logColor('SERVER', i18n.__('main.load_routes'))
      const routes = require('./routes')

      // Set locale
      i18n.setLocale(this.lang)

      // Instance express
      this.app = express()

      // Internationalization
      this.app.use(i18n.init)

      // Database initialization
      await Database.initDataBase()

      // Cors rules
      this.app.use(cors())

      // Folder containing the SPA project after the build is performed
      this.app.use(express.static(__dirname + '/public'))

      // Parse requests of content-type - application/json
      this.app.use(bodyParser.json({ limit: '50mb' }))

      // Parse requests of content-type - application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({ extended: true }))

      // Active web-socket on app express
      expressWs = enableWs(this.app)

      // Morgan logging
      this.app.use(morgan('combined'))

      // Routes
      routes(this.app, expressWs)

      // Listen server in port
      await this.app.listen(environment.host.port)
      logColor(
        'SERVER',
        `${i18n.__('main.initialized')} ${environment.host.port}`,
        'fg.blue'
      )
    } catch (e) {
      logColor('SERVER', i18n.__('main.error'), 'fg.red')
      console.log(e)
    }
  }
}

module.exports = {
  RServer: RServer,
}
