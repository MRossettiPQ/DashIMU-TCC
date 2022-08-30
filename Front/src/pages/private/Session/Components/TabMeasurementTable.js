import {Component, Prop, Vue} from "vue-property-decorator";
import {exportFile} from "quasar";
import moment from "moment";

// import { exportFile } from "quasar";

@Component({
  name: "tab-measurement-table",
})
class TabMeasurementTable extends Vue {
  @Prop()
  paciente;

  @Prop()
  label;

  @Prop({ type: Array, default: [{}] })
  data;
  openFullscreen = false;
  tabelaColumns = [
    { name: "id", label: "id", field: "id", align: "center" },
    { name: "idSensor", label: "idSensor", field: "idSensor", align: "center" },
    { name: "horaLeitura", label: "horaLeitura", field: "horaLeitura" },
    { name: "numLeitura", label: "numLeitura", field: "numLeitura" },
    { name: "Acc_X", label: "Acc_X", field: "Acc_X" },
    { name: "Acc_Y", label: "Acc_Y", field: "Acc_Y" },
    { name: "Acc_Z", label: "Acc_Z", field: "Acc_Z" },
    { name: "AccelX_mss", label: "AccelX_mss", field: "AccelX_mss" },
    { name: "AccelY_mss", label: "AccelY_mss", field: "AccelY_mss" },
    { name: "AccelZ_mss", label: "AccelZ_mss", field: "AccelZ_mss" },
    { name: "Gyr_X", label: "Gyr_X", field: "Gyr_X" },
    { name: "Gyr_Y", label: "Gyr_Y", field: "Gyr_Y" },
    { name: "Gyr_Z", label: "Gyr_Z", field: "Gyr_Z" },
    { name: "Mag_X", label: "Mag_X", field: "Mag_X" },
    { name: "Mag_Y", label: "Mag_Y", field: "Mag_Y" },
    { name: "Mag_Z", label: "Mag_Z", field: "Mag_Z" },
    { name: "Roll", label: "Roll", field: "Roll" },
    { name: "Pitch", label: "Pitch", field: "Pitch" },
    { name: "Yaw", label: "Yaw", field: "Yaw" },
  ];

  get dataTable() {
    return this.data;
  }

  openFullscren() {
    this.openFullscreen = !this.openFullscreen;
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

    // naive encoding to csv format
    const content = [this.tabelaColumns.map((col) => wrapCsvValue(col.label))]
      .concat(
        this.data.map((row) =>
          this.tabelaColumns
            .map((col) =>
              wrapCsvValue(
                typeof col.field === "function"
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
                col.format
              )
            )
            .join(",")
        )
      )
      .join("\r\n");
    const status = exportFile(
      this.paciente.nomePaciente + moment.now() + ".csv",
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
