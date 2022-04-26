import { Vue, Component, Prop } from "vue-property-decorator";
import PacienteService from "src/commons/services/PacienteService";
import FormUtils from "src/commons/utils/FormUtils";
import HistoricoMedicao from "./HistoricoMedicao.vue";

@Component({
  name: "paciente",
  components: { HistoricoMedicao }
})
class Paciente extends Vue {
  @Prop()
  id;

  bean = {};
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

  show() {
    this.$refs.dialog.show();
  }

  hide() {
    this.$refs.dialog.hide();
  }

  async mounted() {
    if (this.id !== null) {
      await this.dataLoad(this.id);
    } else {
      this.bean = {};
    }
  }

  openDialog(evt, row) {
    this.$q
      .dialog({
        component: HistoricoMedicao,
        id: row.idSessao || null,
        parent: this
      })
      .onOk(() => {
        console.log("OK");
      })
      .onCancel(() => {
        console.log("Cancel");
      })
      .onDismiss(() => {
        console.log("Called on OK or Cancel");
      });
  }

  dataLoad(id) {
    try {
      PacienteService.getPaciente(id).then(
        response => {
          this.content = response.data;
          this.bean = response.data;
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

  async tableLoad() {
    try {
      const result = await PacienteService.getListaPaciente().then(
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

  async save() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);

      const idUser = this.$store.state.autenticacao.user.idUser;

      PacienteService.postPaciente({ id: idUser, data: this.bean }).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );

      this.$refs.dialog.hide({ save: true });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}

export default Paciente;
