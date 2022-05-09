import {Component, Prop, Vue} from "vue-property-decorator";
import TabGrafico from "./Components/TabGrafico.vue";
import TabTable from "./Components/TabTable.vue";
import PacienteService from "src/commons/services/PacienteService";
import DateUtils from "src/commons/utils/DateUtils";
import {exportFile, Notify} from "quasar";
import SocketService from "src/commons/services/SocketService";

@Component({
  name: "sensor",
  components: {TabTable, TabGrafico}
})
class Sensor extends Vue {
  sensoresDisponiveis = []
  cont = 0;
  tab = "Sensor_1";
  tabGrande = "Tab_1";
  bean = {};
  numeroConexoes = 0;

  @Prop()
  idPaciente;

  mounted() {
    const {idPaciente} = this.$route.query;
    this.dataLoad(idPaciente);
    this.listaSensoresLoad();
  }

  renderRows = [
    {
      name: "horaSensor",
      data: []
    },
    {
      name: "AccelX_mss",
      data: []
    },
    {
      name: "AccelY_mss",
      data: []
    },
    {
      name: "AccelZ_mss",
      data: []
    },
    {
      name: "GyroX_rads",
      data: []
    },
    {
      name: "GyroY_rads",
      data: []
    },
    {
      name: "GyroZ_rads",
      data: []
    },
    {
      name: "MagX_uT",
      data: []
    },
    {
      name: "MagY_uT",
      data: []
    },
    {
      name: "MagZ_uT",
      data: []
    },
    {
      name: "Roll",
      data: []
    },
    {
      name: "Pitch",
      data: []
    },
    {
      name: "Yaw",
      data: []
    },
    {
      name: "AccelX_Lin",
      data: []
    },
    {
      name: "AccelY_Lin",
      data: []
    },
    {
      name: "AccelZ_Lin",
      data: []
    },
    {
      name: "TESTE",
      data: []
    }
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
        corTab: ""
      },
      data: [{}]
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
        classTab: ""
      },
      data: [{}]
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
        classTab: ""
      },
      data: [{}]
    }
  ];

  conectaSensor(id) {
    let url = `ws://${this.sensores[id].sensor.ip}:8080`;
    this.sensores[id].sensor.connection = new WebSocket(url);

    this.sensores[id].sensor.connection.onmessage = event => {
      const jSonParsed = JSON.parse(`[${event.data}]`);
      this.addLeitura(jSonParsed, id);
      // this.closeSocket(id);
    };

    // eslint-disable-next-line no-unused-vars
    this.sensores[id].sensor.connection.onopen = event => {
      this.setConectado(id);
      const message = "Conexão com o sensor realizada com websocket..."
      Notify.create({
        message,
        textColor: "white",
        color: "positive"
      });
    };

    // eslint-disable-next-line no-unused-vars
    this.sensores[id].sensor.connection.onerror = event => {
      this.setDesconectado(id);
      const message = "Error no websocket server..."

      Notify.create({
        message,
        textColor: "white",
        color: "error"
      });
      console.log(message);
    };

    // eslint-disable-next-line no-unused-vars
    this.sensores[id].sensor.connection.onclose = event => {
      this.setDesconectado(id);
      const message = "Websocket desconectado do server..."
      Notify.create({
        message,
        textColor: "white",
        color: "warning"
      });
      console.log(message);
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
      console.log(campo.Roll, campo.Pitch, campo.Yaw);
    });

    console.log(this.sensores[id].data);
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
    this.sensores.map((item, index) => {
      if (item.sensor.ativo === true) {
        item.sensor.connection.send(JSON.stringify({cmd: 1}));
      }
    });
  }

  sendStop() {
    this.sensores.map((item, index) => {
      if (item.sensor.ativo === true) {
        item.sensor.connection.send(JSON.stringify({cmd: 2}));
      }
    });
  }

  sendRestart() {
    this.sensores.map((item, index) => {
      if (item.sensor.ativo === true) {
        item.sensor.connection.send(JSON.stringify({cmd: "RESTART"}));
      }
    });
  }

  sendSave() {
  }

  options = {
    chart: {
      id: "real-time"
    }
    // animations: {
    //   enabled: true,
    //   easing: "linear",
    //   dynamicAnimation: {
    //     speed: 108,
    //   },
    // },
  };

  listaSensoresLoad() {
    try {
      SocketService.getSensores().then(
        response => {
          this.sensoresDisponiveis = response.data;
        },
        error => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  dataLoad(id) {
    try {
      PacienteService.getPaciente(id).then(
        response => {
          this.bean = response.data;
        },
        error => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  filterDate(date) {
    return DateUtils.getDateFormated(date);
  }
}

export default Sensor;
