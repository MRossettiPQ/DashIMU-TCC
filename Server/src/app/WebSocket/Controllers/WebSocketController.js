const dayjs = require('dayjs')

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
    console.log(`[SOCKET] - Adicionar o sensor - ${msg} - ${dayjs()}`)
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
    res.status(200).send(sensorList)
  } catch (e) {
    console.log('[SOCKET] - Error', e)
  } finally {
    console.log('[SOCKET] - ')
  }
}
