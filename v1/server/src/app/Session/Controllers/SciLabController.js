const { GyroMeasurement, Movement, Sensor, Session } = require('../../../core/DataBase').models
const ContextUtil = require('../../../core/Utils/ContextUtil')
const { throwSuccess, throwError } = require('../../../core/Utils/RequestUtil')
const { getAllCalc } = require('../Services/SciLabServices')

exports.getCalculationVariabilityCenter = async (req) => {
  const idUserContext = await ContextUtil.getUserContextId(req)
  const { id } = req.params
  const body = req.body

  if (!idUserContext) {
    return await throwError({
      local: 'SERVER:SCILAB',
      message: 'Need to be logged in',
      log: 'Need to be logged in',
    })
  }
  if (!id) {
    return await throwError({
      local: 'SERVER:SCILAB',
      message: 'PatientPage ID is missing',
      log: 'PatientPage ID is missing',
    })
  }
  const session = await Session.findByPk(id)

  const movements = await Movement.findAll({
    where: {
      sessionId: id,
    },
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

  if (!movements?.length) {
    return await throwError({
      local: 'SERVER:SCILAB',
      message: 'Does not have measurements',
      log: 'Does not have measurements',
    })
  }
  let result = await getAllCalc(movements, session)

  return await throwSuccess({
    local: 'SERVER:SCILAB',
    content: result,
    log: 'Calculation performed successfully',
  })
}
