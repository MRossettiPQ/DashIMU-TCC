import { Component, Vue } from "vue-property-decorator";
import WebSocket from "isomorphic-ws";

@Component({
  name: "login",
})
class Login extends Vue {
  message = "";
  connection = null;
  server = [
    {
      url: "ws://192.168.16.158:8080",
      path: "",
    },
    {
      url: "ws://192.168.16.158:80",
      path: "/socket/session",
    },
    {
      url: "ws://192.168.16.113:8000",
      path: "/socket",
    },
  ];
  async initEngineIo() {
    const id = 1;

    try {
      this.connection = new WebSocket(this.server[id]?.url, ["websocket"]);

      this.connection.addEventListener("open", (event) => {
        console.log("open", event);

        this.connection.interval = setInterval(() => {
          console.log(this.connection.readyState);
          console.log(this.connection);
        }, 6000);

        this.connection.addEventListener("message", (data) => {
          console.log("message", data);
        });
      });

      this.connection.addEventListener("close", (event) => {
        console.log("FECHADO", event);
        clearInterval(this.connection.interval);
      });

      this.connection.addEventListener("error", (event) => {
        console.log("error", event);
      });
    } catch (e) {
      console.log(e);
    }
  }

  sendMessage() {
    console.log("enviando message");
    this.connection.send(
      JSON.stringify({
        event: "ADD_SENSOR_IN_SESSION",
        sensor: {
          ip: `${this.server[1].url}${this.server[1].path}`,
        },
      })
    );
  }

  mounted() {
    this.initEngineIo();
  }
}

export default Login;
