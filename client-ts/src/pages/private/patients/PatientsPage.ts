import { Component, Vue } from 'vue-property-decorator';
import { Pagination } from 'src/common/utils/LoadDataUtils';
import PatientService from 'src/common/services/PatientService';
import { DialogUtils } from 'src/common/utils/DialogUtils';
import PatientPage from './PatientPage.vue';
import { Patient } from 'src/common/models/Patient';

@Component({
  name: 'patients-page',
})
export default class PatientsPage extends Vue {
  loading = false;
  term = '';

  pagination = new Pagination({
    load: PatientService.getPatientList,
  });

  list = [
    {
      id: 1,
      name: 'nome',
      cpf: 'cpf',
    },
  ];

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
  ];

  async mounted() {
    await this.search();
  }

  async search() {
    await this.pagination.search();
  }

  async open(evt: unknown, row: Patient) {
    try {
      const data = await DialogUtils.show(PatientPage, {
        id: row?.id || null,
      });

      type ResultKey = keyof typeof data;
      const optKey = 'save' as ResultKey;
      if (optKey) {
        await this.search();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async beforeDestroy() {
    await this.pagination.abortRequest();
  }

  get isTinyScreen() {
    return this.$q.screen.lt.md;
  }
}
