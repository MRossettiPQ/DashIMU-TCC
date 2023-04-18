import { Instance as ExpressWebSocket } from "express-ws";
import { ExpressWs } from "../CustomServer";
import WebSocketController from "../app/WebSocket/Controllers/WebSocketController";

function SocketRoutes(app: ExpressWs, expressWs: ExpressWebSocket): void {
  // TODO WebSocket
  app.ws("/socket", WebSocketController.sensorConnection(expressWs));
}

export { SocketRoutes };
