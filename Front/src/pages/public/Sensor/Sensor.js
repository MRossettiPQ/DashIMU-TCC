import { Component, Prop, Vue } from "vue-property-decorator";
import { exportFile } from "quasar";

@Component({
  name: "Sensor",
})
class Sensor extends Vue {
  methods = function (message) {
    console.log(this.connection);
    this.connection.send(message);
  };

  data = function () {
    return {
      connection: null,
    };
  };

  created = function () {
    console.log("Criando conexão com websocket");
    this.connection = new WebSocket("wss://localhost:8080/api/socket");

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Conectado com sucesso");
    };

    this.connection.onmessage = function (event) {
      console.log(event);
    };
  };

  tab = "Sensor_1";
  tabGrande = "Tab_1";

  sensores = [
    {
      sensor: {
        ip: "",
        ativo: false,
      },
    },
    {
      sensor: {
        ip: "",
        ativo: false,
      },
    },
    {
      sensor: {
        ip: "",
        ativo: false,
      },
    },
  ];

  conectaSensor(ip_sensor, id) {
    const url = `http://${ip_sensor}:8080/socket/`;
  }

  opcao() {}

  options = {
    chart: {
      id: "vuechart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  };

  // idSensor, horaSensor, numLeitura, AccelX_mss, AccelY_mss, AccelZ_mss, GyroX_rads, GyroY_rads, GyroZ_rads, MagX_uT, MagY_uT, MagZ_uT
  series = [
    { name: "idSensor", data: [30, 40, 45, 50, 49, 60, 70, 91] },
    { name: "horaSensor", data: [35, 45, 45, 120, 76, 89, 95, 95] },
    { name: "numLeitura", data: [40, 75, 25, 80, 61, 69, 85, 85] },
    { name: "AccelX_mss", data: [45, 55, 57, 130, 85, 99, 72, 60] },
    { name: "AccelY_mss", data: [40, 75, 25, 80, 61, 69, 85, 85] },
    { name: "AccelZ_mss", data: [40, 75, 25, 80, 61, 69, 85, 85] },
    { name: "GyroX_rads", data: [40, 75, 25, 80, 61, 69, 85, 85] },
    { name: "GyroY_rads", data: [40, 75, 25, 80, 61, 69, 85, 85] },
    { name: "GyroZ_rads", data: [40, 75, 25, 80, 61, 69, 85, 85] },
    { name: "MagX_uT", data: [40, 75, 25, 80, 61, 69, 85, 85] },
    { name: "MagY_uT", data: [40, 75, 25, 80, 61, 69, 85, 85] },
    { name: "MagZ_uT", data: [40, 75, 25, 80, 61, 69, 85, 85] },
  ];

  tabelaColumns = [
    { name: "idSensor", label: "idSensor", field: "idSensor", align: "center" },
    { name: "horaSensor", label: "horaSensor", field: "horaSensor" },
    { name: "numLeitura", label: "numLeitura", field: "numLeitura" },
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
  tabelaData = [
    {
      idSensor: 1,
      numLeitura: 44315,
      horaLeitura: "00:00",
      AccelX_mss: 0.389548,
      AccelY_mss: -0.246837,
      AccelZ_mss: 9.787989,
      GyroX_rads: -0.004073,
      GyroY_rads: 0.013677,
      GyroZ_rads: 0.076276,
      MagX_uT: 0.331525,
      MagY_uT: 0.157594,
      MagZ_uT: 0.342544,
      Roll: -1.850855,
      Pitch: -2.088984,
      Yaw: 1.896105,
    },
    {
      idSensor: 1,
      numLeitura: 44316,
      horaLeitura: "00:00",
      AccelX_mss: 0.389548,
      AccelY_mss: -0.246837,
      AccelZ_mss: 9.787989,
      GyroX_rads: -0.004073,
      GyroY_rads: 0.013677,
      GyroZ_rads: 0.076276,
      MagX_uT: 0.331525,
      MagY_uT: 0.157594,
      MagZ_uT: 0.342544,
      Roll: -1.850855,
      Pitch: -2.088984,
      Yaw: 1.896105,
    },
  ];

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
    const content = [this.columns.map((col) => wrapCsvValue(col.label))]
      .concat(
        this.tabelaData.map((row) =>
          this.columns
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
    const status = exportFile("table-export.csv", content, "text/csv");
    if (status !== true) {
      this.$q.notify({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning",
      });
    }
  }
}

export default Sensor;
