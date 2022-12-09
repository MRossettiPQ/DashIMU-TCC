const RegisterValidation = require('../src/core/Middleware/RegisterValidation.js')
const SessionController = require('../src/app/Session/Controllers/SessionController.js')
const AuthenticationController = require('../src/app/User/Controllers/AuthenticationController.js')
const WebSocketController = require('../src/app/WebSocket/Controllers/WebSocketController.js')
const TesteController = require('../src/app/Session/Controllers/TesteController.js')

module.exports = (app) => {
  // TODO Authentication
  app.post(
    '/api/auth/register',
    [RegisterValidation.verifyUserEmailDuplicate],
    AuthenticationController.register
  )
  app.post('/api/auth/login', AuthenticationController.login)
  app.get('/api/auth/context', AuthenticationController.getUserContext)

  // TODO Metadata - list sensors and metadata socket
  app.get('/api/session/metadata', SessionController.getMetadata)
  app.get('/api/websocket/metadata', WebSocketController.getMetadata)
  app.get('/api/websocket/list', WebSocketController.getSensorList)

  app.get('/api/websocket/teste', TesteController.getSessionListTeste)
}
