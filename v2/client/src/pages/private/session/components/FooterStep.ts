import { Component, PropSync, Ref, Vue } from 'vue-property-decorator';
import { QForm, QPopupProxy } from 'quasar';
import { SessionController } from 'src/common/utils/SessionController';
import { DialogUtils } from 'src/common/utils/DialogUtils';
import AddMeasurementDialog from './AddMeasurementDialog.vue';
import { SensorUtil } from 'src/common/utils/SessionController/SensorUtil';

@Component({
  name: 'footer-step',
})
export default class FooterStep extends Vue {
  @PropSync('session')
  syncSession?: SessionController;

  @PropSync('refForm')
  syncRefForm?: QForm;

  @Ref('menuRef')
  menuRef!: QPopupProxy;

  expanded = false;

  async addMeasurement() {
    try {
      if (
        !this.syncSession?.sockets?.registeredSensorsList
          ?.map((s: SensorUtil) => s)
          ?.every((s: SensorUtil) => s?.size > 0)
      ) {
        return;
      }

      const data = await DialogUtils.show(AddMeasurementDialog, {
        temp: this.syncSession?.sockets.registeredSensorsList,
        bean: this.syncSession?.bean,
      });
      console.log(data);
      if (data) {
        this.syncSession?.applyMeasurement(0, 0);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
