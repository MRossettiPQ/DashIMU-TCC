import { Component, Ref, Vue } from 'vue-property-decorator';
import { QDialog } from 'quasar';
import { DialogPayload } from 'src/common/utils/DialogUtils';

@Component
export class DialogMixin extends Vue {
  @Ref('dialog')
  dialog?: QDialog;

  show() {
    this.dialog?.show();
  }

  hide(payload: DialogPayload) {
    this.$emit('ok', payload ? payload : true);
    this.dialog?.hide();
  }
}
