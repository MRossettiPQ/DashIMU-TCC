import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';
import { SensorUtil } from 'src/common/utils/SessionController/SensorUtil';
import { BackEndSocketUtil } from 'src/common/utils/SessionController';

@Component({
  name: 'sensor',
})
export default class Sensor extends Vue {
  @PropSync('session')
  syncSession?: SessionUtil;

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
}
