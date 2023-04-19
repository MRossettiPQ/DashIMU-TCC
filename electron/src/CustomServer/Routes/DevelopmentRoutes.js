const { AsyncHandler } = require("../core/Utils/RequestUtil");
const DevController = require("../App/Development/Controllers/DevController");

function DevelopmentRoutes(app) {
  // TODO ping
  app.get("/ping", AsyncHandler(DevController.ping));
  // app.get('/ddl', AsyncHandler(DevController.alterTable))
  app.get("/test_pagination", AsyncHandler(DevController.testPagination));
}
module.exports = { DevelopmentRoutes };
