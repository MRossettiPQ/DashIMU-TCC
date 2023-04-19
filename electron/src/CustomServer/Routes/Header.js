const environment = require("../Environment");

function Header(req, res, next) {
  res.header("Access-Control-Allow-Origin", environment.host.cors.origin);
  res.header("Access-Control-Allow-Methods", environment.host.cors.methods.join(","));
  res.header("Access-Control-Allow-Headers", environment.host.cors.allowedHeaders.join(","));
  next();
}

module.exports = { Header };
