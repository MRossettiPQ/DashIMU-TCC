import { Component, Mixins, Prop } from 'vue-property-decorator'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'
import TableMeasurements from './components/TableMeasurements.vue'
import GraphSensor from './components/GraphSensor.vue'
import GraphResult from './components/GraphResult.vue'
import GraphAngles from './components/GraphAngles.vue'
import ResultTable from './components/ResultTable.vue'
import { FetchAllData } from 'src/common/utils/LoadDataUtil/FetchAllData'
import SessionService from 'src/common/services/SessionService'
import { ExportCSV } from 'src/common/utils/CSVUtils'
import dayjs from 'dayjs'

@Component({
  name: 'movement-result',
  components: {
    TableMeasurements,
    GraphSensor,
    GraphResult,
    GraphAngles,
    ResultTable,
  },
})
export default class MovementResult extends Mixins(ScreenMixin) {
  @Prop()
  movement

  @Prop()
  sessionId

  tab = null

  exportFile = new ExportCSV()

  fetchData = new FetchAllData({
    loadList: {
      movement: SessionService.getMovement,
      calculation: SessionService.getCalculationVariabilityCenter,
    },
    auto: false,
  })

  async mounted() {
    await this.fetchData.fetchAll({
      movement: {
        options: {
          id: this.sessionId,
          movementId: this.movement.id,
        },
      },
      calculation: {
        options: {
          id: this.sessionId,
          movementId: this.movement.id,
        },
      },
    })
    this.tab = 'RESULT'
  }

  selectTab(tab) {
    this.tab = tab
  }

  exportCSV() {
    for (let sensor of this.fetchData.result.movement.sensors) {
      console.log(sensor)
      const name = sensor.sensorName + '_' + this.movement.type + '_' + dayjs()
      this.exportFile.convertAndExport(sensor.gyro_measurements, name)
    }
  }

  columns = [
    {
      name: 'id',
      align: 'left',
      label: 'ID',
      field: 'id',
      sortable: true,
    },
    {
      align: 'center',
      name: 'sensorName',
      field: 'sensorName',
      label: 'sensorName',
    },
    {
      align: 'center',
      name: 'numberMensuration',
      field: 'numberMensuration',
      label: 'nº',
      sortable: true,
    },
    {
      align: 'center',
      name: 'Roll',
      field: 'Roll',
      label: 'Roll',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Pitch',
      field: 'Pitch',
      label: 'Pitch',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Yaw',
      field: 'Yaw',
      label: 'Yaw',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Euler_X',
      field: 'Euler_X',
      label: 'Euler X',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Euler_Y',
      field: 'Euler_Y',
      label: 'Euler Y',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Euler_Z',
      field: 'Euler_Z',
      label: 'Euler Z',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Acc_X',
      field: 'Acc_X',
      label: 'Acc_X',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      name: 'Acc_Y',
      field: 'Acc_Y',
      label: 'Acc_Y',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      name: 'Acc_Z',
      field: 'Acc_Z',
      label: 'Acc_Z',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      name: 'Gyr_X',
      field: 'Gyr_X',
      label: 'Gyr_X',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      name: 'Gyr_Y',
      field: 'Gyr_Y',
      label: 'Gyr_Y',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      name: 'Gyr_Z',
      field: 'Gyr_Z',
      label: 'Gyr_Z',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      name: 'Quaternion_X',
      field: 'Quaternion_X',
      label: 'Quaternion X',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Quaternion_Y',
      field: 'Quaternion_Y',
      label: 'Quaternion Y',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Quaternion_Z',
      field: 'Quaternion_Z',
      label: 'Quaternion Z',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      name: 'Quaternion_W',
      field: 'Quaternion_W',
      label: 'Quaternion W',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
  ]
}
