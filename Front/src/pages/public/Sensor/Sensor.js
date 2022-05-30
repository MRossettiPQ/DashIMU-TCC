import {Component, Prop, Vue} from "vue-property-decorator";
import TabGrafico from "./Components/TabGrafico.vue";
import TabTable from "./Components/TabTable.vue";
import PacienteExpasion from "./Components/PacienteExpasion.vue";
import SensorExpasion from "./Components/SensorExpasion.vue";
import {Notify} from "quasar";
import PacienteService from "src/commons/services/PacienteService";

@Component({
  name: "sensor",
  components: {TabTable, TabGrafico, PacienteExpasion, SensorExpasion}
})
class Sensor extends Vue {
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
  }

  renderRows = [
    {
      name: "numLeitura",
      data: []
    },
    {
      name: "Acc_X",
      data: []
    },
    {
      name: "Acc_Y",
      data: []
    },
    {
      name: "Acc_Z",
      data: []
    },
    {
      name: "Gyr_X",
      data: []
    },
    {
      name: "Gyr_Y",
      data: []
    },
    {
      name: "Gyr_Z",
      data: []
    },
    {
      name: "Mag_X",
      data: []
    },
    {
      name: "Mag_Y",
      data: []
    },
    {
      name: "Mag_Z",
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
      name: "idSensor",
      data: []
    }
  ];

  sensores = [
    {
      tab_label: "Sensor 1",
      tab_name: "Sensor_1",
      label: "Conectar Sensor 1",
      dispositivo: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        corTab: ""
      },
      data: []
    },
    {
      tab_label: "Sensor 2",
      tab_name: "Sensor_2",
      label: "Conectar Sensor 2",
      dispositivo: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        classTab: ""
      },
      data: []
    },
    {
      tab_label: "Sensor 3",
      tab_name: "Sensor_3",
      label: "Conectar Sensor 3",
      dispositivo: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        classTab: ""
      },
      data: []
    }
  ];

  conectarSensor(id) {
    let url = `ws://${this.sensores[id].dispositivo.ip}:8080`;
    this.sensores[id].dispositivo.connection = new WebSocket(url);

    this.sensores[id].dispositivo.connection.onmessage = event => {
      const jSonParsed = JSON.parse(event.data);
      this.addLeitura(jSonParsed, id);
      // this.closeSocket(id);
    };

    // eslint-disable-next-line no-unused-vars
    this.sensores[id].dispositivo.connection.onopen = event => {
      this.setConectado(id);
      this.numeroConexoes = this.numeroConexoes + 1
      const message = "Conexão com o sensor realizada com websocket..."
      Notify.create({
        message,
        textColor: "white",
        color: "positive"
      });
    };

    // eslint-disable-next-line no-unused-vars
    this.sensores[id].dispositivo.connection.onerror = event => {
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
    this.sensores[id].dispositivo.connection.onclose = event => {
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

  desconectarSensor(id) {
    this.sensores[id].dispositivo.connection.close();
    this.setDesconectado(id);
  }

  addLeitura(data, id) {
    console.log(data, this.sensores[id])

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
    this.renderRows[16].data = [];
    this.renderRows[17].data = [];
    // eslint-disable-next-line no-unused-vars
    data.map((campo, index) => {
      this.sensores[id].data.push(campo);
      this.renderRows[1].data.push(campo.Acc_X);
      this.renderRows[2].data.push(campo.Acc_Y);
      this.renderRows[3].data.push(campo.Acc_Z);
      this.renderRows[4].data.push(campo.Gyr_X);
      this.renderRows[5].data.push(campo.Gyr_Y);
      this.renderRows[6].data.push(campo.Gyr_Z);
      this.renderRows[7].data.push(campo.Mag_X);
      this.renderRows[8].data.push(campo.Mag_Y);
      this.renderRows[9].data.push(campo.Mag_Z);
      this.renderRows[10].data.push(campo.Roll);
      this.renderRows[11].data.push(campo.Pitch);
      this.renderRows[12].data.push(campo.Yaw);
      this.renderRows[13].data.push(campo.horaSensor);
      this.renderRows[14].data.push(campo.AccelX_mss);
      this.renderRows[15].data.push(campo.AccelY_mss);
      this.renderRows[16].data.push(campo.AccelZ_mss);
      this.renderRows[17].data.push(campo.idSensor);
    });

    console.log(this.sensores[id].data);
  }

  setConectado(id) {
    this.sensores[id].dispositivo.corBtn = "positive";
    this.sensores[id].dispositivo.corTab = "text-green";
    this.sensores[id].dispositivo.ativo = true;
  }

  setDesconectado(id) {
    this.sensores[id].dispositivo.corBtn = "primary";
    this.sensores[id].dispositivo.corTab = "";
    this.sensores[id].dispositivo.ativo = false;
  }

  sendStart() {
    this.sensores.map((item, index) => {
      if (item.dispositivo.ativo === true) {
        item.dispositivo.connection.send(JSON.stringify({cmd: 1}));
      }
    })
  }

  sendStop() {
    this.sensores.map((item, index) => {
      if (item.dispositivo.ativo === true) {
        item.dispositivo.connection.send(JSON.stringify({cmd: 2}));
      }
    })
  }

  sendRestart() {
    this.sensores.map((item, index) => {
      if (item.dispositivo.ativo === true) {
        item.dispositivo.connection.send(JSON.stringify({cmd: 3}));
      }
    })
  }

  sendSave() {
    console.log(this.sensores[0].data)
  }

  options = {
    chart: {
      id: "real-time"
    }
  };

  async dataLoad(id) {
    try {
      this.bean = await PacienteService.getPaciente(id);
    } catch (e) {
      console.log(e);
    }
  }
}

export default Sensor;
