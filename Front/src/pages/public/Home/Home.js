import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "home",
})
class Home extends Vue {
  loading = false;
}

export default Home;
