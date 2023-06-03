import { Component, Mixins, PropSync } from 'vue-property-decorator';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';
import { SessionController } from 'src/common/utils/SessionController';
import { DialogUtils } from 'src/common/utils/DialogUtils';
import CheckMeasurementDialog from '../components/CheckMeasurementDialog.vue';

@Component({
  name: 'right-menu',
})
export default class RightMenu extends Mixins(ScreenMixin) {
  @PropSync('session')
  syncSession?: SessionController;

  get inDev() {
    return process.env.DEV;
  }

  async checkMeasurement() {
    try {
      const data = await DialogUtils.show(CheckMeasurementDialog, {
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
