const { GyroMeasurement, Movement, Sensor } = require('../../../core/database').models
const { throwSuccess, throwError } = require('../../../core/utils/RequestUtil')
const { calculationVariabilityCenter } = require('../services/SciLabServices')

module.exports = new (class SciLabController {
  async getCalculationVariabilityCenter(req) {
    const { id, movementId } = req.params

    if (!id) {
      return await throwError({
        local: 'SERVER:SCILAB',
        message: 'Patient ID is missing',
        log: 'Patient ID is missing',
      })
    }
    if (!movementId) {
      return await throwError({
        local: 'SERVER:SCILAB',
        message: 'Movement ID is missing',
        log: 'Movement ID is missing',
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

    if (!movement) {
      return await throwError({
        local: 'SERVER:SCILAB',
        message: 'Does not have measurements',
        log: 'Does not have measurements',
      })
    }
    const result = calculationVariabilityCenter(movement.sensors)

    return await throwSuccess({
      local: 'SERVER:SCILAB',
      content: result,
      log: 'Calculation performed successfully',
    })
  }
})()
