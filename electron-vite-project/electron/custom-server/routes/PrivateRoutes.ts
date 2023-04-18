import { Express } from "express";
import { AsyncHandler, AsyncMiddlewares } from "../core/utils/RequestUtil";
import { VerifyToken } from "../core/middleware/AuthorizeJwt";
import { VerifyRoles } from "../core/middleware/AuthorizeRoles";
import PatientController from "../app/Patient/Controllers/PatientController";
import { verifyExistsCPFinPatient } from "../core/middleware/RegisterValidation";
import SessionController from "../app/Session/Controllers/SessionController";
import SciLabController from "../app/Session/Controllers/SciLabController";
import UserController from "../app/User/Controllers/UserController";

function PrivateRoutes(app: Express): void {
  // TODO Patient
  app.get("/api/patient", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(PatientController.list));
  app.get("/api/patient/:id", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(PatientController.get));
  app.post("/api/patient", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"]), verifyExistsCPFinPatient]), AsyncHandler(PatientController.save));

  // TODO Session
  app.get("/api/patient/:id/session", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SessionController.list));
  app.get("/api/session/:id", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SessionController.get));
  app.get("/api/session/:id/movement/mensuration", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SessionController.measurementList));
  app.post("/api/session", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SessionController.save));

  // TODO Scilab
  app.get("/api/session/:id/scilab", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(SciLabController.getCalculationVariabilityCenter));

  // TODO User
  app.post("/api/user", AsyncMiddlewares([VerifyToken, VerifyRoles(["ADMINISTRATOR", "PHYSIOTHERAPIST"])]), AsyncHandler(UserController.save));
}

export { PrivateRoutes };
