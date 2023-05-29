import { Component, Prop, Vue } from "vue-property-decorator";
import MeasurementHistory from "./MeasurementHistory.vue";
import ImportExample from "./ImportExample.vue";
import DialogUtils from "src/commons/utils/DialogUtils";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";
import PatientService from "src/commons/services/PatientService";

@Component({
  name: "table-session",
  components: { MeasurementHistory },
})
class TableSession extends Vue {
  @Prop()
  id;

  loading = false;
  pagination = LoadDataUtils.pagination({
    toLoad: PatientService.getMensurationList,
    infinite: true,
  });

  filter = "";

  columns = [
    {
      name: "id",
      align: "left",
      label: "Session nª",
      field: "id",
      sortable: true,
    },
    {
      name: "date",
      align: "left",
      label: "Date Session",
      field: "date",
      sortable: true,
    },
    {
      name: "procedure",
      align: "left",
      label: "Procedure",
      field: "procedure",
      sortable: true,
    },
  ];

  async mounted() {
    if (this.id) {
      await this.pagination.search({
        options: {
          idPatient: this.id,
        },
      });
    }
  }

  async openDialog(evt, row) {
    try {
      await DialogUtils.asyncDialog(MeasurementHistory, {
        id: row.id || null,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async openImportExample() {
    try {
      const data = await DialogUtils.asyncDialog(ImportExample, {
        id: this.id || null,
      });
      if (data?.save) {
        await this.pagination.search();
      }
    } catch (e) {
      console.log(e);
    }
  }

  get isMobile() {
    return this.$q.platform.is.mobile;
  }

  async toMeasurement() {
    await this.$router.push({
      path: `n-session/${this.id}`,
    });
  }
}

export default TableSession;
