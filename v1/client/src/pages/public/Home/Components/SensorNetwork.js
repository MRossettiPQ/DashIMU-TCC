import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "sensor-network" })
export default class SensorNetwork extends Vue {
  @Prop()
  metadata;
}
