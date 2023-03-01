const SocketRoutes = require('./SocketRoutes.js')
const PrivateRoutes = require('./PrivateRoutes.js')
const PublicRoutes = require('./PublicRoutes.js')
const header = require('./header')
const dayjs = require('dayjs')
const { SpaResolver } = require('../src/core/Utils/RequestUtil')
const environment = require('../environment')

module.exports = (app, expressWs) => {
  SocketRoutes(app, expressWs)

  if (environment.development) {
    // TODO ping
    app.get('/ping', (req, res) => {
      res.json({
        message: `Server online, current time: ${dayjs()}`,
      })
    })
  }

  // TODO redirect to page in spa or api
  if (!environment.just_api) {
    app.use(SpaResolver)
  }

  // TODO redirect to page in spa or api
  app.use((req, res, next) => {
    const toApi = req.originalUrl.includes('/api')
    if (toApi) {
      next()
    } else {
      res.redirect(`/#${req.originalUrl}`)
    }
  })

  // TODO header
  app.use(header)

  PublicRoutes(app)

  PrivateRoutes(app)
}
