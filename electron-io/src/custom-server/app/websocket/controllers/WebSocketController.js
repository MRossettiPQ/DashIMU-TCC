// const dayjs = require('dayjs')
const { throwSuccess } = require('../../../core/utils/RequestUtil')
// const { v4: uuid } = require('uuid')
const network = require('network')
const { settings } = require('../../../settings')
const { logColor } = require('../../../core/utils/LogUtil')
const { translate } = require('../../../core/utils/i18nUtil')

let sensorList = []
module.exports = new (class WebSocketController {
  async metadata() {
    function getIP() {
      return new Promise((resolve) => {
        network.get_private_ip((err, ip) => {
          resolve(ip || '0.0.0.0')
        })
      })
    }

    let server_ip = await getIP()
    return await throwSuccess({
      content: {
        socket_url: `${server_ip}:${settings.host.port}`,
        url: server_ip,
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

  sensorConnectionIo(io) {
    logColor('SERVER:SOCKET-IO', translate('socket.init'), 'fg.yellow')

    function removeSensorList() {}

    function addSensorList() {}

    function sendSensorList(socket) {
      socket.emit('sensor-list', {
        type: 'UPDATE_CLIENT_LIST',
        message: 'Lista de sensores disponíveis',
        data: {
          list: sensorList,
        },
      })
    }

    io.on('connection', (client) => {
      logColor('SERVER:SOCKET-IO', translate('socket.connection'), 'fg.yellow')

      client.connectionInfo = null
      // Atualiza todos os clientes com a lista atual de sensores
      sendSensorList(io)

      client.on('get-sensor-list', () => {
        // Atualiza o cliente solicitante com a lista atual de sensores
        sendSensorList(client)
      })

      client.on('disconnect', () => {
        logColor('SERVER:SOCKET-IO', translate('socket.disconnect'), 'fg.yellow')
      })
    })
  }

  // sensorConnection(expressWs) {
  //   return function (client, req) {
  //     logColor(`[SOCKET] - Client connected in network! - ${dayjs()}`)
  //
  //     client.connectionInfo = null
  //
  //     client.isAlive = true
  //
  //     client.on('message', async (msg) => {
  //       try {
  //         console.log(`[SOCKET] - message`)
  //         const data = await JSON.parse(msg)
  //         console.log(data)
  //         if (data.origin) {
  //           client.origin = data.origin
  //           if (data.origin === 'SENSOR' && client.connectionInfo === null) {
  //             client.connectionInfo = {
  //               uuid: uuid(null, null, null),
  //               ...data,
  //             }
  //             sensorList.push(client.connectionInfo)
  //             logColor(`[SOCKET] - Add sensor - ${msg} - ${dayjs()}`)
  //           } else if (data.origin === 'SENSOR') {
  //             // Update sensor info
  //             client.connectionInfo = {
  //               ...client.connectionInfo,
  //               ...data,
  //             }
  //             const index = sensorList.findIndex((sensor) => sensor.uuid === client.connectionInfo.uuid)
  //             sensorList[index] = { ...sensorList[index], ...data }
  //             logColor(`[SOCKET] - Update sensor - ${msg} - ${dayjs()}`)
  //           }
  //           switch (data?.type) {
  //             case 'GET_UPDATE_CLIENT_LIST':
  //               sendMessageToClient(client, 'UPDATE_CLIENT_LIST', sensorList)
  //               break
  //             default:
  //               break
  //           }
  //         }
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     })
  //
  //     client.once('close', (e) => {
  //       if (client.origin === 'SENSOR') {
  //         removeClient(client.connectionInfo)
  //         sendMessageAllClients(expressWs, 'UPDATE_CLIENT_LIST', sensorList)
  //         sendMessageAllClients(expressWs, 'SENSOR_DISCONNECTED', client.connectionInfo)
  //       }
  //       clearInterval(client.interval)
  //     })
  //
  //     client.on('pong', (data) => {
  //       client.isAlive = true
  //     })
  //
  //     client.once('error', (e) => {
  //       console.log(e)
  //       client.close(1000, 'Keep alive timeout')
  //     })
  //
  //     client.interval = setInterval(() => {
  //       if (!client.isAlive) {
  //         return client.terminate()
  //       }
  //
  //       client.isAlive = false
  //       client.ping()
  //     }, 5000)
  //   }
  // }
})()

// function sendMessageAllClients(expressWs, type, message) {
//   function getClients() {
//     return expressWs.getWss('/').clients || []
//   }
//
//   try {
//     const clients = getClients()
//     clients.forEach((client) => {
//       client.send(
//         JSON.stringify({
//           origin: 'SERVER',
//           type,
//           message,
//         })
//       )
//     })
//     logColor(`[SOCKET] - Send message all clients - ${type} - ${dayjs()}`)
//   } catch (e) {
//     console.log(e)
//   }
// }
//
// function sendMessageToClient(client, type, message) {
//   client.send(
//     JSON.stringify({
//       origin: 'SERVER',
//       type,
//       message,
//     })
//   )
// }
//
// function removeClient(connectionInfo) {
//   let ip = connectionInfo?.ip
//   let index = sensorList.findIndex((sensor) => {
//     return sensor.uuid !== connectionInfo.uuid
//   })
//
//   sensorList.splice(index, 1)
//   logColor(`[SOCKET] - Sensor ${ip} removed from network! - ${dayjs()}`)
// }
