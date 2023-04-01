const RegisterValidation = require('../src/core/Middleware/RegisterValidation.js')
const SessionController = require('../src/app/Session/Controllers/SessionController.js')
const SciLabController = require('../src/app/Session/Controllers/SciLabController.js')
const PatientController = require('../src/app/Patient/Controllers/PatientController.js')
const UserController = require('../src/app/User/Controllers/UserController.js')
const { AsyncHandlers, AsyncHandler } = require('../src/core/Utils/RequestUtil')
const { VerifyToken } = require('../src/core/Middleware/AuthorizeJwt')
const { VerifyRoles } = require('../src/core/Middleware/AuthorizeRoles')

module.exports = (app) => {
  // TODO Patient
  app.get(
    '/api/patient',
    AsyncHandlers(
      [VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])],
      true
    ),
    AsyncHandler(PatientController.getPatientList)
  )

  app.get(
    '/api/patient/:id',
    AsyncHandlers(
      [VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])],
      true
    ),
    AsyncHandler(PatientController.getPatient)
  )

  app.post(
    '/api/patient',
    AsyncHandlers(
      [
        VerifyToken,
        VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST']),
        RegisterValidation.verifyExistsCPFinPatient,
      ],
      true
    ),
    AsyncHandler(PatientController.postSavePatient)
  )

  // TODO Session
  app.get(
    '/api/patient/:id/session',
    AsyncHandlers(
      [VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])],
      true
    ),
    AsyncHandler(SessionController.getSessionList)
  )

  app.get(
    '/api/session/:id',
    AsyncHandlers(
      [VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])],
      true
    ),
    AsyncHandler(SessionController.getSession)
  )

  app.get(
    '/api/session/:id/movement/mensuration',
    AsyncHandlers(
      [VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])],
      true
    ),
    AsyncHandler(SessionController.getMensurationList)
  )

  app.post(
    '/api/session',
    AsyncHandlers(
      [VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])],
      true
    ),
    AsyncHandler(SessionController.postSaveSession)
  )

  // TODO Scilab
  app.get(
    '/api/session/:id/scilab',
    AsyncHandlers(
      [VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])],
      true
    ),
    AsyncHandler(SciLabController.getCalculationVariabilityCenter)
  )

  // TODO User
  app.post(
    '/api/user',
    AsyncHandlers(
      [VerifyToken, VerifyRoles(['ADMINISTRATOR', 'PHYSIOTHERAPIST'])],
      true
    ),
    AsyncHandler(UserController.postSaveUser)
  )
}
