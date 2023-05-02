import { Component, Prop, Vue } from "vue-property-decorator";
import _ from "lodash";
import StepperFooter from "./Components/StepperFooter/StepperFooter.vue";
import StepperHeader from "./Components/StepperHeader/StepperHeader.vue";
import SelectSensor from "./Steps/SelectSensor/SelectSensor.vue";
import RunProcedure from "./Steps/RunProcedure/RunProcedure.vue";
import InitSession from "./Steps/InitSession/InitSession.vue";
import OnSave from "./Steps/OnSave/OnSave.vue";
import PatientService from "src/commons/services/PatientService";
import SessionService from "src/commons/services/SessionService";
import { WebSocketSensorsUtils } from "src/commons/utils/WebSocketSensorsUtils";
import { Notify } from "quasar";
import { SessionUtils } from "src/commons/utils/SessionStepUtils";
import { SessionInitUtils } from "src/commons/utils/SessionInitUtils";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";

@Component({
  name: "new-session",
  components: {
    StepperFooter,
    StepperHeader,
    SelectSensor,
    RunProcedure,
    InitSession,
    OnSave,
  },
})
class Session extends Vue {
  @Prop()
  id;
  // loading
  loadingSave = false;
  navigation = SessionUtils.createNavigation({
    onCheckProcedures: this.saveSession,
  });
  sessionConnection = WebSocketSensorsUtils.createSession();
  session = SessionInitUtils.create();
  fetchResult = null;
  saveResult = null;

  get inDev() {
    return process.env.DEV;
  }

  fetchData = LoadDataUtils.loadList({
    loadList: {
      metadata: SessionService.getMetadata,
      patient: PatientService.getPatient,
    },
    onLoad: ({ result }) => {
      this.fetchResult = result;
      this.sessionConnection.connectSession(this.fetchResult?.metadata?.socket_url);
      this.session.load({
        metadata: result.metadata,
      });
    },
  });

  async beforeMount() {
    try {
      const { id } = this.$route.query;
      if (!_.isNil(id)) {
        await this.fetchData.loadAll({
          patient: {
            options: {
              id,
            },
          },
        });
      } else {
        Notify.create({
          message: "Sessões são criadas com um link do paciente",
          textColor: "white",
          color: "error",
        });
        await this.$router.push({
          path: "home",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  beforeDestroy() {
    this.sessionConnection.closeAll();
  }

  async saveSession() {
    try {
      this.loadingSave = true;
      if (this.session.checkMovementsMeasurements) {
        Notify.create({
          message: "Você deve ter captado alguma medição para completar esse procedimento!",
          textColor: "white",
          color: "error",
        });
        return false;
      }
      const bean = {
        session: {
          ...this.session.values,
          patientId: this.fetchData.result.patient.id,
        },
      };
      const data = await SessionService.postSession(bean);
      console.log(data);
      if (data != null) {
        this.saveResult = data;
        this.session.restart();
        this.sessionConnection.restart();
        this.navigation.onSave();
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingSave = false;
    }
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
