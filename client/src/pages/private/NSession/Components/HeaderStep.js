import { Component, PropSync, Vue } from "vue-property-decorator";

@Component({
  name: "header-step",
})
class HeaderStep extends Vue {
  @PropSync("session")
  syncSession;
}

export default HeaderStep;
