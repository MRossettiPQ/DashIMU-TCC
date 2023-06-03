import { Component, Mixins, PropSync } from 'vue-property-decorator';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';
import { SessionController } from 'src/common/utils/SessionController';

@Component({
  name: 'third-step',
})
export default class ThirdStep extends Mixins(ScreenMixin) {
  @PropSync('session')
  syncSession?: SessionController;

  tabPanel = 'GRAPH';

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
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Pitch',
      label: 'Pitch',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Yaw',
      label: 'Yaw',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Quaternion_W',
      label: 'Quaternion_W',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Quaternion_X',
      label: 'Quaternion_X',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Quaternion_Y',
      label: 'Quaternion_Y',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Quaternion_Z',
      label: 'Quaternion_Z',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_X',
      label: 'Euler X',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_Y',
      label: 'Euler Y',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Euler_Z',
      label: 'Euler Z',
      format: (val: number) => Number(val).toFixed(3),
      sortable: true,
    },
    {
      align: 'center',
      field: 'Acc_X',
      label: 'Acc_X',
      format: (val: number) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Acc_Y',
      label: 'Acc_Y',
      format: (val: number) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Acc_Z',
      label: 'Acc_Z',
      format: (val: number) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_X',
      label: 'Gyr_X',
      format: (val: number) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_Y',
      label: 'Gyr_Y',
      format: (val: number) => Number(val).toFixed(3),
    },
    {
      align: 'center',
      field: 'Gyr_Z',
      label: 'Gyr_Z',
      format: (val: number) => Number(val).toFixed(3),
    },
  ];
}
