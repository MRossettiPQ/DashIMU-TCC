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

exports.sensorConnection = (client, req) => {
  console.log(`[SOCKET] - /socket`)
  let connectionInfo = null

  client.isAlive = true

  client.on('message', (msg) => {
    const data = JSON.parse(msg)
    if (connectionInfo === null) {
      connectionInfo = {
        id: uuidv4(null, null, null),
        ...data,
      }
    } else {
      connectionInfo = {
        ...connectionInfo,
        ...data,
      }
    }
    sensorList.push(connectionInfo)
    console.log(sensorList)
    console.log(`[SOCKET] - Add sensor - ${msg} - ${dayjs()}`)
  })

  client.once('disconnect', () => {
    console.log('event:disconnect')
    removeClient(connectionInfo)
    console.log(
      `[SOCKET] - Sensor ${
        connectionInfo?.ip
      } removed from network! - ${dayjs()}`
    )
    console.log(sensorList)
    clearInterval(interval)
  })

  client.once('close', () => {
    console.log('event:close')
    removeClient(connectionInfo)
    console.log(
      `[SOCKET] - Sensor ${
        connectionInfo?.ip
      } removed from network! - ${dayjs()}`
    )
    console.log(sensorList)
    clearInterval(interval)
  })

  client.on('pong', (data) => {
    console.log('event:pong')
    client.isAlive = true
  })

  client.once('error', () => {
    console.log('event:error')
    removeClient(connectionInfo)
    console.log(
      `[SOCKET] - Sensor ${
        connectionInfo?.ip
      } removed from network! - ${dayjs()}`
    )
    console.log(sensorList)
    clearInterval(interval)
  })

  client.on('connection', () => {
    console.log(`[SOCKET] - Client connected in network! - ${dayjs()}`)
  })

  let interval = setInterval(() => {
    if (!client.isAlive) return client.terminate()

    client.isAlive = false
    client.ping(null, false, true)
  }, 10000)
}

function removeClient(connectionInfo) {
  sensorList = sensorList.filter((sensor) => {
    return sensor.uuid !== connectionInfo.uuid
  })
}
