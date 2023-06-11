import { Component, Mixins, Prop } from 'vue-property-decorator';
import { DialogMixin } from 'src/common/mixins/DialogMixin';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';
import { SessionUtil } from 'src/common/utils/SessionController/SessionUtil';
import { ProcedureUtil } from 'src/common/utils/SessionController/ProcedureUtil';
import { MovementUtil } from 'src/common/utils/SessionController/MovementUtil';

interface Dynamic {
  [key: string]: unknown;
}

@Component({
  name: 'check-measurement-dialog',
})
export default class CheckMeasurementDialog extends Mixins(
  DialogMixin,
  ScreenMixin
) {
  @Prop()
  bean?: SessionUtil;

  columns?: unknown[] = [];

  data?: unknown[] = [];

  mounted() {
    this.columns?.push({
      align: 'center',
      field: 'procedure_movement',
      label: 'Procedure - Movement',
    });

    this.bean?.procedures.map((p: ProcedureUtil) => {
      const pName = p.procedure;
      p.movements.map((m: MovementUtil) => {
        const mName = m.movement;

        if (m.sensors) {
          const colSensor: Dynamic = {};
          m.sensors.map((s) => {
            const col = s.sensorName;
            this.columns?.push({
              align: 'center',
              field: col,
              label: col,
            });
          });
          this.data?.push({
            procedure_movement: `${pName} - ${mName}`,
            ...colSensor,
          });
        }
      });
    });
    console.log(this.bean, this.columns, this.data);
  }
}
