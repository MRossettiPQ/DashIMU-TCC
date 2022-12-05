import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import SensorRegistered from "./Components/SensorConnected/SensorRegistered.vue";
import SensorAvailable from "./Components/SensorAvailable/SensorAvailable.vue";

@Component({
  name: "select-sensor",
  components: {
    SensorRegistered,
    SensorAvailable,
  },
})
class SelectSensor extends Vue {
  @Prop()
  sessionConnection;

  @PropSync("session")
  syncedSession;

  @Prop()
  inDev;

  @Prop({ type: Boolean })
  isTinyScreen;
}

export default SelectSensor;
