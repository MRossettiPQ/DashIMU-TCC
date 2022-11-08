const WebSocketController = require('../src/app/WebSocket/Controllers/WebSocketController.js')

module.exports = (app) => {
  // TODO WebSocket
  app.ws('/socket', WebSocketController.sensorConnection)
}
