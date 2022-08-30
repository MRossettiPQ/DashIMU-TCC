const dayjs = require('dayjs')
const { throwSuccess } = require('../../../core/Utils/RequestUtil')

const sensorList = []
exports.sensorConnection = async (client, req) => {
  console.log(`[SOCKET] - /socket`)
  let sensorIdentification = null

  client.on('message', (msg) => {
    sensorIdentification = {
      id: sensorList.length,
      ip: msg,
    }
    sensorList.push(sensorIdentification)
    console.log(`[SOCKET] - Add sensor - ${msg} - ${dayjs()}`)
  })

  client.on('close', (ws, req) => {
    sensorList.splice(sensorIdentification.id, 1)
    console.log(
      `[SOCKET] - Sensor ${
        sensorIdentification.ip
      } removed from network! - ${dayjs()}`
    )
  })
}

exports.getSensorList = async (req, res) => {
  try {
    console.log('[GET] - /api/sensor/list')
    await throwSuccess({
      content: sensorList,
      log: '[GET] - /api/sensor/list - Listed',
      res,
    })
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}
