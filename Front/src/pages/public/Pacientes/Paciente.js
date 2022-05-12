import { Vue, Component, Prop } from "vue-property-decorator";
import PacienteService from "src/commons/services/PacienteService";
import FormUtils from "src/commons/utils/FormUtils";
import HistoricoMedicao from "./HistoricoMedicao.vue";
import TableSessao from "./Components/TableSessao.vue";

@Component({
  name: "paciente",
  components: { HistoricoMedicao, TableSessao }
})
class Paciente extends Vue {
  @Prop()
  id;

  bean = {};
  loading = false;

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

  async save() {
    try {
      this.loading = true;
      await FormUtils.validateAsync(this.$refs.mainForm);

      PacienteService.postPaciente({ data: this.bean }).then(
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
