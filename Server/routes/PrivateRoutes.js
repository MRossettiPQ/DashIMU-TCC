const SessionController = require('../src/app/Session/Controllers/SessionController.js')
const SciLabController = require('../src/app/Session/Controllers/SciLabController.js')
const PatientController = require('../src/app/Patient/Controllers/PatientController.js')
const UserController = require('../src/app/User/Controllers/UserController.js')
const { AsyncHandler, AsyncMiddlewares } = require('../src/core/Utils/RequestUtil')
const { VerifyToken } = require('../src/core/Middleware/AuthorizeJwt')
const { VerifyRoles } = require('../src/core/Middleware/AuthorizeRoles')
const { verifyExistsCPFinPatient } = require('../src/core/Middleware/RegisterValidation')

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
