import { Component, Mixins, Prop } from 'vue-property-decorator'
import { Pagination } from 'src/common/utils/LoadDataUtil/Pagination'
import PatientService from 'src/common/services/PatientService'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'table-session',
})
class TableSession extends Mixins(ScreenMixin) {
  @Prop()
  id

  loading = false

  pagination = new Pagination({
    load: PatientService.getMensurationList,
  })

  term = ''

  columns = [
    {
      name: 'id',
      align: 'left',
      label: 'Session nª',
      field: 'id',
      sortable: true,
    },
    {
      name: 'date',
      align: 'left',
      label: 'Date Session',
      field: 'date',
      sortable: true,
    },
    {
      name: 'procedure',
      align: 'left',
      label: 'Procedure',
      field: 'procedure',
      sortable: true,
    },
  ]

  async mounted() {
    if (this.id) {
      await this.pagination.search({
        options: {
          idPatient: this.id,
        },
      })
    }
  }

  async open(evt, row) {
    await this.$router.push({
      path: `result/${row.id}`,
    })
  }

  async session() {
    await this.$router.push({
      path: `/session/${this.id}`,
    })
  }
}

export default TableSession
