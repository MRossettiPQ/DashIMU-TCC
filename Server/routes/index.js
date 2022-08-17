const AuthorizeJwt = require('../src/core/Middleware/AuthorizeJwt.js')
const RegisterValidation = require('../src/core/Middleware/RegisterValidation.js')
const SessionController = require('../src/app/Session/Controllers/SessionController.js')
const SciLabController = require('../src/app/Session/Controllers/SciLabController.js')
const PatientController = require('../src/app/Patient/Controllers/PatientController.js')
const AuthenticationController = require('../src/app/User/Controllers/AuthenticationController.js')
const WebSocketController = require('../src/app/WebSocket/Controllers/WebSocketController.js')
const UserController = require('../src/app/User/Controllers/UserController.js')
const header = require('./header')
const dayjs = require('dayjs')

module.exports = (app) => {
  // TODO ping
  app.get('/ping', (req, res) => {
    console.log(`[GET] - /ping - Ping`)
    res.json({ message: `Server online, current time: ${dayjs()}` })
  })

  app.post('/api/mensuration/test', SessionController.postCreateMensurationTest)

  // TODO Sensor WebSocket
  app.ws('/socket', WebSocketController.sensorConnection)

  // TODO header
  app.use(header)

  // TODO Sensor
  app.get(
    '/api/sensor/list',
    [AuthorizeJwt.verifyToken, AuthorizeJwt.ifAdminPhysiotherapist],
    WebSocketController.getSensorList
  )

  // TODO Authentication
  app.post(
    '/api/auth/register',
    [RegisterValidation.verifyUserEmailDuplicate],
    AuthenticationController.register
  )

  app.post('/api/auth/login', AuthenticationController.login)

  app.get('/api/auth/context', AuthenticationController.getUserContext)

  // TODO Patient
  app.get(
    '/api/patient',
    [AuthorizeJwt.verifyToken, AuthorizeJwt.ifAdminPhysiotherapist],
    PatientController.getPatientList
  )

  app.get(
    '/api/patient/:id',
    [AuthorizeJwt.verifyToken, AuthorizeJwt.ifAdminPhysiotherapist],
    PatientController.getPatient
  )

  app.post(
    '/api/patient',
    [
      AuthorizeJwt.verifyToken,
      AuthorizeJwt.ifAdminPhysiotherapist,
      RegisterValidation.verifyExistsCPF,
    ],
    PatientController.postCreatePatient
  )

  // TODO Mensuration
  app.get(
    '/api/mensuration',
    [AuthorizeJwt.verifyToken, AuthorizeJwt.ifAdminPhysiotherapist],
    SessionController.getMensurationList
  )

  app.get(
    '/api/mensuration/:id',
    [AuthorizeJwt.verifyToken, AuthorizeJwt.ifAdminPhysiotherapist],
    SessionController.getMensuration
  )

  app.post(
    '/api/mensuration',
    [AuthorizeJwt.verifyToken, AuthorizeJwt.ifAdminPhysiotherapist],
    SessionController.postCreateMensuration
  )

  // TODO Scilab
  app.get(
    '/api/mensuration/:id/scilab',
    [AuthorizeJwt.verifyToken, AuthorizeJwt.ifAdminPhysiotherapist],
    SciLabController.getCalculationVariabilityCenter
  )

  // TODO User
  app.post(
    '/api/user',
    [AuthorizeJwt.verifyToken, AuthorizeJwt.ifAdminPhysiotherapist],
    UserController.postSaveUser
  )
}
