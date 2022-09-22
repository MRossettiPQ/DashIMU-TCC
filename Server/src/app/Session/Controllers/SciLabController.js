const { GyroMeasurement, Sensor, Session } = require('../../../core/DataBase')
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
    const body = req.body

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
    const session = await Session.findByPk(idSession)

    const sessionSensors = await Sensor.findAll({
      include: [
        {
          model: GyroMeasurement,
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

    const variabilityCenter = await calculationVariabilityCenter({
      sensors: sessionSensors,
      session,
      chartType: body?.chartType,
    })

    await throwSuccess({
      content: variabilityCenter,
      log: '\x1b[32m[GET] - /api/session/:id/scilab - Calculation performed successfully\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
exports.getCalculationVariabilityCenterExemple = async (req, res) => {
  try {
    console.log('[GET] - /api/session/:id/scilab')
    const sensor1 = require('example-sensor-1.txt')
    const sensor2 = require('example-sensor-2.txt')

    const variabilityCenter = await calculationVariabilityCenter({
      sensors: [sensor1, sensor2],
      session: {
        idSession: 'teste',
        date: null,
      },
    })

    await throwSuccess({
      content: variabilityCenter,
      log: '\x1b[32m[GET] - /api/session/:id/scilab - Calculation performed successfully\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
