const { Measurement, GyroSensor } = require('../../../core/DataBase')
const UserContext = require('../../../core/Utils/UserContext')
const {
  throwSuccess,
  throwErrorIf,
} = require('../../../core/Utils/RequestUtil')
const { calculationVariabilityCenter } = require('../Services/SciLabServices')

exports.getCalculationVariabilityCenter = async (req, res) => {
  try {
    console.log('[GET] - /api/session/:id/scilab')
    const idUserContext = await UserContext.getUserContextId(req, res)
    const { id: idSession } = req.params

    await throwErrorIf({
      cond: idUserContext === null,
      message: 'Need to be logged in',
      res,
    })
    await throwErrorIf({
      cond: idSession === null,
      message: 'Patient ID is missing',
      res,
    })

    const sessionSensors = await GyroSensor.findAll({
      include: [
        {
          model: Measurement,
        },
      ],
      where: {
        sessionIdSession: idSession,
      },
    })

    await throwErrorIf({
      cond: sessionSensors?.length === null,
      message: 'Does not have measurements',
      res,
    })

    const variabilityCenter = await calculationVariabilityCenter(sessionSensors)

    await throwSuccess({
      content: variabilityCenter,
      log: '\x1b[32m[GET] - /api/session/:id/scilab - Calculation performed successfully\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
