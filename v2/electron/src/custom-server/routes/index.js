const SocketRoutes = require('./SocketRoutes.js')
const PrivateRoutes = require('./PrivateRoutes.js')
const PublicRoutes = require('./PublicRoutes.js')
const DevelopmentRoutes = require('./DevelopmentRoutes.js')
const Header = require('./Header')
const { SpaResolver } = require('../core/utils/RequestUtil')
const { settings } = require('../settings')

module.exports = (app, io) => {
  SocketRoutes(app, io)

  if (settings.development) {
    DevelopmentRoutes(app)
  }

  // TODO header
  app.use(Header)

  // TODO redirect to page in spa or api
  if (!settings.just_api) {
    app.use(SpaResolver)
  }

  PublicRoutes(app)

  PrivateRoutes(app)
}
