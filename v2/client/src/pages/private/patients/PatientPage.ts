import { Component, Mixins, Prop, Ref } from 'vue-property-decorator';
import PatientService from 'src/common/services/PatientService';
import { FormUtils } from 'src/common/utils/FormUtils';
import TableSession from './components/dialog/TableSession.vue';
import { FetchData } from 'src/common/utils/LoadDataUtils';
import { QForm } from 'quasar';
import _ from 'lodash';
import { DialogMixin } from 'src/common/mixins/DialogMixin';
import { Patient } from 'src/common/models/Patient';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';

@Component({
  name: 'patient-page',
  components: {
    TableSession,
  },
})
export default class PatientPage extends Mixins(DialogMixin, ScreenMixin) {
  @Ref('mainForm')
  mainForm?: QForm;

  @Prop()
  id?: number | string;

  bean?: Patient;
  loading = false;

  get newBean() {
    return _.isNil(this.id);
  }

  async mounted() {
    if (this.id) {
      await this.fetchData.fetch({
        id: this.id,
      });
    }
  }

  fetchData = new FetchData({
    load: PatientService.getPatient,
  });

  async save() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.mainForm);
      const bean = <Patient>this.fetchData.result;
      if (bean) {
        this.fetchData.result = await PatientService.postPatient(bean);
        this.hide({ save: true });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}
