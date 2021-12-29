import { Component, Prop, Vue } from "vue-property-decorator";
// import { exportFile } from "quasar";

@Component({
  name: "TabTable",
})
class TabTable extends Vue {
  @Prop()
  label;

  @Prop()
  data;

  tabelaColumns = [
    { name: "id", label: "id", field: "id", align: "center" },
    { name: "idSensor", label: "idSensor", field: "idSensor", align: "center" },
    { name: "horaSensor", label: "horaSensor", field: "horaSensor" },
    { name: "numLeitura", label: "numLeitura", field: "numLeitura" },
    { name: "AccelX_Lin", label: "AccelX_Lin", field: "AccelX_Lin" },
    { name: "AccelY_Lin", label: "AccelY_Lin", field: "AccelY_Lin" },
    { name: "AccelZ_Lin", label: "AccelZ_Lin", field: "AccelZ_Lin" },
    { name: "AccelX_mss", label: "AccelX_mss", field: "AccelX_mss" },
    { name: "AccelY_mss", label: "AccelY_mss", field: "AccelY_mss" },
    { name: "AccelZ_mss", label: "AccelZ_mss", field: "AccelZ_mss" },
    { name: "GyroX_rads", label: "GyroX_rads", field: "GyroX_rads" },
    { name: "GyroY_rads", label: "GyroY_rads", field: "GyroY_rads" },
    { name: "GyroZ_rads", label: "GyroZ_rads", field: "GyroZ_rads" },
    { name: "MagX_uT", label: "MagX_uT", field: "MagX_uT" },
    { name: "MagY_uT", label: "MagY_uT", field: "MagY_uT" },
    { name: "MagZ_uT", label: "MagZ_uT", field: "MagZ_uT" },
    { name: "Roll", label: "Roll", field: "Roll" },
    { name: "Pitch", label: "Pitch", field: "Pitch" },
    { name: "Yaw", label: "Yaw", field: "Yaw" },
  ];

  exportTable() {
    console.log(this.data);
    // function wrapCsvValue(val, formatFn) {
    //   let formatted = formatFn !== void 0 ? formatFn(val) : val;
    //   formatted =
    //     formatted === void 0 || formatted === null ? "" : String(formatted);
    //   formatted = formatted.split('"').join('""');
    //   return `"${formatted}"`;
    // }
    //
    // // naive encoding to csv format
    // const content = [this.columns.map((col) => wrapCsvValue(col.label))]
    //   .concat(
    //     data.map((row) =>
    //       this.columns
    //         .map((col) =>
    //           wrapCsvValue(
    //             typeof col.field === "function"
    //               ? col.field(row)
    //               : row[col.field === void 0 ? col.name : col.field],
    //             col.format
    //           )
    //         )
    //         .join(",")
    //     )
    //   )
    //   .join("\r\n");
    // const status = exportFile("table-export.csv", content, "text/csv");
    // if (status !== true) {
    //   this.$q.notify({
    //     message: "Browser denied file download...",
    //     color: "negative",
    //     icon: "warning",
    //   });
    // }
  }
}

export default TabTable;
