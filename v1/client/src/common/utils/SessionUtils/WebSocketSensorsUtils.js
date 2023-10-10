import { Notify } from 'quasar'
import dayjs from 'dayjs'

const openMessage = '[WebSocket] Conexão com o sensor feita com websocket'
const closeMessage = '[WebSocket] Websocket desconectado do servidor'
const errorMessage = '[WebSocket] Erro no servidor websocket'

class SessionWebSocket {
  // Session
  connection = null
  availableSensorsList = []
  registeredSensorsList = []
  registeredSensorsIdList = []

  // Command
  sessionLoadingRequest = false
  connectedBackend = false
  disableStart = false
  disableStop = true
  disableRestart = true
  measurementInProgress = false

  // Timing
  timeout = null
  runTimer = null
  time = null

  useAlarm = false
  alarmTime = 0

  // General
  notify(message, color) {
    Notify.create({
      message,
      color,
      textColor: 'white',
    })
  }

  sendSocketMessage(socket, type, message = null) {
    if (socket !== null) {
      socket?.send(JSON.stringify({ origin: 'FRONT', type, message }))
    }
  }

  // Session handler socket
  // Computed
  get loadingRequest() {
    return this.sessionLoadingRequest
  }

  get numberOfMeasurements() {
    return this.registeredSensorsList?.[0]?.gyro_measurements?.length || 0
  }

  calculateQuaternionAngle(gyro_measurement_1, gyro_measurement_2) {
    // Verifica se as medições possuem os valores do quaternion
    if (
      gyro_measurement_1.Quaternion_X == null ||
      gyro_measurement_1.Quaternion_Y == null ||
      gyro_measurement_1.Quaternion_Z == null ||
      gyro_measurement_1.Quaternion_W == null ||
      gyro_measurement_2.Quaternion_X == null ||
      gyro_measurement_2.Quaternion_Y == null ||
      gyro_measurement_2.Quaternion_Z == null ||
      gyro_measurement_2.Quaternion_W == null
    ) {
      return null
    }

    const q1 = {
      x: gyro_measurement_1.Quaternion_X,
      y: gyro_measurement_1.Quaternion_Y,
      z: gyro_measurement_1.Quaternion_Z,
      w: gyro_measurement_1.Quaternion_W,
    }

    const q2 = {
      x: gyro_measurement_2.Quaternion_X,
      y: gyro_measurement_2.Quaternion_Y,
      z: gyro_measurement_2.Quaternion_Z,
      w: gyro_measurement_2.Quaternion_W,
    }
    // Calcula o produto escalar entre os dois quaternions
    const dotProduct = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w

    // O ângulo entre os dois quaternions é o arco cosseno do produto escalar
    const angle = 2 * Math.acos(Math.abs(dotProduct))

    // Converte o ângulo para graus
    return angle * (180 / Math.PI)
  }

  get blockSave() {
    return this.measurementInProgress
  }

  get inProgress() {
    return this.measurementInProgress
  }

  get isConnectedBackend() {
    return this.connectedBackend
  }

  get timeRunning() {
    return this.time
  }

  get disableStartBtn() {
    return this.disableStart || this.numberOfMeasurements > 0
  }

  get disableStopBtn() {
    return this.disableStop
  }

  get disableRestartBtn() {
    return this.disableRestart
  }

  // Function
  connectSession(socket_url = 'localhost:8000') {
    console.log(socket_url)
    this.connection = new WebSocket(`ws://${socket_url}/socket`, ['websocket'])

    this.connection.onmessage = async (event) => {
      if (event?.data) {
        await this.manageBackend(JSON.parse(event?.data))
      }
    }

    this.connection.onopen = () => {
      this.connectedBackend = true
      this.sendSocketMessage(this.connection, 'GET_UPDATE_CLIENT_LIST')
      this.notify(openMessage, 'positive')
    }

    this.connection.onclose = () => {
      this.notify(closeMessage, 'warning')
      this.connectedBackend = false
    }

    this.connection.onerror = () => {
      this.notify(errorMessage, 'error')
      this.connection.close()
      this.connectedBackend = false
    }
  }

  requestAvailableSensors() {
    this.sendSocketMessage(this.connection, 'GET_UPDATE_CLIENT_LIST')
    this.sessionLoadingRequest = true
  }

  async manageBackend(json) {
    switch (json?.type) {
      case 'UPDATE_CLIENT_LIST':
        this.availableSensorsList = json?.message
        this.sessionLoadingRequest = false
        break
      case 'SENSOR_DISCONNECTED':
        await this.checkIfConnectedSession(json?.message)
        break
      default:
        break
    }
  }

  async updateSensor({ position, sensor }) {
    const result = this.getIndexSensorInConnectedList(sensor)
    if (this.inProgress) {
      await this.stop()
      await this.restart()
    }
    this.registeredSensorsList[result].position = position
  }

  // Sensors handler socket
  get numberOfValidConnection() {
    return this.registeredSensorsList?.filter((s) => s.active)?.length
  }

