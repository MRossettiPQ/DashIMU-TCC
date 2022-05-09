const DotEnv = require("dotenv");
const parsedEnv = DotEnv.config().parsed;

module.exports = () => {
  // Let's stringify our variables
  console.log(parsedEnv)
  for (let key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  }
  return parsedEnv;
};
