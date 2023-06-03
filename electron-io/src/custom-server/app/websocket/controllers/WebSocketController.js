const { throwSuccess } = require('../../../core/utils/RequestUtil')
const { v4: uuid } = require('uuid')
const network = require('network')
const _ = require('lodash')
const { settings } = require('../../../settings')
const { logColor } = require('../../../core/utils/LogUtil')
const { translate } = require('../../../core/utils/i18nUtil')

const sensors = {}

class Connection {
  client = null
  global = null

  // Sensor
  connectionInfo = {
    id: null,
    ip: null,
    uuid: null,
    origin: null,
    sensorName: null,
    ssid: null,
    password: null,
    backend: null,
    backendPort: null,
    counter: 0,
    calibrated: false,
    started: false,
    available: true,
    room: null,
    cmd: null,
    get running() {
      return this.started
    },
    get calibrating() {
      return this.calibrated
    },
  }

  constructor(client, io) {
    logColor('SERVER:SOCKET-IO', translate('socket.connection'), 'fg.yellow')
    this.client = client
    this.global = io

    // Registra
    this.client.on('register-sensor', (sensor) => this.registerSensor(sensor))
    this.client.on('register-client', () => this.createRoom())
    this.client.on('get-sensor-list', () => this.sendSensorList(this.client))
    this.client.on('register-listener', (arg) => this.registerRoom(arg))
    this.client.on('remove-listener', () => this.removeRoom(this.client))
    this.client.on('remove-my-room', () => this.removeMyRoom())
    // Redireciona as medições
    this.client.on('measurements', (array) => this.measurements(array))
    // Ao desconectar
    this.client.on('disconnect', () => this.disconnect())
    // Ao ter error
    this.client.on('connect_error', (s) => this.disconnect(s))

    this.client.on('stop-all-room', (arg) => this.stopAll(arg))
    this.client.on('start-all-room', (arg) => this.startAll(arg))
    this.client.on('calibrate-room', (arg) => this.startAll(arg))

    //Eventos vindos do sensor
    this.client.on('sensor-running', (arg) => this.setRunning(arg))
    this.client.on('sensor-stopped', (arg) => this.setStopped(arg))
    this.client.on('sensor-calibrating', (arg) => this.setCalibrating(arg))
    this.client.on('sensor-calibrated', (arg) => this.setCalibrated(arg))
  }

  registerRoom(id) {
    // id do socket do sensor a ser registrado
    logColor('SERVER:SOCKET-IO', `Adicionar o sensor ${id} na sala`)
    const socket = sensors[id]
    if (socket) {
      if (!sensors[id].connectionInfo.available) {
        logColor('SERVER:SOCKET-IO', `O sensor ${id} está indisponível`)
        return this.sendError(`O sensor ${id} está indisponível`)
      }
      sensors[id].client.join(this.client.id)
      sensors[id].setNotAvailable(this.client.id)
      sensors[id].sendSelfUpdate()
    }
  }

  removeRoom(id) {
    logColor('SERVER:SOCKET-IO', `Remover o sensor ${id} da sala`)
    const socket = sensors[id]
    if (socket) {
      if (sensors[id].connectionInfo.available) {
        logColor('SERVER:SOCKET-IO', `O sensor ${id} já está disponível`)
        return this.sendError(`O sensor ${id} já está disponível`)
      }
      sensors[id].client.leave(this.client.id)
      sensors[id].setAvailable()
      sensors[id].sendSelfUpdate()
    }
  }

  removeMyRoom() {
    this.setAvailable()
    this.sendSelfUpdate()
  }

  setNotAvailable(room) {
    this.connectionInfo.available = false
    this.connectionInfo.room = room
  }

  setAvailable() {
    this.connectionInfo.available = true
    this.connectionInfo.room = null
  }

  stopAll() {
    // Mandar todos os sensores da sala desse front pararem
    this.global.to(this.client.id).emit('stop')
  }

  startAll() {
    // Mandar todos os sensores da sala desse front iniciarem
    this.global.to(this.client.id).emit('start')
  }

  createRoom() {
    // Inicia uma sala com o id do cliente
    this.client.join(this.client.id)
  }

  get isSensor() {
    return this.connectionInfo.origin === 'SENSOR'
  }

  measurements(array) {
    if (this.isSensor) {
      this.global.to(this.connectionInfo.room).emit(`measurements-${this.connectionInfo.ip}`, array)
    }
  }

  disconnect() {
    logColor('SERVER:SOCKET-IO', translate('socket.disconnect'), 'fg.yellow')
    if (this.isSensor) {
      this.global.emit(`remove-${this.client.ip}`)
      this.removeSensorList()
    }
  }

  sendError(msg) {
    this.client.emit('error-event', 'Error: ' + msg)
  }

  sendSelfUpdate() {
    // Enviar atualização sobre a propria conexão para quem tem o evento update-ip
    console.log('sendSelfUpdate', this.client.id, this.connectionInfo.ip, this.client.origin, this.isSensor)
    this.global.emit(`update-${this.connectionInfo.ip}`, this.connectionInfo)
  }

  sendSensorList(socket = this.global) {
    socket.emit('sensor-list', {
      type: 'UPDATE_CLIENT_LIST',
      message: 'Lista de sensores disponíveis',
      data: {
        list: _.values(sensors).map((s) => s.connectionInfo),
      },
    })
  }

  registerSensor(json) {
    console.log(json)
    this.connectionInfo.id = this.client.id
    this.connectionInfo.ip = json.ip
    this.connectionInfo.origin = json.origin
    this.connectionInfo.sensorName = json.sensorName
    this.connectionInfo.ssid = json.ssid
    this.connectionInfo.password = json.password
    this.connectionInfo.backend = json.backend
    this.connectionInfo.backendPort = json.backendPort
    this.connectionInfo.uuid = uuid(null, null, null)
    // Adiciona ou atualiza o sensor
    // this.client.join(this.client.id)

    sensors[this.client.id] = this

    return this.sendSensorList()
  }

  updateSensor() {
    if (this.isSensor) {
      sensors[this.client.id] = _.merge(sensors[this.client.id], this)
      this.sendSensorList()
    }
  }

  removeSensorList() {
    if (this.isSensor) {
      _.unset(sensors, this.client.id)
      this.sendSensorList()
    }
  }

  // Eventos do sensor
  setCalibrated() {
    this.connectionInfo.calibrated = false
    this.updateSensor()
  }

  setCalibrating() {
    this.connectionInfo.calibrated = true
    this.updateSensor()
  }

  setRunning() {
    this.connectionInfo.started = true
    this.updateSensor()
  }

  setStopped() {
    this.connectionInfo.started = false
    this.updateSensor()
  }
}

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
      content: _.values(sensors).map((s) => s.connectionInfo),
      log: 'Sensor list',
    })
  }

  sensorConnectionClass(io) {
    io.on('connection', async (client) => new Connection(client, io))

    io.of(`/`).adapter.on('create-room', (room) => {
      console.log(`Sala criada: ${room}`)
    })

    io.of(`/`).adapter.on('join-room', (room, id) => {
      console.log(`Entrou na sala: ${room} - o id:  ${id}`)
    })

    io.of(`/`).adapter.on('delete-room', (room) => {
      console.log(`Sala deletada: ${room}`)
      io.to(room).emit('stop-all-room')
      io.to(room).emit('remove-my-room')
      io.in(room).disconnectSockets(true)
    })

    io.of(`/`).adapter.on('leave-room', (room, id) => {
      console.log(`Saiu da sala: ${room} - id:  ${id} `)
      io.to(room).emit('stop-all-room')
    })
  }
})()
