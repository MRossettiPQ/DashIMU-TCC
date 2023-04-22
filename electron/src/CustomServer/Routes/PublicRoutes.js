const { AsyncMiddlewares, AsyncHandler } = require("../Core/Utils/RequestUtil");
const { VerifyUserEmailDuplicate } = require("../Core/Middleware/RegisterValidation");
const AuthenticationController = require("../App/User/Controllers/AuthenticationController");
const SessionController = require("../App/Session/Controllers/SessionController");
const WebSocketController = require("../App/WebSocket/Controllers/WebSocketController");

function PublicRoutes(app) {
  // TODO Authentication
  app.post("/api/auth/register", AsyncMiddlewares([VerifyUserEmailDuplicate]), AsyncHandler(AuthenticationController.register));
  app.post("/api/auth/login", AsyncHandler(AuthenticationController.login));
  app.post("/api/auth/context", AsyncHandler(AuthenticationController.context));

  // TODO Metadata - list sensors and metadata socket
  app.get("/api/session/metadata", AsyncHandler(SessionController.metadata));
  app.get("/api/websocket/metadata", AsyncHandler(WebSocketController.metadata));
  app.get("/api/websocket/list", AsyncHandler(WebSocketController.list));
}

module.exports = { PublicRoutes };
