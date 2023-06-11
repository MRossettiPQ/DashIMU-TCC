const DotEnv = require("dotenv");
const path = require("path");
// eslint-disable-next-line no-undef
module.exports = function environment() {
  let pathEnv = ".env";
  let parsedEnv;
  if (process.env.NODE_ENV !== null) {
    pathEnv = `${pathEnv}.${process.env.NODE_ENV}`;
  }
  // eslint-disable-next-line no-undef
  parsedEnv = DotEnv.config({ path: path.resolve(__dirname, pathEnv) }).parsed;

  for (let key in parsedEnv) {
    if (typeof parsedEnv[key] !== "string") {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  }
  process.env = {
    ...process.env,
    ...parsedEnv,
  };
  return parsedEnv;
};
