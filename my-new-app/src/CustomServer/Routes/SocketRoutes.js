const WebSocketController = require("../app/WebSocket/Controllers/WebSocketController.js");

function SocketRoutes(app, expressWs) {
  // TODO WebSocket
  app.ws("/socket", WebSocketController.sensorConnection(expressWs));
}

module.exports = { SocketRoutes };
