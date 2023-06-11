class SessionUtils {
  constructor(type = 'REAL') {
    this.metadata = {}
    this.indexList = []

    this.defaultMovement = {
      index: 0,
      type: '',
      label: '',
      selectedMovementObj: null,
      image: null,
      description: '',
      sensors: [],
    }

    this.defaultSensor = {
      sensorName: '',
      position: '',
      device: {
        active: false,
        measurementInProgress: false,
      },
      file: null,
      gyro_measurements: [],
    }

    this.running_movement = null

    this.values = {
      selectedProcedureObj: null,
      procedure: '',
      type: type,
      movements: [
        // {
        //   ...this.defaultMovement,
        // },
      ],
    }
  }

  restart() {
    this.indexList = []
    this.values = {
      selectedProcedureObj: null,
      procedure: '',
      type: 'REAL',
      movements: [
        {
          ...this.defaultMovement,
        },
      ],
    }
  }

  get addedMovements() {
    return this.values.movements
  }

  setMetadata(metadata) {
    this.metadata = metadata
  }

  get actualRunningMovement() {
    return this.values.movements?.find((m) => m?.index === this.running_movement?.index)
  }

  get procedures() {
    // Procedimentos disponiveis
    return this.metadata?.procedures
  }

  get procedureSelected() {
    // Procedimentos selecionado, referente ao type do procedimento
    return this.values?.procedure !== ''
  }

  get getSelectedProcedure() {
    // Procedimentos selecionado, referente ao objeto no metadata
    return this.values.selectedProcedureObj
  }

  get getPositions() {
    return this.getSelectedProcedure?.sensor_positions
  }

  get getMovementsList() {
    return this.procedures?.find((p) => p.value === this.values?.procedure)?.rules
  }

  findProcedure(procedure) {
    return this.procedures.find((p) => p.value === procedure)
  }

  findMovement(movement) {
    return this.getMovementsList.find((m) => m.value === movement)
  }

  async selectProcedure(procedure) {
    this.values.selectedProcedureObj = this.findProcedure(procedure)
    this.values.movements = []
    this.running_movement = null
    this.indexList = []
  }

  selectMovement(movement, index) {
    const selected = this.findMovement(movement)
    this.values.movements[index].selectedMovementObj = selected
    this.values.movements[index].description = selected.description
    this.values.movements[index].label = selected.movement_name
    if (selected?.image) {
      this.values.movements[index].image = `/procedures/${selected.image}`
    }
  }

  checkIndexInList(checkId = 0) {
    const checked = this.indexList?.findIndex((id) => id === checkId)
    if (checked === -1) {
      return checkId
    }
    return this.checkIndexInList(checkId + 1)
  }

  addMovement() {
    const result = this.checkIndexInList()
    this.indexList.push(result)
    const add = { index: result }
    this.values.movements.push({
      ...this.defaultMovement,
      ...add,
    })
  }

  removeMovement(index) {
    const indexRemoveMemo = this.indexList.findIndex(
      (iL) => iL === this.values?.movements[index].index
    )
    if (indexRemoveMemo !== -1) {
      this.indexList.splice(indexRemoveMemo, 1)
      this.values?.movements?.splice(index, 1)
      if (this.values.movements.length < 1) {
        this.running_movement = null
      }
    }
  }

  get minSensor() {
    return this.values.selectedProcedureObj?.min_sensor
  }

  addSensorsToMovement(sensors) {
    if (this.running_movement?.index >= 0) {
      this.values.movements[this.running_movement.index].sensors = sensors
      this.running_movement = null
    }
  }

  allSessionCompleted() {
    // Se todos os movimentos possuem medições
    this.values?.movements?.forEach((m) => {
      m.sensors?.forEach((s) => {
        s.gyro_measurements.length
      })
    })
  }

  get checkMovementsMeasurements() {
    if (this.values?.movements.length < 1) {
      return true
    }
    return this.values?.movements?.some((m) => {
      if (m.sensors.length < 1) {
        return true
      }
      return m.sensors.some((s) => s.gyro_measurements.length < 1)
    })
  }

  get numberMovements() {
    return this.values?.movements?.length || 0
  }

  get emptyMovements() {
    return this.numberMovements === 0
  }
}

export { SessionUtils }
