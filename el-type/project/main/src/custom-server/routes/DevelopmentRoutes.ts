import type { Express } from 'express';
import { AsyncHandler } from '../core/utils/RequestUtil';
import DevelopmentController from '../app/development/Controllers/DevelopmentController';

function DevelopmentRoutes(app: Express): void {
  // TODO development controllers
  // TODO ping
  app.get('/ping', AsyncHandler(DevelopmentController.ping));
  // app.get('/ddl', AsyncHandler(DevController.alterTable))
  app.get('/test_pagination', AsyncHandler(DevelopmentController.testPagination));
}

export { DevelopmentRoutes };
