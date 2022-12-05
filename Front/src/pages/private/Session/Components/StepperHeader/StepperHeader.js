import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import RunningInfo from "../RunningInfo/RunningInfo.vue";
import moment from "moment/moment";
import { CSVUtils } from "src/commons/utils/CSVUtils";
import { Notify } from "quasar";
import DialogUtils from "src/commons/utils/DialogUtils";
import CheckMeasurementsDialog from "../CheckMeasurementsDialog/CheckMeasurementsDialog.vue";

@Component({
  name: "stepper-header",
  components: {
    RunningInfo,
  },
})
class StepperHeader extends Vue {
  @Prop({ type: Boolean })
  tinyScreen;

  @Prop()
  sessionConnection;

  @PropSync("session")
  syncedSession;

  @Prop()
  navigation;

  @Prop()
  inDev;

  @Prop()
  fetchResult;

  @Prop({ type: Boolean })
  isTinyScreen;

  get connected() {
    return this.sessionConnection?.isConnectedBackend;
  }

  exportFile = null;

  get showActualMovement() {
    return (
      !!this.syncedSession.actualRunningMovement?.label &&
      this.navigation.actualStepValue === "run-procedure"
    );
  }

  notification(message, color) {
    Notify.create({
      message,
      color,
      textColor: "white",
    });
  }

  mounted() {
    this.exportFile = CSVUtils.create({
      tableColumns: this.tableColumns,
      errorNotification: () => this.notification("Error", "negative"),
      successNotification: () => this.notification("Exportado", "positive"),
    });
  }

  exportAll() {
    try {
      console.log(this.checkMovementsMeasurements);
      if (this.checkMovementsMeasurements) {
        Notify.create({
          message: "Não foram adicionadas medições aos movimentos selecionados",
          textColor: "white",
          color: "warning",
        });
        return;
      }
      this.syncedSession.addedMovements.forEach((am) => {
        console.log(am);
        am.sensors.forEach(async (s) => {
          try {
            let fileName = `${this.fetchResult.patient.name}_${
              am.type
            }_${s.sensorName.replace(/\s/g, "")}_${moment.now()}`;
            await this.exportFile.export(s.gyro_measurements, fileName);
          } catch (e) {
            console.log(e);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  get checkMovementsMeasurements() {
    if (this.syncedSession?.values?.movements.length < 1) {
      return true;
    }
    return this.syncedSession?.values?.movements?.some((m) => {
      if (m.sensors.length < 1) {
        return true;
      }
      return m.sensors.some((s) => s.gyro_measurements.length < 1);
    });
  }

  async openCheckMeasurements() {
    try {
      await DialogUtils.asyncDialog(CheckMeasurementsDialog, {
        session: this.syncedSession,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default StepperHeader;
