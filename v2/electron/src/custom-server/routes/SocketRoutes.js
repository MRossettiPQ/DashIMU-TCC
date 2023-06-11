const WebSocketController = require('../app/websocket/controllers/WebSocketController.js')

module.exports = (app, io) => {
  // TODO WebSocket
  WebSocketController.sensorConnectionClass(io)
}
