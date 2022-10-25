const dayjs = require('dayjs')
const { throwSuccess } = require('../../../core/Utils/RequestUtil')
const { v4: uuidv4 } = require('uuid')
const { Session, Sensor, GyroMeasurement } = require('../../../core/DataBase')

let sensorList = []
let sessionList = []
exports.socketSession = async (connection, req) => {
  console.log(`[SOCKET] - /v2/socket`)
  let connectionInfo = null

  connection.on('message', (msg) => {
    const event = JSON.parse(msg)
    const { content } = event

    switch (event.origin) {
      case 'APP': {
        console.log('[SOCKET] - Origin: APP')
        switch (event.content.type) {
          case 'REGISTER': {
            console.log('REGISTER')
            connectionInfo = {
              uuid: uuidv4(null, null, null),
              type: event.origin,
              user: content.user,
              run: false,
              sensors: [],
              connection,
            }

            sessionList.push(connectionInfo)

            break
          }
          case 'ADD_SENSOR_SESSION': {
            console.log('ADD_SENSOR_SESSION')
            const sensorIndex = sessionList.findIndex(
              (sensor) => sensor.uuid === content.sensor.uuid
            )
            if (sensorList[sensorIndex].available) {
              sensorList[sensorIndex].available = false
              connectionInfo.sensors.push(sensorList[sensorIndex])

              const sessionIndex = sessionList.findIndex(
                (session) => session.uuid === connectionInfo.uuid
              )
              sessionList[sessionIndex].sensors.push(sensorList[sensorIndex])
            }
            break
          }
          case 'REMOVE_SENSOR_SESSION': {
            console.log('REMOVE_SENSOR_SESSION')
            break
          }
          case 'SAVE': {
            console.log('SAVE')
            saveSession(connectionInfo)
            break
          }
          case 'START':
          case 'RESTART':
          case 'STOP':
          case 'SAVE_CALIBRATION':
          case 'LOAD_CALIBRATION':
          case 'CALIBRATION': {
            console.log(event.content.type)
            sendMessageToSensors(event)
            break
          }
        }
        break
      }
      case 'SENSOR': {
        console.log('[SOCKET] - Origin: SENSOR')
        switch (event.content.type) {
          case 'REGISTER': {
            console.log('REGISTER')
            connectionInfo = {
              uuid: uuidv4(null, null, null),
              type: event.origin,
              sensor: content.sensor,
              connection,
              available: true,
              session_actual: null,
            }
            sensorList.push(connectionInfo)
            break
          }
          case 'MENSURATION': {
            console.log('MENSURATION')
            break
          }
        }
        break
      }
    }

    console.log(
      `[SOCKET] - Event - ${event.origin} : ${event.content.type} - ${dayjs()}`
    )
  })

  connection.on('error', () => {
    removeClient(connectionInfo)
    console.log(`[SOCKET] - Removed from network! - ${dayjs()}`)
  })

  connection.on('open', () => {
    console.log(`[SOCKET] - Client connected in network! - ${dayjs()}`)
  })

  connection.on('close', () => {
    removeClient(connectionInfo)
    console.log(`[SOCKET] - Client disconnected from network! - ${dayjs()}`)
  })
}

async function saveSession(connectionInfo) {
  try {
    const session = findSessionByUUID(connectionInfo)
    const newSession = await Session.create(
      {
        ...session,
        userIdUser: session.user.idUser,
        sensors: session.sensors,
      },
      {
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
      }
    )
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`)
  }
}

function findIndexSessionByUUID(connectionInfo) {
  return sessionList.findIndex(
    (session) => session.uuid === connectionInfo.uuid
  )
}

function findIndexSessionBySensor(connectionInfo) {
  return sessionList.findIndex(
    (session) => session.uuid === connectionInfo.session.uuid
  )
}

function findSessionByUUID(connectionInfo) {
  return sessionList.find((session) => session.uuid === connectionInfo.uuid)
}

function registerMeasurementsInSession(connectionInfo, measurements) {
  const sessionIndex = findIndexSessionBySensor(connectionInfo)
}

function sendMessageToSensors(connectionInfo, event) {
  connectionInfo.sensors.map((sensor) => {
    sensor.send(event)
  })
}

function removeClient(connectionInfo) {
  if (connectionInfo.type === 'APP') {
    sessionList = sessionList.filter((session) => {
      return session.uuid !== connectionInfo.uuid
    })
  } else {
    sensorList = sensorList.filter((session) => {
      return session.uuid !== connectionInfo.uuid
    })
  }
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

exports.sensorConnection = async (client, req) => {
  console.log(`[SOCKET] - /socket`)
  let sensorIdentification = null

  client.on('message', (msg) => {
    sensorIdentification = {
      id: uuidv4(),
      ip: msg,
    }
    sensorList.push(sensorIdentification)
    console.log(sensorList)
    console.log(`[SOCKET] - Add sensor - ${msg} - ${dayjs()}`)
  })

  client.on('close', (ws, req) => {
    sensorList = sensorList.filter(
      (sensor) => sensorIdentification.id !== sensor.id
    )
    console.log(
      `[SOCKET] - Sensor ${
        sensorIdentification.ip
      } removed from network! - ${dayjs()}`
    )
    console.log(sensorList)
  })

  client.on('error', (ws, req) => {
    sensorList = sensorList.filter(
      (sensor) => sensorIdentification.id !== sensor.id
    )
    console.log(
      `[SOCKET] - Sensor ${
        sensorIdentification.ip
      } removed from network! - ${dayjs()}`
    )
    console.log(sensorList)
  })
}
