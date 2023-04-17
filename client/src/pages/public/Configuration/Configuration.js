import { Component, Vue } from "vue-property-decorator";
import { LoadDataUtils } from "src/commons/utils/LoadDataUtils";
import DevService from "src/commons/services/DevService";

@Component({
  name: "configuration",
})
class Configuration extends Vue {
  bean = {
    api: "",
  };

  fetchData = LoadDataUtils.load({
    toLoad: DevService.getMetadata,
    auto: true,
  });

  get environment() {
    return this.fetchData.result?.environment;
  }

  get env() {
    return {
      NODE_ENV: process?.env?.NODE_ENV,
      SERVER_API: process?.env?.SERVER_API,
    };
  }
}

export default Configuration;
