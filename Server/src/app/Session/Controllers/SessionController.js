const { GyroMeasurement, Sensor, Session, Movement } =
  require('../../../core/DataBase').models
const ContextUtil = require('../../../core/utils/ContextUtil')
const {
  throwSuccess,
  throwNotFound,
} = require('../../../core/Utils/RequestUtil')
const { getAllCalc } = require('../Services/SciLabServices')
const { PaginationUtil } = require('../../../core/Utils/FetchUtil')
const Procedure = require('./Procedure')

exports.postSaveSession = async (req) => {
  const idUserContext = await ContextUtil.getUserContextId(req)

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

  return await throwSuccess({
    local: 'SERVER:SESSION',
    content: {
      session: newSession,
      result,
    },
    message: 'Session save successful',
    log: 'Session save successful',
  })
}

exports.getMensurationList = async (req) => {
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

  if (!mensurationList) {
    return await throwNotFound({
      local: 'SERVER:SESSION',
      log: 'Not founded',
      message: 'Not founded',
    })
  }

  return await throwSuccess({
    local: 'SERVER:SESSION',
    content: {
      resultList: mensurationList,
    },
    log: 'Founded',
  })
}

exports.getSessionList = async (req) => {
  const { id: idPatient } = req.params
  const { limit, page, field } = req.query

  const sessionList = await Session.findAll({
    where: {
      patientId: idPatient,
    },
  })

  if (!sessionList) {
    return await throwNotFound({
      local: 'SERVER:SESSION',
      message: 'Not founded',
      log: 'Not founded',
    })
  }

  return await throwSuccess({
    local: 'SERVER:SESSION',
    content: {
      resultList: sessionList,
    },
    log: 'Founded',
  })
}

exports.getSession = async (req) => {
  const { id } = req.params
  if (!id) {
    return await throwNotFound({
      local: 'SERVER:SESSION',
      message: 'Not founded',
      log: 'Not founded',
    })
  }

  const session = await Session.findByPk(id)

  if (!session) {
    return await throwNotFound({
      local: 'SERVER:SESSION',
      message: 'Not founded',
      log: 'Not founded',
    })
  }

  return await throwSuccess({
    local: 'SERVER:SESSION',
    content: session,
    log: 'Founded',
  })
}

exports.getMetadata = async () => {
  return await throwSuccess({
    local: 'SERVER:SESSION',
    content: {
      procedures: Procedure.getProcedures(),
    },
  })
}
