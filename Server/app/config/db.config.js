serverConfig  = require("./server.config.js");
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "1",
  DB: "database_dashtcc",
  dialect: "mysql",
  logging: serverConfig.INDEV,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};