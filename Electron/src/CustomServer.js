const express = require('express')
const enableWs = require('express-ws')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const environment = require('../environment')
const { translate, i18n } = require('./core/Utils/i18nUtil')
const { logColor } = require('./core/Utils/LogUtil')
const Database = require('./core/DataBase')

class CustomServer {
  app
  lang
  database = Database
  started = false
  loading = false
  expressWs = null
  port

  constructor(lang = 'pt-br') {
    this.lang = lang
  }

  async boot() {
    try {
      this.loading = true
      // Set locale
      await i18n.setLocale(this.lang)

      logColor('SERVER', translate('main.init'), 'fg.blue')
      await Database.loadModels()

      // Only after models are loaded
      logColor('SERVER', translate('main.load_routes'))
      const routes = require('./routes')

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
      this.expressWs = enableWs(this.app)

      // Morgan logging
      this.app.use(morgan('combined'))

      // Routes
      routes(this.app, this.expressWs)

      this.port = environment.host.port
      // Listen server in port
      await this.app.listen(this.port)
      logColor('SERVER', `${translate('main.initialized')} ${environment.host.port}`, 'fg.blue')
      this.started = true
    } catch (e) {
      logColor('SERVER', translate('main.error'), 'fg.red')
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  async close() {
    return this.app.close()
  }
}

module.exports = {
  CustomServer: CustomServer,
}
