const SessionController = require('../app/Session/Controllers/SessionController.js')
const AuthenticationController = require('../app/User/Controllers/AuthenticationController.js')
const WebSocketController = require('../app/WebSocket/Controllers/WebSocketController.js')
const { AsyncHandler, AsyncMiddlewares } = require('../core/Utils/RequestUtil')
const { VerifyUserEmailDuplicate } = require('../core/Middleware/RegisterValidation')

module.exports = (app) => {
  // TODO Authentication
  app.post('/api/auth/register', AsyncMiddlewares([VerifyUserEmailDuplicate]), AsyncHandler(AuthenticationController.register))
  app.post('/api/auth/login', AsyncHandler(AuthenticationController.login))
  app.post('/api/auth/context', AsyncHandler(AuthenticationController.getUserContext))

  // TODO Metadata - list sensors and metadata socket
  app.get('/api/session/metadata', AsyncHandler(SessionController.getMetadata))
  app.get('/api/websocket/metadata', AsyncHandler(WebSocketController.getMetadata))
  app.get('/api/websocket/list', AsyncHandler(WebSocketController.getSensorList))
}
