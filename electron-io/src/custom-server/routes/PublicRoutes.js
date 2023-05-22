const SessionController = require('../app/session/controllers/SessionController.js')
const AuthenticationController = require('../app/user/controllers/AuthenticationController.js')
const WebSocketController = require('../app/websocket/controllers/WebSocketController.js')
const { AsyncHandler, AsyncMiddlewares } = require('../core/utils/RequestUtil')
const { VerifyUserEmailDuplicate } = require('../core/middleware/RegisterValidation')

module.exports = (app) => {
  // TODO Authentication
  app.post('/api/auth/register', AsyncMiddlewares([VerifyUserEmailDuplicate]), AsyncHandler(AuthenticationController.register))
  app.post('/api/auth/login', AsyncHandler(AuthenticationController.login))
  app.post('/api/auth/context', AsyncHandler(AuthenticationController.context))

  // TODO Metadata - list sensors and metadata socket
  app.get('/api/session/metadata', AsyncHandler(SessionController.metadata))
  app.get('/api/websocket/metadata', AsyncHandler(WebSocketController.metadata))
  app.get('/api/websocket/list', AsyncHandler(WebSocketController.listSensor))
}