  get filterSensorsConnected() {
    return this.availableSensorsList?.filter(({ ip }) => this.checkSensorConnected(ip))
  }

  checkSensorConnected(ip) {
    return this.registeredSensorsList?.findIndex((s) => s.ip === ip) === -1
  }

  async checkIfConnectedSession(sensor) {
    const result = this.getIndexSensorInConnectedList(sensor)
    if (result !== -1) {
      Notify.create({
        message: 'Um sensor conectado a está sessão foi desconectado inesperadamente',
        textColor: 'white',
        color: 'error',
      })
      // Parar processo de medição atual, caso esteja em andamento.
      await this.stop()
      if (this.registeredSensorsList[result].gyro_measurements.length === 0) {
        // Caso o sensor desconectado não tenha medições remover ele da lista
        await this.remove(sensor)
      }
    }
  }

  getIndexSensorInConnectedList(sensor) {
    return this.registeredSensorsList?.findIndex((s) => s.ip === sensor.ip)
  }

  checkIdInList(checkId = 0) {
    const checked = this.registeredSensorsIdList?.findIndex((sessionId) => sessionId === checkId)
    if (checked === -1) {
      return checkId
    }
    return this.checkIdInList(checkId + 1)
  }

  async connect(sensor) {
    // TODO socket do sensor
    // Verifica se o sensor já realizou alguma conexão anteriormente
    const isNew = this.getIndexSensorInConnectedList(sensor)
    if (isNew === -1) {
      // Caso não tenha realizado uma conexão anteriormente, adiciona ao array de sensores da sessão
      // Verifica e encontra o id do sensor na sessão
      const sessionId = this.checkIdInList()
      this.registeredSensorsIdList.push(sessionId)
      const newSensor = {
        sessionId,
        active: false,
        measurementInProgress: false,
        connection: null,
        sensorName: sensor.sensorName,
        tabName: 'Sensor_' + sessionId,
        position: '',
        gyro_measurements: [],
        ...sensor,
      }
      this.registeredSensorsList.push(newSensor)
    }

    // Resgata o index do sensor na lista de conectados para trabalhar diretamente com item especifico
    const index = this.getIndexSensorInConnectedList(sensor)

    let url = `ws://${this.registeredSensorsList[index].ip}:80/socket/session`
    this.registeredSensorsList[index].connection = new WebSocket(url, ['websocket'])
    // Event listener
    this.registeredSensorsList[index].connection.onmessage = (event) => {
      this.manageSensor(JSON.parse(event?.data), index)
    }

    this.registeredSensorsList[index].connection.onclose = () => {
      this.notify(closeMessage + ' do sensor', 'warning')
      this.setDisconnected(index)
      this.stop()
    }

    this.registeredSensorsList[index].connection.onerror = () => {
      this.notify(errorMessage + ' do sensor', 'error')
      this.setDisconnected(index)
      this.stop()
      this.registeredSensorsList[index].connection.close()
    }

    this.registeredSensorsList[index].connection.onopen = () => {
      this.notify(openMessage + ' do sensor', 'positive')
      this.setConnected(index)
    }
  }

  async disconnect(sensor) {
    const index = this.getIndexSensorInConnectedList(sensor)
    this.registeredSensorsList[index].connection?.close()
    await this.remove(sensor)
  }

  async closeAll() {
    return new Promise((resolve) => {
      // Chamado ao sair da pagina.
      if (this.registeredSensorsList.length) {
        this.stop()
        this.registeredSensorsList?.forEach((sensor) => {
          try {
            sensor.connection?.close()
          } catch (e) {
            console.log(e)
          }
        })
      }
      if (this.timeout !== null) {
        this.endTimer()
      }
      this.connection?.close()
      resolve()
    })
  }

  async remove(sensor) {
    const index = this.getIndexSensorInConnectedList(sensor)
    if (this.inProgress) {
      await this.stop()
      await this.restart()
    }
    this.registeredSensorsList.splice(index, 1)
    this.registeredSensorsIdList.splice(index, 1)
  }

  manageSensor(json, index) {
    switch (json?.type) {
      case 'MEASUREMENT_LIST':
        this.addMensuration(json?.message, index)
        break
      default:
        break
    }
  }

  addMensuration(json, index) {
    if (json?.length && this.registeredSensorsList[index]) {
      this.registeredSensorsList[index].gyro_measurements =
        this.registeredSensorsList[index].gyro_measurements?.concat(json)
    }
  }

  setDisconnected(index) {
    if (this.registeredSensorsList[index]) {
      this.registeredSensorsList[index].active = false
    }
  }

  setConnected(index) {
    if (this.registeredSensorsList[index]) {
      this.registeredSensorsList[index].active = true
    }
  }

