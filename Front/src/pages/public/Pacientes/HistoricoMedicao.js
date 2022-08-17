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
      name: "name",
      align: "left",
      label: "Nome",
      field: "name"
    },
    {
      name: "idPatient",
      align: "left",
      label: "ID Paciente",
      field: "idPatient"
    },
    {
      name: "cpf",
      align: "left",
      label: "CPF",
      field: "cpf"
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
    }
 else {
      this.bean = {};
    }
  }

  async dataLoad(id) {
    try {
      this.dataTable = await SessaoService.getListaSessao();
    }
 catch (e) {
      console.log(e);
    }
  }

  medicao() {
    try {
      this.$router.push("/sensor");
    }
 catch (e) {
      console.log(e);
    }
  }
}

export default HistoricoMedicao;
