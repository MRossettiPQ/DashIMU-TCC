const {
  GyroMeasurement,
  Movement,
  Sensor,
  Session,
} = require('../../../core/DataBase')
const UserContext = require('../../../core/Utils/UserContext')
const {
  throwSuccess,
  throwErrorIf,
} = require('../../../core/Utils/RequestUtil')
const {
  calculationVariabilityCenter,
  getAllCalc,
} = require('../Services/SciLabServices')

exports.getCalculationVariabilityCenter = async (req, res) => {
  try {
    console.log('[GET] - /api/session/:id/scilab')
    const idUserContext = await UserContext.getUserContextId(req, res)
    const { id } = req.params
    const body = req.body

    await throwErrorIf({
      cond: idUserContext === null,
      message: 'Need to be logged in',
      res,
    })
    await throwErrorIf({
      cond: id === null,
      message: 'Patient ID is missing',
      res,
    })
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

    console.log(movements)

    await throwErrorIf({
      cond: movements?.length === null,
      message: 'Does not have measurements',
      res,
    })
    let result = await getAllCalc(movements, session)

    await throwSuccess({
      content: result,
      log: '\x1b[32m[GET] - /api/session/:id/scilab - Calculation performed successfully\x1b[0m',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
