import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { SensorUtil } from 'src/common/utils/SessionController/SensorUtil';
import {
  BackEndSocketUtil,
  SessionController,
} from 'src/common/utils/SessionController';

@Component({
  name: 'sensor',
})
export default class Sensor extends Vue {
  @PropSync('session')
  syncSession!: SessionController;

  @PropSync('sensor')
  syncSensor?: SensorUtil;

  @PropSync('socket')
  syncSocket?: BackEndSocketUtil;

  @Prop()
  order?: number;

  get menuSensor() {
    return [
      {
        label: 'Calibrate',
        icon: 'iso',
      },
    ];
  }

  positionValidator(actual: SensorUtil) {
    return (value: string) => {
      return (
        !this.syncSession.sockets.registeredSensorsList
          ?.filter((sensor: SensorUtil) => sensor.ip !== actual.ip)
          ?.some((sensor: SensorUtil) => sensor.position === value) ||
        'Já está configurada em outro sensor'
      );
    };
  }
}
