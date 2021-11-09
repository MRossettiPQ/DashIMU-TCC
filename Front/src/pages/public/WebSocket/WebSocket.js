import { Component, Prop, Vue, Watch } from "vue-property-decorator";

// @Component({
//   name: "WebSocket",
// })
// class WebSocket extends Vue {
//   sensores = [
//     {
//       sensor: {
//         ip: "",
//         ativo: false,
//         connection: null,
//       },
//       tabela: [{}],
//     },
//     {
//       sensor: {
//         ip: "",
//         ativo: false,
//         connection: null,
//       },
//       tabela: [{}],
//     },
//     {
//       sensor: {
//         ip: "",
//         ativo: false,
//         connection: null,
//       },
//       tabela: [{}],
//     },
//   ];
//
//   conectaSensor(id) {
//     const url = `ws://${this.sensores[id].sensor.ip}:80`;
//     console.log(id);
//     //const url = `ws://${this.sensores[id].sensor.ip}:9000/socket`;
//     console.log(url);
//
//     this.sensores[id].sensor.connection = new WebSocket(url);
//     console.log(this.sensores[id].sensor.connection);
//
//     this.sensores[id].sensor.connection.onmessage = function (event) {
//       console.log(event.data);
//       // console.log(event);
//     };
//
//     this.sensores[id].sensor.connection.onopen = function (event) {
//       console.log(event);
//       // this.sensores[id].sensor.ativo = true;
//       console.log("Conexão com o sensor realizada com websocket...");
//     };
//
//     this.sensores[id].sensor.connection.onerror = function (event) {
//       console.log(event);
//       console.log("Error no websocket server...");
//     };
//
//     this.sensores[id].sensor.connection.onclose = function (event) {
//       console.log(event);
//       // this.sensores[id].sensor.ativo = false;
//       // this.sensores[id].sensor.ip = "";
//       // console.log(
//       //   `Conexão do socket: ${this.sensores[id].sensor.ip} foi fechada...`
//       // );
//     };
//   }
//
//   sendMessage(message, id) {
//     console.log(message);
//     console.log(this.sensores[id].sensor.connection);
//     this.sensores[id].sensor.connection.send(message);
//   }
// }
//
// export default WebSocket;

export default {
  name: "App",
  data: function () {
    return {
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
  computed: {},
  methods: {
    conectaSensor(id) {
      let url = `ws://${this.sensores[id].sensor.ip}:8080`;
      this.sensores[id].sensor.connection = new WebSocket(url);

      this.sensores[id].sensor.connection.onmessage = (event) => {
        console.log(event);
        this.addLeitura(event.data, id);
      };

      this.sensores[id].sensor.connection.onopen = (event) => {
        console.log(event);
        this.setConectado(id);
        console.log("Conexão com o sensor realizada com websocket...");
      };

      this.sensores[id].sensor.connection.onerror = (event) => {
        console.log(event);
        console.log("Error no websocket server...");
      };

      this.sensores[id].sensor.connection.onclose = (event) => {
        console.log(event);
        this.setDesconectado(id);
        console.log("Websocket desconectado do server...");
      };
    },

    addLeitura(data, id) {
      this.sensores[id].tabela.push(data);
    },

    printLeitura(id) {
      console.log(this.sensores[id]);
    },

    setConectado(id) {
      this.sensores[id].sensor.ativo = true;
    },

    setDesconectado(id) {
      this.sensores[id].sensor.ativo = false;
    },

    sendMessage(message, id) {
      console.log(message);
      console.log(this.sensores[id].sensor.connection);
      this.sensores[id].sensor.connection.send(message);
    },
  },
};
