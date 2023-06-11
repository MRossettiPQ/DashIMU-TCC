const { GyroMeasurement, Sensor, Session, Movement } = require('../../../core/database').models
const { throwSuccess, throwNotFound, throwError } = require('../../../core/utils/RequestUtil')
const { PaginationUtil } = require('../../../core/utils/PaginationUtil')
const Procedure = require('./Procedure')
const { getUserContextId } = require('../../../core/utils/ContextUtil')

module.exports = new (class SessionController {
  async save(req) {
    const idUserContext = await getUserContextId(req)

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

    return await throwSuccess({
      local: 'SERVER:SESSION',
      content: newSession,
      message: 'Session save successful',
      log: 'Session save successful',
    })
  }

  async list(req) {
    const { id: idPatient } = req.params
    const { rpp, page, field } = req.query

    if (!idPatient) {
      return await throwError({
        local: 'SERVER:SCILAB',
        message: 'User not found',
        log: 'User not found',
      })
    }

    const pagination = await PaginationUtil(Session, {
      rpp,
      page,
      field,
      order: [['id', 'ASC']],
    })

    if (!pagination) {
      return await throwNotFound({
        local: 'SERVER:SESSION',
        message: 'Not founded',
        log: 'Not founded',
      })
    }

    return await throwSuccess({
      local: 'SERVER:SESSION',
      content: pagination,
      log: 'Founded',
    })
  }

  async get(req) {
    const { id } = req.params
    if (!id) {
      return await throwNotFound({
        local: 'SERVER:SESSION',
        message: 'Not founded',
        log: 'Not founded',
      })
    }

    const session = await Session.findByPk(id, {
      include: [
        {
          model: Movement,
          include: [
            {
              model: Sensor,
            },
          ],
        },
      ],
    })

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

  async getMovement(req) {
    const { id, movementId } = req.params

    if (!id || !movementId) {
      return await throwNotFound({
        local: 'SERVER:SESSION',
        message: 'Not founded',
        log: 'Not founded',
      })
    }

    const movement = await Movement.findByPk(movementId, {
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
    })

    return await throwSuccess({
      local: 'SERVER:SESSION',
      content: movement,
      log: 'Founded',
    })
  }

  async metadata() {
    return await throwSuccess({
      local: 'SERVER:SESSION',
      content: {
        procedures: Procedure.getProcedures(),
      },
    })
  }
})()
