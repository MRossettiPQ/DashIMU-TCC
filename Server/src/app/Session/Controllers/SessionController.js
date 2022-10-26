const { GyroMeasurement, Sensor, Session } = require('../../../core/DataBase')
const UserContext = require('../../../core/utils/UserContext')
const {
  throwSuccess,
  throwNotFoundIf,
} = require('../../../core/Utils/RequestUtil')
const { calculationVariabilityCenter } = require('../Services/SciLabServices')
const myip = require('quick-local-ip')
const environment = require('../../../../environment')
const Procedure = require('./Procedure')

exports.postSaveSession = async (req, res) => {
  console.log('[POST] - /api/session')
  try {
    const idUserContext = await UserContext.getUserContextId(req, res)

    let { sessionParams, sensors } = req.body

    const newSession = await Session.create(
      {
        ...sessionParams,
        userIdUser: idUserContext,
        sensors,
      },
      {
        include: [
          {
            model: Sensor,
            include: [
              {
                model: GyroMeasurement,
              },
            ],
          },
        ],
      }
    )

    const variabilityCenter = await calculationVariabilityCenter({
      sensors: newSession.sensors,
      session: newSession,
    })

    await throwSuccess({
      content: variabilityCenter,
      message: 'Session save successful',
      log: '\x1b[32m[POST] - /api/session - success save\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

exports.getMensurationList = async (req, res) => {
  try {
    console.log('[GET] - /api/session/:id/mensuration')
    const { id: idSession } = req.params
    const { limit, page, field } = req.query

    const mensurationList = await GyroMeasurement.findAll({
      include: [
        {
          order: [
            ['sensorIdGyroSensor', 'ASC'],
            ['numberMensuration', 'ASC'],
          ],
          model: Sensor,
          where: {
            sessionIdSession: idSession,
          },
        },
      ],
    })

    console.log(mensurationList)

    await throwNotFoundIf({
      cond: mensurationList === null,
      log: '[GET] - /api/session/:id/mensuration - not founded',
      res,
    })

    await throwSuccess({
      content: {
        resultList: mensurationList,
      },
      log: '\x1b[32m[GET] - /api/session/:id/mensuration - founded\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

exports.getSessionList = async (req, res) => {
  try {
    console.log('[GET] - /api/session')
    const { id: idPatient } = req.params
    const { limit, page, field } = req.query

    const sessionList = await Session.findAll({
      where: {
        patientIdPatient: idPatient,
      },
    })

    await throwNotFoundIf({
      cond: sessionList === null,
      message: '[GET] - /api/session - not founded',
      log: '[GET] - /api/session - not founded',
      res,
    })

    await throwSuccess({
      content: {
        resultList: sessionList,
      },
      log: '\x1b[32m[GET] - /api/session - founded\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

exports.getSession = async (req, res) => {
  try {
    console.log('[GET] - /api/session/:id')
    const { id: idSession } = req.params

    const session = await Session.findByPk(idSession)

    await throwNotFoundIf({
      cond: session === null,
      message: '[GET] - /api/session/:id - not founded',
      log: '[GET] - /api/session/:id - not founded',
      res,
    })

    await throwSuccess({
      content: session,
      log: '\x1b[32m[GET] - /api/session/:id - founded\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

exports.getMetadata = async (req, res) => {
  try {
    console.log('[GET] - /api/session/metadata')

    await throwSuccess({
      content: {
        procedures: Procedure.getProcedures(),
        socket_url: `${myip.getLocalIP4()}:${environment.host.port}`,
      },
      log: `\x1b[32m[GET] - ${myip.getLocalIP4()} - /api/session/metadata\x1b[0m`,
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
