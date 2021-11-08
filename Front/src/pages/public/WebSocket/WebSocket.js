import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "WebSocket",
})
class WebSocket extends Vue {
  connection = null;
  sensores = [
    {
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
      },
      tabela: [{}],
    },
    {
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
      },
      tabela: [{}],
    },
    {
      sensor: {
        ip: "",
        ativo: false,
        connection: null,
      },
      tabela: [{}],
    },
  ];

  conectaSensor(id) {
    const url = `ws://${this.sensores[id].sensor.ip}:3000`;
    console.log(url, " - ", this.sensores[id].sensor.connection);

    this.sensores[id].sensor.connection = new WebSocket(url);

    this.sensores[id].sensor.connection.onmessage = function (event) {
      console.log(event);
    };

    this.sensores[id].sensor.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };
  }

  sendMessage(message, id) {
    console.log("Hello");
    console.log(this.sensores[id].sensor.connection);
    this.sensores[id].sensor.connection.send(message);
  }
}

export default WebSocket;
