import { Component, Vue } from "vue-property-decorator";
import { Notify } from "quasar";
import PatientService from "src/commons/services/PatientService";
import { Axios } from "src/commons/utils/AxiosUtils";
import SensorConnectionList from "./Components/SensorConnectionList.vue";
import InfoSession from "./Components/InfoSession.vue";
import SessionService from "src/commons/services/SessionService";
import TabMeasurementTable from "pages/private/Session/Components/TabMeasurementTable";
import TabGraph from "pages/private/Session/Components/TabGraph";

@Component({
  name: "session",
  components: {
    TabGraph,
    TabMeasurementTable,
    SensorConnectionList,
    InfoSession,
  },
})
class Session extends Vue {
  loading = false;
  loadingPatient = false;
  loadingMetadata = false;

  patient = null;
  metadata = null;
  step = 1;
  tabPanel = "Tab_1";

  connection = null;
  session = {
    patientIdPatient: null,
    weight: null,
    type: null,
    movement: null,
    sensors: [],
  };

  get movements() {
    console.log(this.metadata.procedures);
    return this.session.type
      ? this.metadata.procedures.find(
          (procedure) => procedure.articulation_name === this.session.type
        ).rules
      : [];
  }

  async mounted() {
    try {
      this.loading = true;
      let { idPatient } = this.$route.query;
      await this.patientLoad(idPatient);
      await this.metadataLoad();

      this.webSocket();
      console.log(Axios);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  disconnectSensor() {
    this.session.connection.close();
  }

  webSocket() {
    let url = `ws://${this.metadata.socket_url}/v2/socket`;
    this.connection = new WebSocket(url);

    this.connection.onopen = (event) => {
      this.connection.send(
        JSON.stringify({
          origin: "APP",
          content: {
            type: "REGISTER",
            user: this.user,
          },
        })
      );
      Notify.create({
        message: this.$t("socket.success"),
        textColor: "white",
        color: "positive",
      });
    };

    this.connection.onerror = (event) => {
      Notify.create({
        message: this.$t("socket.error"),
        textColor: "white",
        color: "error",
      });
    };

    this.connection.onclose = (event) => {
      Notify.create({
        message: this.$t("socket.close"),
        textColor: "white",
        color: "warning",
      });
    };

    this.connection.onmessage = (event) => {
      this.updateSession(JSON.parse(event.data));
    };
  }

  sendStart() {
    this.connection.send(JSON.stringify({ type: "START", cmd: 1 }));
  }

  sendStop() {
    this.connection.send(JSON.stringify({ type: "STOP", cmd: 2 }));
  }

  sendRestart() {
    this.connection.send(JSON.stringify({ type: "RESTART", cmd: 3 }));
  }

  sendCalibration() {
    this.connection.send(JSON.stringify({ type: "CALIBRATION", cmd: 4 }));
  }

  sendSaveCalibration() {
    this.connection.send(JSON.stringify({ type: "SAVE_CALIBRATION", cmd: 5 }));
  }

  sendLoadCalibration() {
    this.connection.send(JSON.stringify({ type: "LOAD_CALIBRATION", cmd: 6 }));
  }

  sendAddSensor(sensor) {
    this.connection.send(
      JSON.stringify({
        origin: "APP",
        content: { type: "ADD_SENSOR_SESSION", sensor },
      })
    );
  }

  updateSession(msg) {
    console.log(msg);
    const { content } = msg;
    switch (msg.origin) {
      case "SERVER": {
        switch (content.type) {
          case "CALLBACK": {
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
      case "SENSOR": {
        switch (content.type) {
          case "MENSURATION": {
            break;
          }
          default: {
            break;
          }
        }
        break;
      }
    }
  }

  async patientLoad(id) {
    try {
      this.loadingPatient = true;
      this.patient = await PatientService.getPatient(id);
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingPatient = false;
    }
  }

  async metadataLoad() {
    try {
      this.loadingMetadata = true;
      this.metadata = await SessionService.getMetadata();
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingMetadata = false;
    }
  }

  get user() {
    return this.$store.state.Authentication.user;
  }
}

export default Session;
