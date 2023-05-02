import { Component, Vue } from "vue-property-decorator";
import Patient from "./Patient.vue";
import DialogUtils from "src/commons/utils/DialogUtils";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";
import PatientService from "src/commons/services/PatientService";

@Component({
  name: "patients",
  components: { Patient },
})
class Patients extends Vue {
  loading = false;
  term = "";

  pagination = LoadDataUtils.pagination({
    toLoad: PatientService.getPatientList,
    auto: true,
  });

  columns = [
    {
      name: "id",
      align: "left",
      label: "ID",
      field: "id",
      sortable: true,
    },
    {
      name: "name",
      align: "left",
      label: "Nome",
      field: "name",
    },
    {
      name: "cpf",
      align: "left",
      label: "CPF",
      field: "cpf",
    },
  ];

  async search() {
    await this.pagination.search();
  }

  async openDialog(evt, row) {
    try {
      const data = await DialogUtils.asyncDialog(Patient, {
        id: row?.id || null,
      });

      if (data?.save) {
        await this.search();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async beforeDestroy() {
    await this.pagination.abortRequest();
  }
}

export default Patients;
