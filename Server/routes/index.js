const SocketRoutes = require('./SocketRoutes.js')
const PrivateRoutes = require('./PrivateRoutes.js')
const PublicRoutes = require('./PublicRoutes.js')
const header = require('./header')
const dayjs = require('dayjs')

module.exports = (app, expressWs) => {
  SocketRoutes(app, expressWs)

  // TODO header
  app.use(header)

  // TODO ping
  app.get('/ping', (req, res) => {
    console.log(`[GET] - /ping - Ping`)
    res.json({ message: `Server online, current time: ${dayjs()}` })
  })

  PublicRoutes(app)

  PrivateRoutes(app)
}