  async start() {
    try {
      if (this.useAlarm && this.alarmTime < 1) {
        Notify.create({
          message: 'O valor do timer deve ser maior que 0',
          textColor: 'white',
          color: 'warning',
        })
        return
      }
      let changed = false

      this.registeredSensorsList.map((item, index) => {
        if (this.registeredSensorsList[index].active === true) {
          try {
            this.sendSocketMessage(this.registeredSensorsList[index]?.connection, 'START', {
              cmd: 1,
            })
          } catch (e) {
            console.log(e)
            stop()
          }
          this.registeredSensorsList[index].measurementInProgress = true
          this.measurementInProgress = true
          changed = true
        }
      })
      if (changed) {
        this.startTimer()
        this.disableStart = true
        this.disableStop = false
        this.disableRestart = false
        this.disablePrev = true
      }
    } catch (e) {
      console.log(e)
    }
  }

  async restart() {
    let changed = false
    this.registeredSensorsList.map((item, index) => {
      if (this.registeredSensorsList[index].active === true) {
        try {
          this.sendSocketMessage(this.registeredSensorsList[index]?.connection, 'RESTART', {
            cmd: 3,
          })
        } catch (e) {
          console.log(e)
          stop()
        }
      }
      this.registeredSensorsList[index].measurementInProgress = false
      this.measurementInProgress = false
      this.registeredSensorsList[index].gyro_measurements = []
      changed = true
    })
    if (changed) {
      this.endTimer()
      this.disableStart = false
      this.disableStop = true
      this.disableRestart = true
      this.disablePrev = false
    }
  }

  async stop() {
    let changed = false
    this.registeredSensorsList.map((item, index) => {
      if (this.registeredSensorsList[index].active === true) {
        try {
          this.sendSocketMessage(this.registeredSensorsList[index]?.connection, 'STOP', {
            cmd: 2,
          })
        } catch (e) {
          console.log(e)
        }
      }
      this.registeredSensorsList[index].measurementInProgress = false
      this.measurementInProgress = false
      changed = true
    })
    if (changed) {
      this.endTimer()
      this.disableStart = false
      this.disableStop = true
      this.disableRestart = false
      this.disablePrev = false
    }
  }

  startTimer() {
    this.runTimer = 0
    this.time = null

    this.timeout = setInterval(async () => {
      this.runTimer = this.runTimer + 1
      this.time = dayjs()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', this.runTimer)
        .format('HH:mm:ss')

      if (this.useAlarm) {
        if (this.runTimer >= this.alarmTime) {
          await this.stop()
          this.useAlarm = false
        }
      }
    }, 1000)
  }

  endTimer() {
    clearTimeout(this.timeout)
    this.timeout = null
    this.runTimer = null
    this.time = null
  }

  addTestReading(sensorN = 2) {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min
    }

    if (this.registeredSensorsList.length === 0) {
      let addIterator = 0
      while (addIterator < sensorN) {
        addIterator++
        const sessionId = this.registeredSensorsList.length
        this.registeredSensorsList.push({
          sessionId,
          active: true,
          measurementInProgress: false,
          ip: `192.168.16.10${sessionId}`,
          connection: null,
          sensorName: 'Sensor_' + sessionId,
          position: '',
          tabName: 'Sensor_' + sessionId,
          gyro_measurements: [],
        })
      }
      this.disableRestart = false
    }

    let iterator = 0
    while (iterator < 365) {
      iterator++
      this.registeredSensorsList?.map((sensor, index) => {
        const number = sensor.gyro_measurements.length ? sensor.gyro_measurements.length : 0
        sensor.gyro_measurements.push({
          sensorName: sensor.sensorName,
          hourMensuration: index,
          numberMensuration: number,
          Acc_X: index,
          Acc_Y: index,
          Acc_Z: index,
          AccelX_mss: index,
          AccelY_mss: index,
          AccelZ_mss: index,
          Gyr_X: index,
          Gyr_Y: index,
          Gyr_Z: index,
          Mag_X: index,
          Mag_Y: index,
          Mag_Z: index,
          Roll: getRandomArbitrary(90, 80),
          Pitch: getRandomArbitrary(90, 70),
          Yaw: getRandomArbitrary(90, 70),
          Quaternion_X: getRandomArbitrary(90, 70),
          Quaternion_Y: getRandomArbitrary(90, 70),
          Quaternion_Z: getRandomArbitrary(90, 70),
          Quaternion_W: getRandomArbitrary(90, 70),
          Euler_X: getRandomArbitrary(90, 70),
          Euler_Y: getRandomArbitrary(90, 70),
          Euler_Z: getRandomArbitrary(90, 70),
        })
      })
    }
  }

  // igualarArraysInternos(arrays) {
  //   // Encontra o tamanho máximo entre os arrays internos
  //   const maxLength = arrays.reduce((max, arr) => Math.max(max, arr.length), 0)
  //
  //   // Remove os itens extras em cada array interno
  //   arrays.forEach((arr) => {
  //     while (arr.length > maxLength) {
  //       arr.pop() // Remove o último elemento do array interno
  //     }
  //   })
  // }
}

export { SessionWebSocket }
