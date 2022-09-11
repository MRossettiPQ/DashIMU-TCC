const { Measurement, GyroSensor, Session } = require('../../../core/DataBase')
const UserContext = require('../../../core/utils/UserContext')
const {
  throwSuccess,
  throwNotFoundIf,
} = require('../../../core/Utils/RequestUtil')
const { calculationVariabilityCenter } = require('../Services/SciLabServices')

exports.postSaveSession = async (req, res) => {
  console.log('[POST] - /api/session')
  try {
    const idUserContext = await UserContext.getUserContextId(req, res)

    let { sessionParams, gyro_sensors } = req.body

    const newSession = await Session.create(
      {
        ...sessionParams,
        userIdUser: idUserContext,
        gyro_sensors,
      },
      {
        include: [
          {
            model: GyroSensor,
            include: [
              {
                model: Measurement,
              },
            ],
          },
        ],
      }
    )

    const variabilityCenter = await calculationVariabilityCenter(newSession)

    await throwSuccess({
      content: variabilityCenter,
      message: 'Session save successful',
      log: '[POST] - /api/session - success save',
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

    const mensurationList = await Measurement.findAll({
      include: [
        {
          model: GyroSensor,
          where: {
            sessionIdSession: idSession,
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
      log: '[GET] - /api/session/:id/mensuration - founded',
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
      log: '[GET] - /api/session - founded',
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
      log: '[GET] - /api/session/:id - founded',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
