const WebSocketController = require('../app/WebSocket/Controllers/WebSocketController.js')

module.exports = (app, expressWs) => {
  // TODO WebSocket
  app.ws('/socket', WebSocketController.sensorConnection(expressWs))
}
