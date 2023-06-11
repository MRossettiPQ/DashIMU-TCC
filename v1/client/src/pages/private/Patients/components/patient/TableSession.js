import { Component, Mixins, Prop } from 'vue-property-decorator'
import { LoadDataUtils } from 'src/common/utils/LoadDataUtils'
import PatientService from 'src/common/services/PatientService'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'

@Component({
  name: 'table-session',
})
class TableSession extends Mixins(ScreenMixin) {
  @Prop()
  id

  loading = false

  pagination = LoadDataUtils.pagination({
    toLoad: PatientService.getMensurationList,
    infinite: true,
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

  async openImportExample() {
    // try {
    //   const data = await DialogUtils.show(ImportExample, {
    //     id: this.id || null,
    //   });
    //   if (data?.save) {
    //     await this.pagination.search();
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  async toMeasurement() {
    await this.$router.push({
      path: `session/${this.id}`,
    })
  }
}

export default TableSession
