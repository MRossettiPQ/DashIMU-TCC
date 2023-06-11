import { Component, Ref, Vue } from 'vue-property-decorator';
import { FetchAllData } from 'src/common/utils/LoadDataUtils';
import SessionService from 'src/common/services/SessionService';
import PatientService from 'src/common/services/PatientService';
import { SessionController } from 'src/common/utils/SessionController';
import { Patient } from 'src/common/models/Patient';
import { Metadata } from 'src/common/models/Metadata';
import FirstStep from 'pages/private/session/steps/FirstStep.vue';
import SecondStep from 'pages/private/session/steps/SecondStep.vue';
import ThirdStep from 'pages/private/session/steps/ThirdStep.vue';
import FooterStep from 'pages/private/session/components/FooterStep.vue';
import HeaderStep from 'pages/private/session/components/HeaderStep.vue';
import RightMenu from 'pages/private/session/components/RightMenu.vue';
import { QDrawer, QForm } from 'quasar';

@Component({
  name: 'session-page',
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    FooterStep,
    HeaderStep,
    RightMenu,
  },
})
export default class SessionPage extends Vue {
  patientId?: number;

  @Ref('refForm')
  refForm?: QForm;

  @Ref('menuRef')
  menuRef?: QDrawer;

  rightDrawer = false;

  sessionControl = new SessionController();

  fetchData = new FetchAllData({
    loadList: {
      metadata: SessionService.getMetadata,
      patient: PatientService.getPatient,
    },
    auto: false,
  });

  async mounted() {
    this.patientId = Number(this.$route.params.id);
    // Load patient and metadata
    await this.fetchData.fetchAll({
      patient: {
        options: {
          id: this.patientId,
        },
      },
    });
    // Set patient and metadata in controller
    const metadata = <Metadata>this.fetchData.result?.metadata;
    if (metadata) {
      this.sessionControl.setPatientId(this.patientId);
      this.sessionControl.setMetadata(metadata);
      this.sessionControl.setPatient(<Patient>this.fetchData.result?.patient);
      this.sessionControl.sockets.connect(<string>metadata.socket_url);
    }
  }

  get isTinyScreen() {
    return this.$q.screen.lt.md;
  }

  async beforeDestroy() {
    await this.sessionControl.beforeUnmount();
  }
}
