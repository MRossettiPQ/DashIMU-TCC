import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "sensor-item",
})
class SensorItem extends Vue {
  @Prop()
  sensorIndex;

  @Prop({ type: Object })
  sensor;

  @Prop({ type: Boolean })
  tinyScreen;

  @Prop({ type: String, default: "" })
  icon;

  @Prop({ type: Function })
  connect;

  @Prop({ type: Function })
  disconnect;

  @Prop({ type: Function })
  calibrate;

  @Prop({ type: Array })
  sensorsConnected;

  @Prop({ type: Array })
  menu;

  clickConnect() {
    if (typeof this.connect === "function") {
      console.log("connect");
      this.connect();
    }
  }

  clickDisconnect() {
    if (typeof this.disconnect === "function") {
      console.log("disconnect");
      this.disconnect();
    }
  }

  clickCalibrate() {
    if (typeof this.calibrate === "function") {
      console.log("calibrate");
      this.calibrate();
    }
  }

  get connected() {
    return !!this.sensorsConnected.find(
      (sensor) => sensor.device.ip === this.sensor.ip
    )?.device?.active;
  }
}

export default SensorItem;
