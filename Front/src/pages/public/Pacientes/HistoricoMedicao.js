import { Vue, Component, Prop } from "vue-property-decorator";
import SessaoService from "src/commons/services/SessaoService";

@Component({
  name: "historico-medicao"
})
class HistoricoMedicao extends Vue {
  @Prop()
  id;

  bean = {};
  loading = false;
  dataTable = [];
  filter = "";
  rowCount = 10;
  columns = [
    {
      name: "nomePaciente",
      align: "left",
      label: "Nome",
      field: "nomePaciente"
    },
    {
      name: "idPaciente",
      align: "left",
      label: "ID Paciente",
      field: "nomePaciente"
    },
    {
      name: "cpfPaciente",
      align: "left",
      label: "CPF",
      field: "cpfPaciente"
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

  async dataLoad(id) {
    try {
      const result = await SessaoService.getListaSessao().then(
        response => {
          this.content = response.data;
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

  medicao() {
    try {
      this.$router.push("/sensor");
    } catch (e) {
      console.log(e);
    }
  }
}

export default HistoricoMedicao;
