const SessionController = require('../app/Session/Controllers/SessionController.js')
const SciLabController = require('../app/Session/Controllers/SciLabController.js')
const PatientController = require('../app/Patient/Controllers/PatientController.js')
const UserController = require('../app/User/Controllers/UserController.js')
const { AsyncHandler, AsyncMiddlewares } = require('../core/Utils/RequestUtil')
const { VerifyToken } = require('../core/Middleware/AuthorizeJwt')
const { VerifyRoles } = require('../core/Middleware/AuthorizeRoles')
const { verifyExistsCPFinPatient } = require('../core/Middleware/RegisterValidation')

module.exports = (app) => {
  // TODO Patient
  app.get('/api/patient', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(PatientController.getPatientList))

  app.get('/api/patient/:id', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(PatientController.getPatient))

  app.post('/api/patient', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST']), verifyExistsCPFinPatient]), AsyncHandler(PatientController.postSavePatient))

  // TODO Session
  app.get('/api/patient/:id/session', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.getSessionList))

  app.get('/api/session/:id', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.getSession))

  app.get('/api/session/:id/movement/mensuration', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.getMensurationList))

  app.post('/api/session', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.postSaveSession))

  // TODO Scilab
  app.get('/api/session/:id/scilab', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SciLabController.getCalculationVariabilityCenter))

  // TODO User
  app.post('/api/user', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(UserController.postSaveUser))
}
