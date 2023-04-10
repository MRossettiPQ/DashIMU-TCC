const { AsyncHandler } = require('../src/core/Utils/RequestUtil')
const DevController = require('../src/app/Dev/Controllers/DevController')

module.exports = (app) => {
  // TODO ping
  app.get('/ping', DevController.ping)
  // app.get('/ddl', AsyncHandler(DevController.alterTable))
  app.get('/test_pagination', AsyncHandler(DevController.testPagination))
}
