const dayjs = require('dayjs')
const { throwSuccess } = require('../../../core/utils/RequestUtil')
const { v4: uuid } = require('uuid')
const { settings } = require('../../../settings')
const { logColor } = require('../../../core/utils/LogUtil')
const WebSocketService = require('../services/WebSocketService')

let sensorList = {}
module.exports = new (class WebSocketController {
  async metadata() {
    const socket_url = await WebSocketService.getIP()
    return await throwSuccess({
      content: {
        socket_url: `${socket_url}:${settings.host.port}`,
        url: socket_url,
        port: settings.host.port,
      },
      log: 'Sensor list',
    })
  }

  async listSensor() {
    return await throwSuccess({
      local: 'SERVER:SENSOR',
      content: sensorList,
      log: 'Sensor list',
    })
  }

  sensorConnection(expressWs) {
    return function (client) {
      logColor('SOCKET', `Client connected in network! - ${dayjs()}`)

      client.origin = null

      client.info = null

      client.isAlive = true

      client.on('message', async (msg) => {
        const data = JSON.parse(msg)
        if (data.origin) {
          client.origin = data.origin
          if (data.origin === 'SENSOR' && client.info === null) {
            // Adiciona um novo sensor a lista de disponiveis
            client.info = {
              uuid: uuid(null, null, null),
              ...data,
            }

            sensorList[data.ip] = client.info

            logColor('SOCKET', `Add sensor - ${msg} - ${dayjs()}`)
            sendMessageAllClients(expressWs, 'UPDATE_CLIENT_LIST', Object.values(sensorList))
          } else if (data.origin === 'SENSOR') {
            // Atualiza um sensor disponivel
            client.connectionInfo = {
              ...client.info,
              ...data,
            }

            sensorList[data.ip] = client.info

            logColor('SOCKET', `Update sensor - ${msg} - ${dayjs()}`)
            sendMessageAllClients(expressWs, 'UPDATE_CLIENT_LIST', Object.values(sensorList))
          } else {
            switch (data?.type) {
              case 'GET_UPDATE_CLIENT_LIST':
                sendMessageToClient(client, 'UPDATE_CLIENT_LIST', Object.values(sensorList))
                break
              default:
                break
            }
          }
        }
      })

      client.once('close', () => {
        if (client.origin === 'SENSOR') {
          removeClient(client.info)
          sendMessageAllClients(expressWs, 'UPDATE_CLIENT_LIST', Object.values(sensorList))
          sendMessageAllClients(expressWs, 'SENSOR_DISCONNECTED', client.info)
        }
        clearInterval(client.interval)
      })

      client.once('error', () => {
        logColor('SOCKET', `Error sensor - ${dayjs()}`)
        client.close(1000, 'Keep alive timeout')
      })

      client.on('pong', () => {
        client.isAlive = true
      })

      client.interval = setInterval(() => {
        if (!client.isAlive) {
          logColor('SOCKET', `Not alive - ${dayjs()}`)
          return client.terminate()
        }

        client.isAlive = false
        client.ping()
      }, 3000)
    }
  }
})()

function sendMessageAllClients(expressWs, type, message) {
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
    logColor(`[SOCKET] - Send message all clients - ${type} - ${dayjs()}`)
  } catch (e) {
    console.log(e)
  }
}

function sendMessageToClient(client, type, message) {
  client.send(
    JSON.stringify({
      origin: 'SERVER',
      type,
      message,
    })
  )
}

function removeClient(info) {
  delete sensorList[info?.ip]
  logColor(`[SOCKET] - Sensor ${info?.ip} removed from network! - ${dayjs()}`)
}
