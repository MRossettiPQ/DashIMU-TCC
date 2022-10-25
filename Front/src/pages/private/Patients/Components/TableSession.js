import { Component, Prop, Vue } from "vue-property-decorator";
import MeasurementHistory from "../MeasurementHistory.vue";
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
      name: "idSession",
      align: "left",
      label: "Session nª",
      field: "idSession",
      sortable: true
    },
    {
      name: "date",
      align: "left",
      label: "Date Session",
      field: "date",
      sortable: true
    },
    {
      name: "weight",
      align: "left",
      label: "Weight",
      field: "weight",
    },
    {
      name: "procedure",
      align: "left",
      label: "Procedure",
      field: "procedure",
      sortable: true
    },
    {
      name: "movement",
      align: "left",
      label: "Movement",
      field: "movement",
      sortable: true
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
      const data = await DialogUtils.asyncDialog(MeasurementHistory, {
        id: row.idSession || null,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async toMeasurement() {
    try {
      await this.$router.push({
        path: "session/",
        query: {
          idPatient: this.id,
        },
        params: {
          idPatient: this.id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default TableSession;
