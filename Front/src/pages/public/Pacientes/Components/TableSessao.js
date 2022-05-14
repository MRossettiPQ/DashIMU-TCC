import {Component, Prop, Vue} from 'vue-property-decorator';
import HistoricoMedicao from '../HistoricoMedicao.vue';
import SessaoService from 'src/commons/services/SessaoService';

@Component({
  name: "table-sessao",
  components: { HistoricoMedicao }
})
class TableSessao extends Vue {
  @Prop()
  id;

  loading = false;
  dataTable = [{}];
  filter = "";
  columns = [
    {
      name: "idPaciente",
      align: "left",
      label: "ID Sessão",
      field: "nomePaciente"
    },
    {
      name: "dataSessao",
      align: "left",
      label: "Data Sessão",
      field: "dataSessao"
    }
  ];

  async mounted() {
    if (this.id !== null) {
      await this.tableLoad();
    } else {
      this.dataTable = [{}];
    }
  }



  async tableLoad() {
    try {
      await SessaoService.getListaSessao().then(
        response => {
          this.dataTable = response.data;
        },
        error => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  openDialog(evt, row) {
    this.$q
      .dialog({
        component: HistoricoMedicao,
        id: row.idSessao || null,
        parent: this
      });
  }

  async toMedicao() {
    try {
      // await this.$refs.dialog.hide();
      await this.$router.push({
        path: "sensor/",
        query: {
          idPaciente: this.id
        },
        params: {
          idPaciente: this.id
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default TableSessao;
