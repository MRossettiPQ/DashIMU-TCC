import { Component, Mixins } from 'vue-property-decorator'
import StepperFooter from './Components/StepperFooter/StepperFooter.vue'
import StepperHeader from './Components/StepperHeader/StepperHeader.vue'
import SelectSensor from './Steps/SelectSensor/SelectSensor.vue'
import RunProcedure from './Steps/RunProcedure/RunProcedure.vue'
import FirstStep from './Steps/FirstStep/FirstStep.vue'
import PatientService from 'src/common/services/PatientService'
import SessionService from 'src/common/services/SessionService'
import { SessionWebSocket } from 'src/common/utils/SessionUtils/WebSocketSensorsUtils'
import { Notify } from 'quasar'
import { SessionUtils } from 'src/common/utils/SessionUtils/SessionStepUtils'
import { Session } from 'src/common/utils/SessionUtils/SessionInitUtils'
import { FetchAllData } from 'src/common/utils/LoadDataUtil/FetchAllData'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'
import { DevMixin } from 'src/common/mixins/DevMixin'

@Component({
  name: 'session-page',
  components: {
    StepperFooter,
    StepperHeader,
    SelectSensor,
    RunProcedure,
    FirstStep,
  },
})
export default class SessionPage extends Mixins(ScreenMixin, DevMixin) {
  patientId = null

  // loading
  loadingSave = false
  navigation = SessionUtils.createNavigation({
    onCheckProcedures: this.saveSession,
  })
  sessionConnection = new SessionWebSocket()
  session = new Session()
  fetchResult = null
  saveResult = null

  fetchData = new FetchAllData({
    loadList: {
      metadata: SessionService.getMetadata,
      patient: PatientService.getPatient,
    },
  })

  async beforeMount() {
    this.patientId = Number(this.$route.params.id)
    await this.fetchData.fetchAll({
      patient: {
        options: {
          id: this.patientId,
        },
      },
    })
    if (this.fetchData.hasResult) {
      this.fetchResult = this.fetchData.result
      this.sessionConnection.connectSession(this.fetchResult?.metadata?.socket_url)
      this.session.load(this.fetchResult?.metadata)
    }
  }

  beforeDestroy() {
    this.sessionConnection.closeAll()
  }

  async saveSession() {
    try {
      this.loadingSave = true
      if (this.session.checkMovementsMeasurements) {
        Notify.create({
          message: 'Você deve ter captado alguma medição para completar esse procedimento!',
          textColor: 'white',
          color: 'error',
        })
        return false
      }
      const bean = {
        session: {
          ...this.session.values,
          patientId: this.fetchData.result.patient.id,
        },
      }
      const data = await SessionService.postSession(bean)

      if (data != null) {
        this.saveResult = data
        this.session.restart()
        this.sessionConnection.restart()
        await this.$router.push({
          path: `/result/${data.id}`,
        })
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loadingSave = false
    }
  }
}
