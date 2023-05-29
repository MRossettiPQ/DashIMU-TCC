import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
  name: "sensor",
})
class Sensor extends Vue {
  @PropSync("session")
  syncSession;

  @PropSync("sensor")
  syncSensor;

  @PropSync("socket")
  syncSocket;

  @Prop()
  order;

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
