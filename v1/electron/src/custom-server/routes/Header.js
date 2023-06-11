const { settings } = require('../settings')
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', settings.host.cors.origin)
  res.header('Access-Control-Allow-Methods', settings.host.cors.methods.join(','))
  res.header('Access-Control-Allow-Headers', settings.host.cors.allowedHeaders.join(','))
  next()
}
