import { Component, Vue } from "vue-property-decorator";
import FooterStep from "./Components/FooterStep.vue";
import HeaderStep from "./Components/HeaderStep.vue";
import FirstStep from "./Steps/FirstStep.vue";
import SecondStep from "./Steps/SecondStep.vue";
import ThirdStep from "./Steps/ThirdStep.vue";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";
import SessionService from "src/commons/services/SessionService";
import PatientService from "src/commons/services/PatientService";
import { SessionUtil } from "src/commons/utils/SessionController";

@Component({
  name: "session",
  components: {
    FooterStep,
    HeaderStep,
    FirstStep,
    SecondStep,
    ThirdStep,
  },
})
class Session extends Vue {
  patientId = null;

  sessionControl = new SessionUtil();

  fetchData = LoadDataUtils.loadList({
    loadList: {
      metadata: SessionService.getMetadata,
      patient: PatientService.getPatient,
    },
    auto: false,
  });

  async mounted() {
    const { id } = this.$route.params;
    this.patientId = id;
    // Load patient and metadata
    await this.fetchData.loadAll({
      patient: {
        options: {
          id: this.patientId,
        },
      },
    });
    // Set patient and metadata in controller
    this.sessionControl.setPatientId(this.patientId);
    this.sessionControl.setMetadata(this.fetchData.result.metadata);
    this.sessionControl.setPatient(this.fetchData.result.patient);
    this.sessionControl.backEndSocket.connect(this.fetchData?.metadata?.socket_url);
  }

  get isTinyScreen() {
    return this.$q.screen.lt.md;
  }

  async beforeDestroy() {
    await this.sessionControl.beforeUnmount();
  }
}

export default Session;
