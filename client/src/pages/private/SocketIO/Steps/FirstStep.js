import { Component, PropSync, Vue } from "vue-property-decorator";
import Procedure from "../Components/Procedure.vue";

@Component({
  name: "first-step",
  components: {
    Procedure,
  },
})
class FirstStep extends Vue {
  @PropSync("session")
  syncSession;
}

export default FirstStep;
