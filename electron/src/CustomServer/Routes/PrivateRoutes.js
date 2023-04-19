const { AsyncMiddlewares, AsyncHandler } = require("../Core/Utils/RequestUtil");
const { VerifyToken } = require("../Core/Middleware/AuthorizeJwt");
const { VerifyRoles } = require("../Core/Middleware/AuthorizeRoles");
const UserController = require("../App/User/Controllers/UserController");
const PatientController = require("../App/Patient/Controllers/PatientController");
const { VerifyExistsCPFinPatient } = require("../Core/Middleware/RegisterValidation");
const SessionController = require("../App/Session/Controllers/SessionController");
const SciLabController = require("../App/Session/Controllers/SciLabController");

function PrivateRoutes(app) {
  // TODO Patient
  app.get("/api/patient", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(PatientController.getPatientList));

  app.get("/api/patient/:id", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(PatientController.getPatient));

  app.post("/api/patient", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"]), VerifyExistsCPFinPatient]), AsyncHandler(PatientController.postSavePatient));

  // TODO Session
  app.get("/api/patient/:id/session", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SessionController.list));

  app.get("/api/session/:id", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SessionController.get));

  app.get("/api/session/:id/movement/mensuration", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SessionController.listMeasurement));

  app.post("/api/session", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SessionController.save));

  // TODO Scilab
  app.get("/api/session/:id/scilab", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SciLabController.getCalculationVariabilityCenter));

  // TODO User
  app.post("/api/user", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(UserController.save));
}

module.exports = { PrivateRoutes };
