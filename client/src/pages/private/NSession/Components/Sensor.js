import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
  name: "sensor",
})
class Sensor extends Vue {
  @PropSync("session")
  syncSession;

  @PropSync("sensor")
  syncSensor;

  @Prop()
  order;

  get connected() {
    // return !!this.stateSensorInConnectedList?.device?.active;
    return this.syncSensor.available;
  }

  get measurementNumber() {
    return this.syncSensor?.gyro_measurements?.length;
  }

  @Emit("connect")
  connect() {
    return this.syncSensor;
  }

  @Emit("disconnect")
  disconnect() {
    return this.syncSensor;
  }

  @Emit("calibrate")
  calibrate() {
    return this.syncSensor;
  }

  get menuSensor() {
    const menuSensor = [
      {
        label: "Calibrate",
        icon: "iso",
      },
    ];
    return menuSensor;
  }
}

export default Sensor;
