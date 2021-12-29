import { Component, Vue } from "vue-property-decorator";
import TabGrafico from "./Components/TabGrafico.vue";
import TabTable from "./Components/TabTable.vue";

@Component({
  name: "Sensor",
  components: { TabTable, TabGrafico },
})
class Sensor extends Vue {
  cont = 0;
  tab = "Sensor_1";
  tabGrande = "Tab_1";

  renderRows = [
    {
      name: "horaSensor",
      data: [],
    },
    {
      name: "AccelX_mss",
      data: [],
    },
    {
      name: "AccelY_mss",
      data: [],
    },
    {
      name: "AccelZ_mss",
      data: [],
    },
    {
      name: "GyroX_rads",
      data: [],
    },
    {
      name: "GyroY_rads",
      data: [],
    },
    {
      name: "GyroZ_rads",
      data: [],
    },
    {
      name: "MagX_uT",
      data: [],
    },
    {
      name: "MagY_uT",
      data: [],
    },
    {
      name: "MagZ_uT",
      data: [],
    },
    {
      name: "Roll",
      data: [],
    },
    {
      name: "Pitch",
      data: [],
    },
    {
      name: "Yaw",
      data: [],
    },
    {
      name: "AccelX_Lin",
      data: [],
    },
    {
      name: "AccelY_Lin",
      data: [],
    },
    {
      name: "AccelZ_Lin",
      data: [],
    },
    {
      name: "TESTE",
      data: [],
    },
  ];

  sensores = [
    {
      tab_label: "Sensor 1",
      tab_name: "Sensor_1",
      label: "Conectar Sensor 1",
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        corTab: "",
      },
      data: [],
    },
    {
      tab_label: "Sensor 2",
      tab_name: "Sensor_2",
      label: "Conectar Sensor 2",
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        classTab: "",
      },
      data: [],
    },
    {
      tab_label: "Sensor 3",
      tab_name: "Sensor_3",
      label: "Conectar Sensor 3",
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        classTab: "",
      },
      data: [],
    },
  ];

  conectaSensor(id) {
    let url = `ws://${this.sensores[id].sensor.ip}:8080`;
    this.sensores[id].sensor.connection = new WebSocket(url);

    this.sensores[id].sensor.connection.onmessage = (event) => {
      const jSonParsed = JSON.parse(`[${event.data}]`);
      this.addLeitura(jSonParsed, id);
      // this.closeSocket(id);
    };

    // eslint-disable-next-line no-unused-vars
    this.sensores[id].sensor.connection.onopen = (event) => {
      this.setConectado(id);
      console.log("Conexão com o sensor realizada com websocket...");
    };

    // eslint-disable-next-line no-unused-vars
    this.sensores[id].sensor.connection.onerror = (event) => {
      this.setDesconectado(id);
      console.log("Error no websocket server...");
    };

    // eslint-disable-next-line no-unused-vars
    this.sensores[id].sensor.connection.onclose = (event) => {
      this.setDesconectado(id);
      console.log("Websocket desconectado do server...");
    };
  }

  closeSocket(id) {
    this.sensores[id].sensor.connection.close();
    this.setDesconectado(id);
  }

  addLeitura(data, id) {
    this.sensores[id].data.push(data);

    this.renderRows[1].data = [];
    this.renderRows[2].data = [];
    this.renderRows[3].data = [];
    this.renderRows[4].data = [];
    this.renderRows[5].data = [];
    this.renderRows[6].data = [];
    this.renderRows[7].data = [];
    this.renderRows[8].data = [];
    this.renderRows[9].data = [];
    this.renderRows[10].data = [];
    this.renderRows[11].data = [];
    this.renderRows[12].data = [];
    this.renderRows[13].data = [];
    this.renderRows[14].data = [];
    this.renderRows[15].data = [];
    // eslint-disable-next-line no-unused-vars
    data.map((campo, index) => {
      this.renderRows[1].data.push(campo.AccelX_mss);
      this.renderRows[2].data.push(campo.AccelY_mss);
      this.renderRows[3].data.push(campo.AccelZ_mss);
      this.renderRows[4].data.push(campo.GyroX_rads);
      this.renderRows[5].data.push(campo.GyroY_rads);
      this.renderRows[6].data.push(campo.GyroZ_rads);
      this.renderRows[7].data.push(campo.MagX_uT);
      this.renderRows[8].data.push(campo.MagY_uT);
      this.renderRows[9].data.push(campo.MagZ_uT);
      this.renderRows[10].data.push(campo.Roll);
      this.renderRows[11].data.push(campo.Pitch);
      this.renderRows[12].data.push(campo.Yaw);
      this.renderRows[13].data.push(campo.AccelX_Lin);
      this.renderRows[14].data.push(campo.AccelY_Lin);
      this.renderRows[15].data.push(campo.AccelZ_Lin);
    });

    console.log(this.sensores[id].data);
  }

  printLeitura(id) {
    console.log(this.sensores[id]);
  }

  setConectado(id) {
    this.sensores[id].sensor.corBtn = "positive";
    this.sensores[id].sensor.corTab = "text-green";
    this.sensores[id].sensor.ativo = true;
  }

  setDesconectado(id) {
    this.sensores[id].sensor.corBtn = "primary";
    this.sensores[id].sensor.corTab = "";
    this.sensores[id].sensor.ativo = false;
  }

  sendStart() {
    // eslint-disable-next-line no-unused-vars
    this.sensores.map((item, index) => {
      if (item.sensor.ativo === true) {
        item.sensor.connection.send(JSON.stringify({ cmd: "START" }));
      }
    });
  }

  sendStop() {
    // eslint-disable-next-line no-unused-vars
    this.sensores.map((item, index) => {
      if (item.sensor.ativo === true) {
        item.sensor.connection.send(JSON.stringify({ cmd: "STOP" }));
      }
    });
  }

  sendRestart() {
    // eslint-disable-next-line no-unused-vars
    this.sensores.map((item, index) => {
      if (item.sensor.ativo === true) {
        item.sensor.connection.send(JSON.stringify({ cmd: "RESTART" }));
      }
    });
  }

  sendSave() {}

  options = {
    chart: {
      id: "real-time",
    },
    // animations: {
    //   enabled: true,
    //   easing: "linear",
    //   dynamicAnimation: {
    //     speed: 108,
    //   },
    // },
  };
}

export default Sensor;
