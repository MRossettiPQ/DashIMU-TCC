import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Notify } from "quasar";
import PatientService from "src/commons/services/PatientService";
import SessionService from "src/commons/services/SessionService";
import InitSession from "./Steps/InitSession.vue";
import RunProcedure from "./Steps/RunProcedure.vue";
import SelectSensor from "./Steps/SelectSensor.vue";

@Component({
  name: "old-session",
  components: {
    InitSession,
    RunProcedure,
    SelectSensor,
  },
})
class Session extends Vue {
  sessionSocket = null;
  sensorList = [];
  // Auxiliares
  registeredSensorId = 0;
  numberOfValidConnection = 0;
  // Se esta sendo realizada a medição
  measurement_in_progress = false;
  measurement_in_pause = false;
  // Basicamente o paciente
  bean = {};
  // Os sensores conectados
  sensors = [];

  // Dados sobre a sessão
  sessionBean = {
    procedure: null,
    movement: null,
  };

  // Quantidade de sensores conectados
  loading = false;
  loadingSave = false;
  loadingMetadata = false;

  metadata = null;
  // Posições para o sensor, para cada procedimento tera uma lista diferente
  positions = [];

  @Prop()
  idPatient;
  step = "init-session";

  get numberOfMeasurements() {
    // Quantidade de medições realizadas
    if (this.sensors.length) {
      return this.sensors[0]?.gyro_measurements?.length;
    }
    return 0;
  }

  get listOfSensors() {
    return this.sensorList;
  }

  async mounted() {
    try {
      this.loadingMetadata = true;
      this.loading = true;
      const { idPatient } = this.$route.query;
      this.bean = await PatientService.getPatient(idPatient);
      this.metadata = await SessionService.getMetadata();
      await this.connectSessionSocket();
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
      this.loadingMetadata = false;
    }
  }

  connectSessionSocket() {
    // Receive update sensor available list
    let url = `ws://${this.metadata?.socket_url}/socket`;
    this.sessionSocket = new WebSocket(url, ["websocket"]);

    this.sessionSocket.onmessage = (event) => {
      const jSonParsed = JSON.parse(event.data);
      if (jSonParsed.origin === "SERVER") {
        switch (jSonParsed.type) {
          case "UPDATE_CLIENT_LIST":
            console.log(jSonParsed);
            this.sensorList = jSonParsed?.message;
            break;
          case "CLIENT_DISCONNECTED":
            break;
        }
      }
      console.log(jSonParsed);
    };

    this.sessionSocket.onopen = (event) => {
      Notify.create({
        message: this.$t("socket.success"),
        textColor: "white",
        color: "positive",
      });
      this.sessionSocket.send(
        JSON.stringify({
          origin: "FRONT",
        })
      );
    };

    this.sessionSocket.onerror = (event) => {
      Notify.create({
        message: this.$t("socket.error"),
        textColor: "white",
        color: "error",
      });
    };

    this.sessionSocket.onclose = (event) => {
      Notify.create({
        message: this.$t("socket.close"),
        textColor: "white",
        color: "warning",
      });
    };
  }

  findSensorToDisconnect() {}

  async saveSession() {
    try {
      this.loadingSave = true;
      if (!this.sensors[0].gyro_measurements.length) {
        Notify.create({
          message: "No measurement to be saved",
          textColor: "white",
          color: "warning",
        });
        return false;
      }
      const data = await SessionService.postSession({
        sessionParams: {
          ...this.sessionBean,
          patientIdPatient: this.bean.idPatient,
        },
        sensors: this.sensors,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingSave = false;
    }
  }

  prev() {
    if (this.actualStep?.order > 0) {
      const prevStep = this.steps.find(
        ({ order }) => order === this.actualStep?.order - 1
      );
      this.step = prevStep.value;
    }
  }

  next() {
    switch (this.actualStep?.order) {
      case 1:
        if (
          this.sessionBean?.procedure === null &&
          this.sessionBean?.movement === null
        ) {
          Notify.create({
            message: this.$t("session.procedure_next_error"),
            textColor: "white",
            color: "warning",
          });
          return;
        }
        this.nextStep();
        break;
      case 2:
        if (
          this.numberOfValidConnection < this.sessionBean.procedure?.min_sensor
        ) {
          Notify.create({
            message: this.$t("session.sensor_next_error"),
            textColor: "white",
            color: "warning",
          });
          return;
        }
        this.nextStep();
        break;
      case 3:
        break;
    }
  }

  nextStep() {
    if (this.actualStep?.order < this.step.length) {
      const nextStep = this.steps.find(
        ({ order }) => order === this.actualStep?.order + 1
      );
      this.step = nextStep.value;
    }
  }

  get connectedSensors() {
    console.log(this.sensors?.filter((sensor) => !sensor.active));
    return this.sensors?.filter((sensor) => !sensor.active);
  }

  steps = [
    {
      order: 1,
      value: "init-session",
      label: this.$t("session.select_procedure"),
    },
    {
      order: 2,
      value: "select-sensor",
      label: this.$t("session.select_sensor"),
    },
    {
      order: 3,
      value: "run-procedure",
      label: this.$t("session.run_procedure"),
    },
  ];

  get actualStep() {
    return this.steps.find(({ value }) => value === this.step);
  }

  get actualProcedure() {
    if (this.metadata === null) {
      return {};
    }
    return this.metadata?.procedures.find(
      (procedure) => procedure.value === this.sessionBean?.procedure
    );
  }

  get isMobile() {
    return this.$q.screen.lt.sm;
  }

  get isMdpi() {
    return this.$q.screen.lt.md;
  }

  get isTinyScreen() {
    return this.isMdpi || this.isMobile;
  }
}

export default Session;
