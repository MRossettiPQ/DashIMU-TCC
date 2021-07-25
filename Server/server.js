const express       = require('express'),
      enableWs      = require('express-ws'),
      bodyParser    = require('body-parser'),
      cors          = require('cors'),
      path          = require('path'),
      mqtt          = require('mqtt'),
      serverConfig  = require("./app/config/server.config.js"),
      db            = require("./app/models");
const app = express();
      require('./app/routes/auth.routes')(app),
      require('./app/routes/user.routes')(app);

var corsOptions = {
  origin: `http://localhost:${serverConfig.PORTCORS}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ativa web-socket no app express
enableWs(app);
// Banco
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database');
  initial();
});

function initial(){
  Role.create({
    idRole: 1,
    nomeRole: "USUARIO"
  });
  Role.create({
    idRole: 2,
    nomeRole: "PACIENTE"
  });
  Role.create({
    idRole: 3,
    nomeRole: "ADMIN"
  });
  Role.create({
    idRole: 4,
    nomeRole: "MODERADOR"
  });
};

// Rotas - Main
app.get('/ping', function (req, res) {
  res.json({ message: "testando server" });
  console.log(`Pagina: /`);
});

// Rotas - MQTT
app.ws('/socket', (ws, req) => {
  ws.on('message', msg => {
    ws.send(msg);
    console.log(`ESTOU RECEBENDO MENSAGEM NO SOCKET`);
  })

  ws.on('close', () => {
    console.log('WebSocket was closed');
  })
});

// set port, listen for requests
const PORT = process.env.PORT || serverConfig.PORT;
app.listen(PORT, () => {
  console.log(`Server está rodando na Porta: ${PORT}.`);
});