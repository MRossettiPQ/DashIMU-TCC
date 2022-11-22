import { Component, Vue } from "vue-property-decorator";
import { Notify } from "quasar";
import dayjs from "dayjs";

@Component({
  name: "login",
})
class Login extends Vue {
  loading = false;
  sensors = [];
  connection = null;
  event = null;

  mounted() {
    let connection = new WebSocket(`ws://192.168.16.158:80/socket/session`);

    connection.addEventListener("error", (event) => {
      console.log(event);
      clearInterval(connection.interval);
    });

    connection.addEventListener("open", (event) => {
      connection.interval = setInterval(async () => {
        console.log("ping", dayjs());
        connection.send(JSON.stringify({ origin: "FRONT", type: "PING" }));
        console.log(connection.readyState);
      }, 5000);
    });

    connection.addEventListener("close", (event) => {
      console.log("close", dayjs());
      clearInterval(connection.interval);
    });

    connection.addEventListener("message", (event) => {
      console.log(event);
    });
  }
}

export default Login;
