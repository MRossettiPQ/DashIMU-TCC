import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import Movement from "./Movement.vue";

@Component({
  name: "procedure",
  components: {
    Movement,
  },
})
class Procedure extends Vue {
  @PropSync("session")
  syncSession;

  @PropSync("procedure")
  syncProcedure;

  @Prop()
  order;
}

export default Procedure;
