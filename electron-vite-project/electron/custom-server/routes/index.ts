import { Instance as ExpressWebSocket } from "express-ws";
import { ExpressWs } from "../CustomServer";
import environment from "../environment";
import { DevelopmentRoutes } from "./DevelopmentRoutes";
import { SocketRoutes } from "./SocketRoutes";
import { Header } from "./Header";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { SpaResolver } from "../core/utils/RequestUtil";

function routes(app: ExpressWs, expressWs: ExpressWebSocket) {
  SocketRoutes(app, expressWs);

  if (environment.development) {
    DevelopmentRoutes(app);
  }

  // TODO redirect to page in spa or api
  if (!environment.just_api) {
    app.use(SpaResolver);
  }

  // TODO header
  app.use(Header);

  PublicRoutes(app);

  PrivateRoutes(app);
}

export { routes };
