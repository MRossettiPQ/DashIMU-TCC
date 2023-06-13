import { Component, Mixins, Prop, PropSync } from 'vue-property-decorator'
import TabMeasurementTable from './TabMeasurementTable.vue'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'third-step',
  components: {
    TabMeasurementTable,
  },
})
export default class ThirdStep extends Mixins(ScreenMixin) {
  @PropSync('connection')
  syncedConnection

  @Prop({ type: Object })
  patient

  tabPanel = 'GRAPH'

  graphColumns = [
    'Roll',
    'Pitch',
    'Yaw',
    // 'Quaternion_X',
    // 'Quaternion_Y',
    // 'Quaternion_Z',
    // 'Quaternion_W',
  ]

  tableColumns = [
    {
      align: 'center',
      field: 'sensorName',
      name: 'sensorName',
      label: 'sensorName',
    },
    {
      align: 'center',
      field: 'numberMensuration',
      name: 'numberMensuration',
      label: 'nº',
      sortable: true,
    },
    {
      align: 'center',
      field: 'Roll',
      name: 'Roll',
      label: 'Roll',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Pitch',
      name: 'Pitch',
      label: 'Pitch',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Yaw',
      name: 'Yaw',
      label: 'Yaw',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_X',
      name: 'Euler_X',
      label: 'Euler X',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_Y',
      name: 'Euler_Y',
      label: 'Euler Y',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_Z',
      name: 'Euler_Z',
      label: 'Euler Z',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Acc_X',
      name: 'Acc_X',
      label: 'Acc_X',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Acc_Y',
      name: 'Acc_Y',
      label: 'Acc_Y',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Acc_Z',
      name: 'Acc_Z',
      label: 'Acc_Z',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_X',
      name: 'Gyr_X',
      label: 'Gyr_X',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_Y',
      name: 'Gyr_Y',
      label: 'Gyr_Y',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_Z',
      name: 'Gyr_Z',
      label: 'Gyr_Z',
      format: (val) => Number(val).toFixed(3),
    },
  ]
}
