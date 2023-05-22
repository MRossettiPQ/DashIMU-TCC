import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component({
  name: "movement",
})
class Movement extends Vue {
  @PropSync("session")
  syncSession;

  @PropSync("movement")
  syncMovement;

  @PropSync("procedure")
  syncProcedure;

  @Prop()
  order;
}

export default Movement;
