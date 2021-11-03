const express = require("express");
const enableWs = require("express-ws");
const bodyParser = require("body-parser");
const cors = require("cors");

// const path = require("path");
// const mqtt = require("mqtt");

const serverConfig = require("./app/config/server.config.js");
const db = require("./app/models");
const app = express();
var comandoStoS;

var corsOptions = {
  origin: `Access-Control-Allow-Headers: http://localhost:${serverConfig.PORTCORS}/api`,
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/pacientes.routes")(app);
// ativa web-socket no app express
enableWs(app);
// Banco
const Funcao = db.funcao;

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync Database");
  //initial();
});

function initial() {
  Funcao.create({
    idFuncao: 1,
    nomeFuncao: "FISIO",
  });
  Funcao.create({
    idFuncao: 2,
    nomeFuncao: "ADMIN",
  });
}
// Rotas - Ping
app.get("/ping", function (req, res) {
  res.json({ message: "testando server" });
  console.log(`Pagina: /`);
});
//Rotas - Socket
app.ws("/socket", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});

// set port, listen for requests
const PORT = process.env.PORT || serverConfig.PORT;
app.listen(PORT, () => {
  console.log(`Server está rodando na Porta: ${PORT}.`);
  console.log(`Cors está rodando na Porta: ${serverConfig.PORTCORS}.`);
});
