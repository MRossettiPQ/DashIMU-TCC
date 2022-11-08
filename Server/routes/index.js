const SocketRoutes = require('./SocketRoutes.js')
const ExpressRoutes = require('./ExpressRoutes.js')
const header = require('./header')
const dayjs = require('dayjs')

module.exports = (app) => {
  SocketRoutes(app)

  // TODO ping
  app.get('/ping', (req, res) => {
    console.log(`[GET] - /ping - Ping`)
    res.json({ message: `Server online, current time: ${dayjs()}` })
  })

  // TODO header
  app.use(header)

  ExpressRoutes(app)
}
