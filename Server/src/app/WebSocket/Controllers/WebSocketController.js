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

exports.sensorConnection = (client, req, expressWs) => {
  console.log(`[SOCKET] - Client connected in network! - ${dayjs()}`)

  client.connectionInfo = null

  client.isAlive = true

  client.on('message', async (msg) => {
    try {
      console.log(`[SOCKET] - message - `, msg)
      const data = await JSON.parse(msg)
      if (data != null) {
        client.origin = data.origin
        if (client.origin === 'SENSOR') {
          if (client.connectionInfo === null) {
            client.connectionInfo = {
              id: uuidv4(null, null, null),
              ...data,
            }
            sensorList.push(client.connectionInfo)
            console.log(`[SOCKET] - Add sensor - ${msg} - ${dayjs()}`)
          } else {
            // Update sensor info
            client.connectionInfo = {
              ...client.connectionInfo,
              ...data,
            }
            const index = sensorList.findIndex(
              (sensor) => sensor.uuid === client.connectionInfo.uuid
            )
            sensorList[index] = { ...sensorList[index], ...data }
            console.log(`[SOCKET] - Update sensor - ${msg} - ${dayjs()}`)
          }
        }
        updateSensorList(expressWs, 'UPDATE_CLIENT_LIST', sensorList)
      }
    } catch (e) {
      console.log(e)
    }
  })

  client.once('close', () => {
    console.log('event:close')
    if (client.origin === 'SENSOR') {
      removeClient(client.connectionInfo)
      updateSensorList(expressWs, 'UPDATE_CLIENT_LIST', sensorList)
      updateSensorList(expressWs, 'SENSOR_DISCONNECTED', sensorList)
    }
    clearInterval(client.interval)
  })

  client.on('pong', (data) => {
    client.isAlive = true
  })

  client.on('error', (data) => {
    client.close()
  })

  client.interval = setInterval(() => {
    if (!client.isAlive) {
      return client.terminate()
    }

    client.isAlive = false
    client.ping()
  }, 10000)
}

function updateSensorList(expressWs, type, message) {
  function getClients() {
    return expressWs.getWss('/').clients || []
  }
  try {
    const clients = getClients()
    clients.forEach((client) => {
      client.send(
        JSON.stringify({
          origin: 'SERVER',
          type,
          message,
        })
      )
    })
    console.log(`[SOCKET] - Update sensor list - ${dayjs()}`)
  } catch (e) {
    console.log(e)
  }
}

function removeClient(connectionInfo) {
  let ip = connectionInfo.connectionInfo?.ip
  let index = sensorList.findIndex((sensor) => {
    return sensor.id !== connectionInfo.id
  })

  sensorList.splice(index, 1)
  console.log(`[SOCKET] - Sensor ${ip} removed from network! - ${dayjs()}`)
}

const events = [
  {
    value: '',
    code: 1000,
    description: '',
    info: '',
  },
]
