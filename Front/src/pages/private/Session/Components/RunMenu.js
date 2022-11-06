import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import PatientExpansion from "pages/private/Session/Components/PatientExpansion.vue";
import SensorExpansion from "pages/private/Session/Components/SensorExpansion.vue";

@Component({
  name: "run-menu",
  components: {
    PatientExpansion,
    SensorExpansion,
  },
})
class RunMenu extends Vue {
  @PropSync("session")
  syncedSession;

  @PropSync("movement")
  syncedMovement;

  @PropSync("positions")
  syncedPositions;

  @PropSync("sensors")
  syncedSensors;

  @PropSync("registredSensorId")
  syncedRegistredSensorId;

  @PropSync("measurementInProgress")
  syncedMeasurementInProgress;

  @PropSync("MeasurementInPause")
  syncedMeasurementInPause;

  @PropSync("numberOfMeasurements")
  syncedNumberOfMeasurements;

  @Prop()
  numberOfConnections;

  @Prop()
  timerRunning;

  @Prop()
  metadata;

  @Prop()
  patient;

  get inDev() {
    return process.env.DEV;
  }

  exportAll() {
    console.log("exportar tudo");
  }

  addTestReading() {
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    let iterator = 0;
    while (iterator < 365) {
      iterator++;
      this.syncedSensors.map((sensor, index) => {
        const number = sensor.gyro_measurements.length
          ? sensor.gyro_measurements.length
          : 0;
        sensor.gyro_measurements.push({
          sensorName: sensor.sensorName,
          hourMensuration: index,
          numberMensuration: number,
          Acc_X: index,
          Acc_Y: index,
          Acc_Z: index,
          AccelX_mss: index,
          AccelY_mss: index,
          AccelZ_mss: index,
          Gyr_X: index,
          Gyr_Y: index,
          Gyr_Z: index,
          Mag_X: index,
          Mag_Y: index,
          Mag_Z: index,
          Roll: getRandomArbitrary(90, 80),
          Pitch: getRandomArbitrary(90, 70),
          Yaw: getRandomArbitrary(90, 70),
        });
      });
    }
  }

  sendStart() {
    this.syncedSensors.map((item, index) => {
      if (item.device.active === true) {
        item.device.connection.send(JSON.stringify({ cmd: 1 }));
        item.device.measurement_in_progress = true;
        this.syncedMeasurementInProgress = true;
        this.syncedMeasurementInPause = false;
      }
    });
    this.startTimer();
  }

  sendStop() {
    this.syncedSensors.map((item, index) => {
      if (item.device.active === true) {
        item.device.connection.send(JSON.stringify({ cmd: 2 }));
        item.device.measurement_in_progress = false;
        this.syncedMeasurementInProgress = false;
        this.syncedMeasurementInPause = true;
      }
    });
    this.endTimer();
  }

  sendRestart() {
    this.syncedSensors.map((item, index) => {
      if (item.device.active === true) {
        item.device.connection.send(JSON.stringify({ cmd: 3 }));
        item.measurements = [];
      }
    });
  }

  timeout = null;
  runTime = null;

  startTimer() {
    /*
      this.runTimer = 0;
      this.timeout = setInterval(() => {
        this.runTimer = this.runTimer + 1;
        console.log("interval", this.runTimer, this.timeout);
      }, 1000);

     */
  }

  get timerRunning() {
    return this.runTimer;
  }

  endTimer() {
    clearTimeout();
  }
}

export default RunMenu;
