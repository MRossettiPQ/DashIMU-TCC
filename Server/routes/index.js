const SocketRoutes = require('./SocketRoutes.js')
const PrivateRoutes = require('./PrivateRoutes.js')
const PublicRoutes = require('./PublicRoutes.js')
const DevelopmentRoutes = require('./DevelopmentRoutes.js')
const header = require('./header')
const { SpaResolver } = require('../src/core/Utils/RequestUtil')
const environment = require('../environment')

module.exports = (app, expressWs) => {
  SocketRoutes(app, expressWs)

  if (environment.development) {
    DevelopmentRoutes(app)
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
