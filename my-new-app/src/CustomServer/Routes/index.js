const { environment } = require("../Environment");
const { SocketRoutes } = require("./SocketRoutes");
const { DevelopmentRoutes } = require("./DevelopmentRoutes");
const { SpaResolver } = require("../Core/Utils/RequestUtil");
const { Header } = require("./Header");
const { PublicRoutes } = require("./PublicRoutes");
const { PrivateRoutes } = require("./PrivateRoutes");

function Routes(app, expressWs) {
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

module.exports = { Routes };
