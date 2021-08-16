const   express       = require('express'),
        enableWs      = require('express-ws'),
        bodyParser    = require('body-parser'),
        cors          = require('cors'),
        path          = require('path'),
        mqtt          = require('mqtt'),
        serverConfig  = require("./app/config/server.config.js"),
        db            = require("./app/models");
const   app = express();
var     comandoStoS;

var corsOptions = {
  origin: `Access-Control-Allow-Headers: http://localhost:${serverConfig.PORTCORS}/api/`
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes/auth.routes')(app),
require('./app/routes/user.routes')(app);
// ativa web-socket no app express
enableWs(app);
// Banco
const Funcao = db.funcao;

db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Database');
  //initial();
});

function initial(){
  Funcao.create({
    idFuncao: 1,
    nomeFuncao: "PACIENTE"
  });
  Funcao.create({
    idFuncao: 2,
    nomeFuncao: "FISIO"
  });
  Funcao.create({
    idFuncao: 3,
    nomeFuncao: "ADMIN"
  });
};
// Rotas - Main
app.get('/ping', function (req, res) {
  res.json({ message: "testando server" });
  console.log(`Pagina: /`);
});
//Rotas - MQTT
app.ws('/socket', (ws, req) => {
  ws.on('message', msg => {
    comandoStoS = "ON";
    ws.send(comandoStoS);
    console.log(msg);
  });

  ws.on('close', () => {
    console.log('WebSocket was closed');
  });
});
// set port, listen for requests
const PORT = process.env.PORT || serverConfig.PORT;
app.listen(PORT, () => {
  console.log(`Server está rodando na Porta: ${PORT}.`);
  console.log(`Cors está rodando na Porta: ${serverConfig.PORTCORS}.`);
});