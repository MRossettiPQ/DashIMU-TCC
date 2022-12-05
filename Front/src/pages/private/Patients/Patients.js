import { Component, Vue } from "vue-property-decorator";
import Patient from "./Patient.vue";
import { PaginationUtils } from "src/commons/utils/PaginationUtils";
import DialogUtils from "src/commons/utils/DialogUtils";

@Component({
  name: "patients",
  components: { Patient },
})
class Patients extends Vue {
  loading = false;
  filter = "";

  pagination = PaginationUtils.create({
    url: "/api/patient/",
    infinite: true,
  });

  columns = [
    {
      name: "id",
      align: "left",
      label: "ID",
      field: "id",
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

  async mounted() {
    try {
      await this.pagination.search();
    } catch (e) {
      console.log(e);
    }
  }

  async openDialog(evt, row) {
    try {
      const data = await DialogUtils.asyncDialog(Patient, {
        id: row?.id || null,
      });

      if (data?.save) {
        await this.pagination.search();
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default Patients;
