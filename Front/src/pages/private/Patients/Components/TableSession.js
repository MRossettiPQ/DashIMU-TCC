import { Component, Prop, Vue } from "vue-property-decorator";
import MeasurementHistory from "../MeasurementHistory.vue";
import ImportExample from "./ImportExample.vue";
import DialogUtils from "src/commons/utils/DialogUtils";
import { PaginationUtils } from "src/commons/utils/PaginationUtils";

@Component({
  name: "table-session",
  components: { MeasurementHistory },
})
class TableSession extends Vue {
  @Prop()
  id;

  loading = false;
  pagination = [{}];
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
    {
      name: "movement",
      align: "left",
      label: "Movement",
      field: "movement",
      sortable: true,
    },
  ];

  async mounted() {
    try {
      if (this.id !== null) {
        this.pagination = PaginationUtils.create({
          url: `/api/patient/${this.id}/session`,
          infinite: true,
        });
        await this.pagination.search();
      }
    } catch (e) {
      console.log(e);
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
    try {
      console.log("toMeasurement", this.id);
      await this.$router.push({
        path: "session/",
        query: {
          id: this.id,
        },
        params: {
          id: this.id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default TableSession;