import { Component, Vue } from "vue-property-decorator";
import { Socket } from "engine.io-client";

@Component({
  name: "login",
})
class Login extends Vue {
  loading = false;
  sensors = [];
  connection = null;
  event = null;
  message = "";

  async initEngineIo() {
    try {
      this.connection = await new Socket("ws://192.168.16.158:8080", {
        transports: ["websocket", "polling"],
        protocols: ["websocket", "soap", "wamp"],
        upgrade: true,
        closeOnBeforeunload: true,
      });

      this.initEvents();
    } catch (e) {
      console.log(e);
    }
  }

  sendMessage() {
    console.log("enviando message");
    this.connection.send("message");
  }

  initEvents() {
    this.connection.on("open", (event) => {
      this.connection.on("message", (data) => {
        console.log("message", data);
      });

      this.connection.on("close", (event) => {
        console.log("close", event);
      });

      this.connection.on("error", (event) => {
        console.log("error", event);
      });
      this.connection.send("message");
    });

    console.log(this.connection);
  }

  initEngineIo2() {
    this.connection = new Socket("ws://192.168.16.113:8000", {
      transports: ["websocket"],
      path: "/socket",
    });

    this.initEvents();
  }

  mounted() {
    this.initEngineIo();
  }
}

export default Login;
