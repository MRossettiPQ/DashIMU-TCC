import { Component, Mixins, Prop } from 'vue-property-decorator';
import { DialogMixin } from 'src/common/mixins/DialogMixin';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';
import { SensorUtil } from 'src/common/utils/SessionController/SensorUtil';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';

@Component({
  name: 'add-measurement-dialog',
})
export default class AddMeasurementDialog extends Mixins(
  DialogMixin,
  ScreenMixin
) {
  @Prop()
  bean?: SessionUtil;

  @Prop()
  temp?: SensorUtil[];

  procedure = null;
  movement = null;
  selected = null;

  data: unknown[] = [];
  columns: unknown[] = [];

  mounted() {
    console.log(this.bean, this.temp);
  }
}
