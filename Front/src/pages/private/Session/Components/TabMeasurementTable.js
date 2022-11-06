import { Component, Prop, Vue } from "vue-property-decorator";
import { exportFile } from "quasar";
import moment from "moment";

// import { exportFile } from "quasar";

@Component({
  field: "tab-measurement-table",
})
class TabMeasurementTable extends Vue {
  @Prop()
  patient;

  @Prop()
  label;

  @Prop({ type: Array, default: [{}] })
  data;

  openedFullscreen = false;

  tableColumns = [
    {
      align: "center",
      field: "sensorName",
      label: "sensorName",
    },
    { align: "center", field: "numberMensuration", label: "numberMensuration" },
    {
      align: "center",
      field: "Acc_X",
      label: "Acc_X",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Acc_Y",
      label: "Acc_Y",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Acc_Z",
      label: "Acc_Z",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Gyr_X",
      label: "Gyr_X",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Gyr_Y",
      label: "Gyr_Y",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Gyr_Z",
      label: "Gyr_Z",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Roll",
      label: "Roll",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Pitch",
      label: "Pitch",
      format: (val, row) => `${Math.ceil(val)}`,
    },
    {
      align: "center",
      field: "Yaw",
      label: "Yaw",
      format: (val, row) => `${Math.ceil(val)}`,
    },
  ];

  openFullscreen() {
    this.openedFullscreen = !this.openedFullscreen;
  }

  exportTable() {
    function wrapCsvValue(val, formatFn) {
      let formatted = formatFn !== void 0 ? formatFn(val) : val;
      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);
      formatted = formatted.split('"').join('""');
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')
      return `"${formatted}"`;
    }

    // native encoding to csv format
    const content = [this.tableColumns.map((col) => wrapCsvValue(col.label))]
      .concat(
        this.data.map((row) =>
          this.tableColumns
            .map((col) =>
              wrapCsvValue(
                typeof col.field === "function"
                  ? col.field(row)
                  : row[col.field === void 0 ? col.field : col.field],
                col.format
              )
            )
            .join(",")
        )
      )
      .join("\r\n");
    const status = exportFile(
      this.patient.name +
        "_" +
        this.label.replace(/\s/g, "") +
        "_" +
        moment.now() +
        ".csv",
      content,
      "text/csv"
    );
    if (status !== true) {
      this.$q.notify({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

export default TabMeasurementTable;
