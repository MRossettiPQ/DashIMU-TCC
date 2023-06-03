import { Component, Mixins, PropSync } from 'vue-property-decorator';
import { Pagination } from 'src/common/utils/LoadDataUtils';
import PatientService from 'src/common/services/PatientService';
import SessionPage from '../../SessionPage.vue';
import { DialogUtils } from 'src/common/utils/DialogUtils';
import { SessionBean } from 'src/common/models/Session';
import { ScreenMixin } from 'src/common/mixins/ScreenMixin';

@Component({
  name: 'table-session',
})
export default class PatientPage extends Mixins(ScreenMixin) {
  @PropSync('id')
  idSync?: number | null;

  loading = false;

  term?: string = '';

  pagination = new Pagination({
    load: PatientService.getSessionList,
    infinite: true,
  });

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
    // {
    //   name: 'procedure',
    //   align: 'left',
    //   label: 'Procedure',
    //   field: 'procedure',
    //   sortable: true,
    // },
  ];

  async mounted() {
    if (this.idSync) {
      await this.pagination.search({
        options: {
          idPatient: this.idSync,
        },
      });
    }
  }

  async open(evt: unknown, row: SessionBean) {
    try {
      await DialogUtils.show(SessionPage, {
        id: row.id || null,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async openImportExample() {
    try {
      // const data = await DialogUtils.show(ImportExample, {
      //   id: this.id || null,
      // });
      // if (data?.save) {
      //   await this.pagination.search();
      // }
    } catch (e) {
      console.log(e);
    }
  }

  async toMeasurement() {
    await this.$router.push({
      path: `session/${this.idSync}`,
    });
  }
}
