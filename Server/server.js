const express = require('express')
const enableWs = require('express-ws')
const bodyParser = require('body-parser')
const cors = require('cors')
const environment = require('./environment')
const { initDataBase } = require('./src/core/DataBase')
const routes = require('./routes')

module.exports = (async () => {
  try {
    const app = express()

    // Database initialization
    await initDataBase()

    // Cors rules
    app.use(cors())

    // Folder containing the SPA project after the build is performed
    app.use(express.static('public'))

    // Parse requests of content-type - application/json
    app.use(bodyParser.json())

    // Parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))

    // Active web-socket on app express
    enableWs(app)

    // Morgan logging
    //app.use(morgan('combined'))

    // Routes
    routes(app)

    // Set port, listen for requests
    app.listen(environment.host.port, () =>
      console.log(
        `[SERVER] - Server está rodando na Port: ${environment.host.port}`
      )
    )
  } catch (e) {
    console.log('[SERVER] - Error occurred in server')
    console.log(e)
  }
})()
