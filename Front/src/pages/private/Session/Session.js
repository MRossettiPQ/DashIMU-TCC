import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Notify } from "quasar";
import PatientService from "src/commons/services/PatientService";
import SessionService from "src/commons/services/SessionService";
import InitSession from "./Steps/InitSession.vue";
import RunProcedure from "./Steps/RunProcedure.vue";

@Component({
  name: "old-session",
  components: {
    InitSession,
    RunProcedure,
  },
})
class Session extends Vue {
  // Auxiliares
  registredSensorId = 0;
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
  numberOfConnections = 0;
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

  async mounted() {
    try {
      this.loadingMetadata = true;
      this.loading = true;
      const { idPatient } = this.$route.query;
      this.bean = await PatientService.getPatient(idPatient);
      this.metadata = await SessionService.getMetadata();
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
      this.loadingMetadata = false;
    }
  }

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
    if (
      this.sessionBean?.procedure !== null &&
      this.sessionBean?.movement !== null
    ) {
      if (this.actualStep?.order < this.step.length) {
        const nextStep = this.steps.find(
          ({ order }) => order === this.actualStep?.order + 1
        );
        this.step = nextStep.value;
      }
    } else {
      Notify.create({
        message: this.$t("session.next_error"),
        textColor: "white",
        color: "warning",
      });
    }
  }

  steps = [
    {
      order: 1,
      value: "init-session",
      label: this.$t("session.select_procedure"),
    },
    {
      order: 2,
      value: "run-procedure",
      label: this.$t("session.run_procedure"),
    },
  ];

  get actualStep() {
    return this.steps.find(({ value }) => value === this.step);
  }
}

export default Session;
