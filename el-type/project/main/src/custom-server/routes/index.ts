import type { ExpressWs } from '/@/custom-server';
import type { Instance as ExpressWebSocket } from 'express-ws';
import { SocketRoutes } from '/@/custom-server/routes/SocketRoutes';
import { DevelopmentRoutes } from '/@/custom-server/routes/DevelopmentRoutes';
import { PublicRoutes } from '/@/custom-server/routes/PublicRoutes';
import { PrivateRoutes } from '/@/custom-server/routes/PrivateRoutes';
import { Header } from '/@/custom-server/routes/Header';
import { settings } from '/@/custom-server/settings';
import { SpaResolver } from '/@/custom-server/core/utils/RequestUtil';

function routes(app: ExpressWs, expressWs: ExpressWebSocket) {
  SocketRoutes(app, expressWs);

  if (settings.development) {
    DevelopmentRoutes(app);
  }

  // TODO redirect to page in spa or api
  if (!settings.just_api) {
    app.use(SpaResolver);
  }

  // TODO header
  app.use(Header);

  PublicRoutes(app);

  PrivateRoutes(app);
}

export { routes };
