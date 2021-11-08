export default {
  name: "App",
  data: function () {
    return {
      connection: null,
      sensores: [
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
      ],
    };
  },
  methods: {
    conectaSensor(id) {
      const url = `ws://${this.sensores[id].sensor.ip}:3000`;
      //const url = `ws://${this.sensores[id].sensor.ip}:9000/socket`;

      this.sensores[id].sensor.connection = new WebSocket(url);

      this.sensores[id].sensor.connection.onmessage = function (event) {
        console.log(event);
        this.sensores[id].tabela = event.data;
        console.log(`tabela: ${this.sensores[id].tabela}`);
      };

      this.sensores[id].sensor.connection.onopen = function (event) {
        console.log(event);
        this.sensores[id].sensor.ativo = true;
        console.log("Conexão com o sensor realizada com websocket...");
      };

      this.sensores[id].sensor.connection.onerror = function (event) {
        console.log(event);
        console.log("Error no websocket server...");
      };

      this.sensores[id].sensor.connection.onclose = function (event) {
        console.log(event);
        this.sensores[id].sensor.ativo = false;
        this.sensores[id].sensor.ip = "";
        console.log(`tabela: ${this.sensores[id].tabela}`);
        console.log(
          `Conexão do socket: ${this.sensores[id].sensor.ip} foi fechada...`
        );
      };
    },

    sendMessage(message, id) {
      console.log(message);
      console.log(this.sensores[id].sensor.connection);
      this.sensores[id].sensor.connection.send(message);
    },
  },
};
