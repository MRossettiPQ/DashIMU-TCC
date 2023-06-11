import { Component, Mixins, Prop } from 'vue-property-decorator';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';
import { GyroMeasurementUtil } from 'src/common/utils/SessionController/GyroMeasurementUtil';
import { ColumnOption } from 'src/common/utils/ChartUtils';

@Component({
  name: 'measurement-table',
})
export default class MeasurementTable extends Mixins(ScreenMixin) {
  @Prop()
  measurements!: GyroMeasurementUtil[];

  @Prop()
  tableColumns?: ColumnOption[];
}
