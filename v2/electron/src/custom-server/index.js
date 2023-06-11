const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const { settings } = require('./settings')
const { translate, i18n } = require('./core/utils/i18nUtil')
const { logColor, logMiddleware } = require('./core/utils/LogUtil')
const Database = require('./core/database')

class CustomServer {
  app = null
  io = null
  http = null
  lang
  database = Database
  started = false
  port = 8000
  loading = false

  constructor(lang = 'pt-br') {
    this.lang = lang
  }

  async boot() {
    try {
      this.loading = true
      // Set locale
      await i18n.setLocale(this.lang)

      logColor('SERVER', translate('main.init'), 'fg.blue')
      await this.database.loadModels()

      // Only after models are loaded
      logColor('SERVER', translate('main.load_routes'))
      const routes = require('./routes')

      // Instance express
      this.app = express()
      this.http = http.createServer(this.app)
      // Set socket.io server
      this.io = new Server(this.http, {
        path: '/socket/',
        cors: settings.host.cors,
      })

      // Internationalization
      this.app.use(i18n.init)

      // Database initialization
      await this.database.initDataBase()

      // Cors rules
      this.app.use(cors())

      // Folder containing the SPA project after the build is performed
      this.app.use(express.static(__dirname + '/public'))

      // Parse requests of content-type - application/json
      this.app.use(bodyParser.json({ limit: '50mb' }))

      // Parse requests of content-type - application/x-www-form-urlencoded
      this.app.use(bodyParser.urlencoded({ extended: true }))

      // Morgan logging
      this.app.use(morgan(logMiddleware))

      // Routes
      routes(this.app, this.io)

      // Listen server in port
      await this.listen()
      logColor('SERVER', `${translate('main.initialized')} ${settings.host.port}`, 'fg.blue')
      this.started = true
    } catch (e) {
      logColor('SERVER', translate('main.error'), 'fg.red')
      console.log(e)
      throw Error('Erro no server' + e.toString())
    } finally {
      this.loading = false
    }
  }

  async close() {
    // return this.app.close();
  }

  async listen() {
    return new Promise((resolve, reject) => {
      if (!this.http) {
        return reject()
      }

      const server = this.http.listen(settings.host.port)
      process.once('uncaughtException', reject)
      server.once('error', reject)
      server.once('listening', resolve)
    })
  }
}

module.exports = {
  CustomServer,
}
