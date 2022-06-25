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

  async mounted() {
    try {
      const {idPaciente} = this.$route.query;
      await this.dataLoad(idPaciente);
    } catch (e) {
      console.log(e)
    }
  }

  renderRows = [
    {
      name: "numLeitura",
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
    // Reinicia grafico para ultimo json recebido
    this.renderRows[1].data = [];
    this.renderRows[2].data = [];
    this.renderRows[3].data = [];
    this.renderRows[4].data = [];
    this.renderRows[5].data = [];
    // eslint-disable-next-line no-unused-vars
    data.map((campo, index) => {
      // adiciona leitura ao sensor recebido
      this.sensores[id].data.push(campo);
      // adiciona leitura ao grafico
      this.renderRows[1].data.push(campo.numLeitura);
      this.renderRows[2].data.push(campo.Roll);
      this.renderRows[3].data.push(campo.Pitch);
      this.renderRows[4].data.push(campo.Yaw);
      this.renderRows[5].data.push(campo.idSensor);
    });
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

  addLeituraTeste(){
    const id = this.sensores[0].data.length + 1
    this.sensores[0].data.push({
      id: id,
      idSensor: 1,
      horaLeitura: 1,
      numLeitura: 1,
      Acc_X: 1,
      Acc_Y: 1,
      Acc_Z: 1,
      AccelX_mss: 1,
      AccelY_mss: 1,
      AccelZ_mss: 1,
      Gyr_X: 1,
      Gyr_Y: 1,
      Gyr_Z: 1,
      Mag_X: 1,
      Mag_Y: 1,
      Mag_Z: 1,
      Roll: 1,
      Pitch: 1,
      Yaw: 1
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
        item.data = []
      }
    })
  }

  sendSave() {
    this.sensores.map((item, index) => {
      console.log(item)
    })
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

  addSensor(){
    const id = (this.sensores.length + 1)
    this.sensores.push({
      tab_label: "Sensor " + id,
      tab_name: "Sensor_" + id,
      label: "Conectar Sensor " + id,
      dispositivo: {
        ip: "",
        ativo: false,
        connection: null,
        corBtn: "primary",
        classTab: ""
      },
      data: []
    })
  }
}

export default Sensor;
