import { Component, Mixins, Prop, Ref } from 'vue-property-decorator'
import PatientService from 'src/common/services/PatientService'
import { FormUtils } from 'src/common/utils/FormUtils'
import TableSession from './components/patient/TableSession.vue'
import { FetchData } from 'src/common/utils/LoadDataUtil/FetchData'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'
import { DialogMixin } from 'src/common/mixins/DialogMixin'
import _ from 'lodash'

@Component({
  name: 'patient-dialog',
  components: { TableSession },
})
class PatientDialog extends Mixins(ScreenMixin, DialogMixin) {
  @Ref('mainForm')
  mainForm

  @Prop({ default: null })
  id

  loading = false

  async mounted() {
    if (this.id) {
      await this.fetchData.fetch({ id: this.id })
    }
  }

  fetchData = new FetchData({
    load: PatientService.getPatient,
  })

  async save() {
    try {
      this.loading = true
      await FormUtils.validateAsync(this.mainForm)
      const bean = this.fetchData.result
      this.fetchData.result = await PatientService.postPatient(bean)
      this.hide({ save: true })
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  get newBean() {
    return _.isNil(this.id)
  }
}

export default PatientDialog
