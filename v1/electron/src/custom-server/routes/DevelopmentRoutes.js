const { AsyncHandler } = require('../core/utils/RequestUtil')
const DevelopmentController = require('../app/development/controllers/DevelopmentController')

module.exports = (app) => {
  // TODO ping
  app.get('/ping', AsyncHandler(DevelopmentController.ping))
  // app.get('/ddl', AsyncHandler(DevController.alterTable))
  app.get('/test_pagination', AsyncHandler(DevelopmentController.testPagination))
}
