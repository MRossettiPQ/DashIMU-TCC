const RegisterValidation = require('../src/core/Middleware/RegisterValidation.js')
const SessionController = require('../src/app/Session/Controllers/SessionController.js')
const AuthenticationController = require('../src/app/User/Controllers/AuthenticationController.js')
const WebSocketController = require('../src/app/WebSocket/Controllers/WebSocketController.js')
const TesteController = require('../src/app/Session/Controllers/TesteController.js')
const { AsyncHandler, AsyncHandlers } = require('../src/core/Utils/RequestUtil')

module.exports = (app) => {
  // TODO Authentication
  app.post(
    '/api/auth/register',
    AsyncHandlers([RegisterValidation.verifyUserEmailDuplicate], true),
    AsyncHandler(AuthenticationController.register)
  )
  app.post('/api/auth/login', AsyncHandler(AuthenticationController.login))
  app.post(
    '/api/auth/context',
    AsyncHandler(AuthenticationController.getUserContext)
  )

  // TODO Metadata - list sensors and metadata socket
  app.get('/api/session/metadata', AsyncHandler(SessionController.getMetadata))
  app.get(
    '/api/websocket/metadata',
    AsyncHandler(WebSocketController.getMetadata)
  )
  app.get(
    '/api/websocket/list',
    AsyncHandler(WebSocketController.getSensorList)
  )

  app.get(
    '/api/websocket/teste',
    AsyncHandler(TesteController.getSessionListTeste)
  )
}
