import {Component, Prop, Vue} from "vue-property-decorator";
import SessaoService from "src/commons/services/SessaoService";
import DialogHeader from "../../../components/DialogHeader/DialogHeader.vue";

@Component({
  name: "historico-medicao",
  components: {DialogHeader}
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
      this.dataTable = await SessaoService.getListaSessao();
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
