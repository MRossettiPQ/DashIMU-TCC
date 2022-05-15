import {Component, Vue} from "vue-property-decorator";

@Component({
  name: "home",
  components: {}
})
class Home extends Vue {
  loading = false;
}

export default Home;
