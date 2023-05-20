import { Component, PropSync, Vue } from "vue-property-decorator";

@Component({
  name: "footer-step",
})
class FooterStep extends Vue {
  @PropSync("session")
  syncSession;
}

export default FooterStep;
