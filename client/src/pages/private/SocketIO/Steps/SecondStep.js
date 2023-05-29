import { Component, PropSync, Vue } from "vue-property-decorator";
import Sensor from "../Components/Sensor.vue";

@Component({
  name: "second-step",
  components: {
    Sensor,
  },
})
class SecondStep extends Vue {
  @PropSync("session")
  syncSession;
}

export default SecondStep;
