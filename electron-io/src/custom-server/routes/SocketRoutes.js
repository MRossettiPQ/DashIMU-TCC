const WebSocketController = require('../app/websocket/controllers/WebSocketController.js')

module.exports = (app, io) => {
  // TODO WebSocket
  WebSocketController.sensorConnectionIo(io)
  // app.ws('/socket', WebSocketController.sensorConnection(io))
}
