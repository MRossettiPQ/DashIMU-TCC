import ValidatorsUtils from "src/common/utils/ValidatorsUtils";

export default async ({ Vue }) => {
  console.log("[INIT] - Loading validators");
  Vue.prototype.$validators = new ValidatorsUtils();
};
