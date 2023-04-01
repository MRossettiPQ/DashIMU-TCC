const SocketRoutes = require('./SocketRoutes.js')
const PrivateRoutes = require('./PrivateRoutes.js')
const PublicRoutes = require('./PublicRoutes.js')
const header = require('./header')
const dayjs = require('dayjs')
const { SpaResolver, AsyncHandler } = require('../src/core/Utils/RequestUtil')
const environment = require('../environment')
const DevController = require('../src/app/Dev/Controllers/DevController')

module.exports = (app, expressWs) => {
  SocketRoutes(app, expressWs)

  if (environment.development) {
    // TODO ping
    app.get('/ping', (req, res) => {
      res.json({
        message: `Server online, current time: ${dayjs()}`,
      })
    })
    app.get('/ddl', AsyncHandler(DevController.alterTable))
    app.get('/testpagination', AsyncHandler(DevController.testPagination))
  }

  // TODO redirect to page in spa or api
  if (!environment.just_api) {
    app.use(SpaResolver)
  }

  // TODO header
  app.use(header)

  PublicRoutes(app)

  PrivateRoutes(app)
}
