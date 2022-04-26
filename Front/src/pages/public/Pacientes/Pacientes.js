import PacienteService from "src/commons/services/PacienteService";

import { Component, Vue } from "vue-property-decorator";
import Paciente from "./Paciente.vue";

@Component({
  name: "pacientes",
  components: { Paciente }
})
class Pacientes extends Vue {
  loading = false;
  filter = "";
  bean = {};
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
  dataTable = [];

  async mounted() {
    try {
      await this.tableLoad();
    } catch (e) {
      console.log(e);
    }
  }

  async openDialog(evt, row) {
    try {
      const data = await this.$q.dialog({
        component: Paciente,
        id: row.idPaciente || null,
        parent: this
      });
      console.log(data);
      if (data?.save) {
        await this.tableLoad();
      }
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
}

export default Pacientes;
