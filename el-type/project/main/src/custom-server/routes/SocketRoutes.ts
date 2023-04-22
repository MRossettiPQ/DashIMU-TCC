import type { Instance as ExpressWebSocket } from 'express-ws';
import type { ExpressWs } from '/@/custom-server';
import WebSocketController from '/@/custom-server/app/websocket/controllers/WebSocketController';

function SocketRoutes(app: ExpressWs, expressWs: ExpressWebSocket): void {
  // TODO WebSocket
  app.ws('/socket', WebSocketController.sensorConnection(expressWs));
}

export { SocketRoutes };
