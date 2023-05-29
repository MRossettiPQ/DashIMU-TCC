const SessionController = require('../app/session/controllers/SessionController.js')
const SciLabController = require('../app/session/controllers/SciLabController.js')
const PatientController = require('../app/patient/controllers/PatientController.js')
const UserController = require('../app/user/controllers/UserController.js')
const { AsyncHandler, AsyncMiddlewares } = require('../core/utils/RequestUtil')
const { VerifyToken } = require('../core/middleware/AuthorizeJwt')
const { VerifyRoles } = require('../core/middleware/AuthorizeRoles')
const { verifyExistsCPFinPatient } = require('../core/middleware/RegisterValidation')

module.exports = (app) => {
  // TODO PatientPage
  app.get('/api/patient', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(PatientController.list))
  app.get('/api/patient/:id', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(PatientController.get))
  app.post('/api/patient', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST']), verifyExistsCPFinPatient]), AsyncHandler(PatientController.save))

  // TODO Session
  app.get('/api/patient/:id/session', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.list))
  app.get('/api/session/:id', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.get))
  app.get('/api/session/:id/movement/mensuration', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.listMeasurement))
  app.post('/api/session', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.save))

  // TODO Scilab
  app.get('/api/session/:id/scilab', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SciLabController.getCalculationVariabilityCenter))

  // TODO User
  app.post('/api/user', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(UserController.save))
}
