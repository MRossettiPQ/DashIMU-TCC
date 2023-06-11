import FilterUtils from "src/common/utils/FilterUtils";

export default async ({ Vue }) => {
  console.log("[INIT] - Loading filters");
  const filters = Object.getPrototypeOf(FilterUtils);
  const names = Object.getOwnPropertyNames(filters).filter((name) => name !== "constructor");
  for (const key of names) {
    Vue.filter(key, filters[key]);
  }
};
