import { Component, Emit, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
  name: "sensor-registered",
})
class SensorRegistered extends Vue {
  @Prop({ type: Object })
  sensor;

  @Prop({ type: Boolean })
  isTinyScreen;

  @PropSync("session")
  syncedSession;

  @PropSync("registeredSensorsList", { type: Array, default: [] })
  syncRegisteredSensorsList;

  @Prop()
  sessionConnection;

  get connected() {
    return this.sensor?.device?.active;
  }

  get nameSensor() {
    return this.sensor?.nameSensor;
  }

  get measurementNumber() {
    return this.sensor?.gyro_measurements?.length;
  }

  update(position) {
    this.sessionConnection.updateSensor({
      position,
      sensor: this.sensor.device,
    });
  }

  @Emit("connect")
  connect() {
    return this.sensor.device;
  }

  @Emit("disconnect")
  disconnect() {
    return this.sensor.device;
  }

  @Emit("calibrate")
  calibrate() {
    return this.sensor.device;
  }

  @Emit("remove")
  remove() {
    return this.sensor.device;
  }

  get menuSensor() {
    const menuSensor = [
      {
        label: "Calibrate",
        icon: "iso",
        needConnected: true,
        fn: () => this.calibrate(),
      },
      {
        label: "Delete",
        icon: "delete",
        needConnected: false,
        fn: () => this.remove(),
      },
    ];
    return menuSensor;
  }
}

export default SensorRegistered;
