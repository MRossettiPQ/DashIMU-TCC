import { Component, PropSync, Vue } from "vue-property-decorator";

@Component({
  name: "third-step",
})
class ThirdStep extends Vue {
  @PropSync("session")
  syncSession;
}

export default ThirdStep;
