const {
  GyroMeasurement,
  Sensor,
  Session,
  Movement,
} = require('../../../core/DataBase')
const UserContext = require('../../../core/utils/UserContext')
const {
  throwSuccess,
  throwNotFoundIf,
} = require('../../../core/Utils/RequestUtil')
const { getAllCalc } = require('../Services/SciLabServices')
const { PaginationUtil } = require('../../../core/Utils/FetchUtil')
const Procedure = require('./Procedure')

exports.postSaveSession = async (req, res) => {
  console.log('[POST] - /api/session')
  try {
    const idUserContext = await UserContext.getUserContextId(req, res)

    let { session } = req.body

    const newSession = await Session.create(
      {
        ...session,
        userId: idUserContext,
      },
      {
        include: [
          {
            model: Movement,
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
          },
        ],
      }
    )

    let result = await getAllCalc(newSession.movements, newSession)

    await throwSuccess({
      content: {
        session: newSession,
        result,
      },
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
    const { sessionId: idSession } = req.params
    const { limit, page, field, movementId } = req.query
    console.log(movementId, req.query)

    const mensurationList = await GyroMeasurement.findAll({
      order: [
        ['numberMensuration', 'ASC'],
        ['sensorId', 'ASC'],
      ],
      include: [
        {
          model: Sensor,
          where: {
            movementId,
          },
        },
      ],
    })

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
        patientId: idPatient,
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
    const { id } = req.params

    const session = await Session.findByPk(id)

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
      },
      log: `\x1b[32m[GET] - /api/session/metadata\x1b[0m`,
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
