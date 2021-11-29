import { Component, Vue } from "vue-property-decorator";
import TabGrafico from "./Components/TabGrafico.vue";
import TabTable from "./Components/TabTable.vue";

@Component({
  name: "Sensor",
  components: {
    TabGrafico,
    TabTable,
  },
})
class Sensor extends Vue {
  tab = "Sensor_1";
  tabGrande = "Tab_1";

  renderRows = [
    {
      sensor: "Sensor_1",
      type: "line",
      data: [],
    },
    {
      sensor: "Sensor_2",
      type: "line",
      data: [],
    },
    {
      sensor: "Sensor_3",
      type: "line",
      data: [],
    },
  ];

  sensores = [
    {
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        corTab: "",
      },
      data: [],
      series: [
        {
          type: "line",
          data: [],
        },
      ],
    },
    {
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        classTab: "",
      },
      data: [],
      series: [
        {
          type: "line",
          data: [],
        },
      ],
    },
    {
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        classTab: "",
      },
      data: [],
      series: [
        {
          type: "line",
          data: [],
        },
      ],
    },
  ];

  conectaSensor(id) {
    let url = `ws://${this.sensores[id].sensor.ip}:8080`;
    this.sensores[id].sensor.connection = new WebSocket(url);

    this.sensores[id].sensor.connection.onmessage = (event) => {
      const jSonParsed = JSON.parse(`[${event.data}]`);
      console.log(jSonParsed);
      this.addLeitura(jSonParsed, id);
      // this.closeSocket(id);
    };

    this.sensores[id].sensor.connection.onopen = (event) => {
      this.sensores[id].sensor.corBtn = "positive";
      this.sensores[id].sensor.corTab = "text-green";
      console.log(event);
      this.setConectado(id);
      console.log("Conexão com o sensor realizada com websocket...");
    };

    this.sensores[id].sensor.connection.onerror = (event) => {
      this.setDesconectado(id);
      console.log("Error no websocket server...");
    };

    this.sensores[id].sensor.connection.onclose = (event) => {
      this.sensores[id].sensor.corBtn = "primary";
      this.sensores[id].sensor.corTab = "";
      console.log(event);
      this.setDesconectado(id);
      console.log("Websocket desconectado do server...");
    };
  }

  closeSocket(id) {
    this.sensores[id].sensor.connection.close();
    this.setDesconectado(id);
  }

  addLeitura(data, id) {
    this.sensores[id].series[0].data.push(data);
    console.log(this.sensores[id].series[0].data);
  }

  printLeitura(id) {
    console.log(this.sensores[id]);
  }

  setConectado(id) {
    this.sensores[id].sensor.ativo = true;
  }

  setDesconectado(id) {
    this.sensores[id].sensor.ativo = false;
  }

  sendStart() {
    if (this.sensores[0].sensor.ativo === true) {
      this.sensores[0].sensor.connection.send(JSON.stringify({ cmd: "START" }));
    }
    if (this.sensores[1].sensor.ativo === true) {
      this.sensores[1].sensor.connection.send(JSON.stringify({ cmd: "START" }));
    }
    if (this.sensores[2].sensor.ativo === true) {
      this.sensores[2].sensor.connection.send(JSON.stringify({ cmd: "START" }));
    }
  }

  sendStop() {
    if (this.sensores[0].sensor.ativo === true) {
      this.sensores[0].sensor.connection.send(JSON.stringify({ cmd: "STOP" }));
    }
    if (this.sensores[1].sensor.ativo === true) {
      this.sensores[1].sensor.connection.send(JSON.stringify({ cmd: "STOP" }));
    }
    if (this.sensores[2].sensor.ativo === true) {
      this.sensores[2].sensor.connection.send(JSON.stringify({ cmd: "STOP" }));
    }
  }

  sendRestart() {
    if (this.sensores[0].sensor.ativo === true) {
      this.sensores[0].sensor.connection.send(
        JSON.stringify({ cmd: "RESTART" })
      );
    }
    if (this.sensores[1].sensor.ativo === true) {
      this.sensores[1].sensor.connection.send(
        JSON.stringify({ cmd: "RESTART" })
      );
    }
    if (this.sensores[2].sensor.ativo === true) {
      this.sensores[2].sensor.connection.send(
        JSON.stringify({ cmd: "RESTART" })
      );
    }
  }

  sendSave() {}

  options = {
    chart: {
      id: "vuechart-example",
    },
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
  };
}

export default Sensor;
