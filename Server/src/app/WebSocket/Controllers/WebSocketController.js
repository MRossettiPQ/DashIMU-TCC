const dayjs = require('dayjs')
const { throwSuccess } = require('../../../core/Utils/RequestUtil')
const { v4: uuidv4 } = require('uuid')

let sensorList = []
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

exports.sensorConnection = async (client, req) => {
  console.log(`[SOCKET] - /socket`)
  let connectionInfo = null

  client.on('message', (msg) => {
    connectionInfo = {
      id: uuidv4(null, null, null),
      ip: msg,
    }
    sensorList.push(connectionInfo)
    console.log(sensorList)
    console.log(`[SOCKET] - Add sensor - ${msg} - ${dayjs()}`)
  })

  client.on('close', () => {
    console.log('event:close')
    removeClient(connectionInfo)
    console.log(
      `[SOCKET] - Sensor ${
        connectionInfo?.ip
      } removed from network! - ${dayjs()}`
    )
    console.log(sensorList)
  })

  client.on('data', function (data) {
    console.log('event:data')
    console.log(data)
  })

  client.on('error', () => {
    console.log('event:error')
    removeClient(connectionInfo)
    console.log(
      `[SOCKET] - Sensor ${
        connectionInfo?.ip
      } removed from network! - ${dayjs()}`
    )
    console.log(sensorList)
  })

  client.on('', () => {
    console.log(`[SOCKET] - Client connected in network! - ${dayjs()}`)
  })
}

function removeClient(connectionInfo) {
  sensorList = sensorList.filter((sensor) => {
    return sensor.uuid !== connectionInfo.uuid
  })
}
