import type { Express } from 'express';
import { AsyncHandler, AsyncMiddlewares } from '../core/utils/RequestUtil';
import { VerifyUserEmailDuplicate } from '../core/middleware/RegisterValidation';
import AuthenticationController from '../app/user/controllers/AuthenticationController';
import SessionController from '../app/session/controllers/SessionController';
import WebSocketController from '../app/websocket/controllers/WebSocketController';

function PublicRoutes(app: Express): void {
  // TODO Authentication
  app.post(
    '/api/auth/register',
    AsyncMiddlewares([VerifyUserEmailDuplicate]),
    AsyncHandler(AuthenticationController.register),
  );
  app.post('/api/auth/login', AsyncHandler(AuthenticationController.login));
  app.post('/api/auth/context', AsyncHandler(AuthenticationController.getUserContext));

  // TODO Metadata - list sensors and metadata socket
  app.get('/api/session/metadata', AsyncHandler(SessionController.metadata));
  app.get('/api/websocket/metadata', AsyncHandler(WebSocketController.metadata));
  app.get('/api/websocket/list', AsyncHandler(WebSocketController.sensorList));
}

export { PublicRoutes };
