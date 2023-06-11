import { Component, Mixins, Prop } from 'vue-property-decorator'
import TabMeasurementTable from './Components/TabMeasurementTable/TabMeasurementTable.vue'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'run-procedure',
  components: {
    TabMeasurementTable,
  },
})
class RunProcedure extends Mixins(ScreenMixin) {
  @Prop()
  sessionConnection

  @Prop({ type: Object })
  patient

  tabPanel = 'GRAPH'

  tableColumns = [
    {
      align: 'center',
      field: 'sensorName',
      label: 'sensorName',
    },
    {
      align: 'center',
      field: 'numberMensuration',
      label: 'nº',
      sortable: true,
    },
    {
      align: 'center',
      field: 'Roll',
      label: 'Roll',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Pitch',
      label: 'Pitch',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Yaw',
      label: 'Yaw',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_X',
      label: 'Euler X',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_Y',
      label: 'Euler Y',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_Z',
      label: 'Euler Z',
      format: (val) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Acc_X',
      label: 'Acc_X',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Acc_Y',
      label: 'Acc_Y',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Acc_Z',
      label: 'Acc_Z',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_X',
      label: 'Gyr_X',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_Y',
      label: 'Gyr_Y',
      format: (val) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_Z',
      label: 'Gyr_Z',
      format: (val) => Number(val).toFixed(3),
    },
  ]
}

export default RunProcedure
