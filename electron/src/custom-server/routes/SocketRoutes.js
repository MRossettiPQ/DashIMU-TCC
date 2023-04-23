const WebSocketController = require('../app/websocket/controllers/WebSocketController.js')

module.exports = (app, expressWs) => {
  // TODO WebSocket
  app.ws('/socket', WebSocketController.sensorConnection(expressWs))
}
