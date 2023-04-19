const { AsyncMiddlewares, AsyncHandler } = require("../Core/Utils/RequestUtil");
const { VerifyToken } = require("../Core/Middleware/AuthorizeJwt");
const { VerifyRoles } = require("../Core/Middleware/AuthorizeRoles");
const UserController = require("../App/User/Controllers/UserController");

function PrivateRoutes(app) {
  // // TODO Patient
  // app.get('/api/patient', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(PatientController.getPatientList))
  //
  // app.get('/api/patient/:id', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(PatientController.getPatient))
  //
  // app.post('/api/patient', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST']), verifyExistsCPFinPatient]), AsyncHandler(PatientController.postSavePatient))
  //
  // // TODO Session
  // app.get('/api/patient/:id/session', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.getSessionList))
  //
  // app.get('/api/session/:id', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.getSession))
  //
  // app.get('/api/session/:id/movement/mensuration', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.getMensurationList))
  //
  // app.post('/api/session', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SessionController.postSaveSession))
  //
  // // TODO Scilab
  // app.get('/api/session/:id/scilab', AsyncMiddlewares([VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])]), AsyncHandler(SciLabController.getCalculationVariabilityCenter))

  // TODO User
  app.post("/api/user", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(UserController.save));
}

module.exports = { PrivateRoutes };
