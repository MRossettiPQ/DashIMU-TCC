import { Component, Mixins } from 'vue-property-decorator'
import Patient from './PatientDialog.vue'
import DialogUtils from 'src/common/utils/DialogUtils'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'
import { Pagination } from 'src/common/utils/LoadDataUtil/Pagination'
import PatientService from 'src/common/services/PatientService'

@Component({
  name: 'patients-page',
})
export default class PatientsPage extends Mixins(ScreenMixin) {
  loading = false
  term = ''

  pagination = new Pagination({
    load: PatientService.getPatientList,
    auto: true,
  })

  columns = [
    {
      name: 'id',
      align: 'left',
      label: 'ID',
      field: 'id',
      sortable: true,
    },
    {
      name: 'name',
      align: 'left',
      label: 'Nome',
      field: 'name',
    },
    {
      name: 'cpf',
      align: 'left',
      label: 'CPF',
      field: 'cpf',
    },
  ]

  async search() {
    await this.pagination.search()
  }

  async open(evt, row) {
    try {
      const data = await DialogUtils.show(Patient, {
        id: row?.id || null,
      })

      if (data?.save) {
        await this.search()
      }
    } catch (e) {
      console.log(e)
    }
  }

  async beforeDestroy() {
    await this.pagination.abortRequest()
  }

  get isTinyScreen() {
    return this.$q.screen.lt.md
  }
}
