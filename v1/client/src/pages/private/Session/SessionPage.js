import { Component, Mixins, Ref } from 'vue-property-decorator'
import StepperFooter from './Components/StepperFooter/StepperFooter.vue'
import DrawerMenu from './Components/DrawerMenu/DrawerMenu.vue'
import StepperHeader from './Components/StepperHeader/StepperHeader.vue'
import SecondStep from './Steps/SecondStep/SecondStep.vue'
import ThirdStep from './Steps/ThirdStep/ThirdStep.vue'
import FirstStep from './Steps/FirstStep/FirstStep.vue'
import PatientService from 'src/common/services/PatientService'
import SessionService from 'src/common/services/SessionService'
import { SessionWebSocket } from 'src/common/utils/SessionUtils/WebSocketSensorsUtils'
import { Notify } from 'quasar'
import { Navigation } from 'src/common/utils/SessionUtils/NavigationUtils'
import { SessionUtils } from 'src/common/utils/SessionUtils'
import { FetchAllData } from 'src/common/utils/LoadDataUtil/FetchAllData'
import { ScreenMixin } from 'src/common/mixins/ScreenMixin'
import { DevMixin } from 'src/common/mixins/DevMixin'

@Component({
  name: 'session-page',
  components: {
    DrawerMenu,
    StepperFooter,
    StepperHeader,
    SecondStep,
    ThirdStep,
    FirstStep,
  },
})
export default class SessionPage extends Mixins(ScreenMixin, DevMixin) {
  patientId = null

  @Ref('menuRef')
  menuRef

  rightDrawer = false

  // loading
  loadingSave = false
  navigation = new Navigation({
    onCheckProcedures: this.saveSession,
  })
  connection = new SessionWebSocket()
  session = new SessionUtils()

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
      this.connection.connectSession(this.fetchData.result?.metadata?.socket_url)
      this.session.setMetadata(this.fetchData.result?.metadata)
    }
  }

  async beforeDestroy() {
    await this.connection.closeAll()
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
        //await this.connection.closeAll()
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
