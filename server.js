/*

*/
const express           = require('express'),
      enableWs          = require('express-ws'), 
      bodyParser        = require('body-parser'),
      cors              = require('cors'),
      path              = require('path'),
      mqtt              = require('mqtt'),
      serverConfig      = require("./config/serverConfig.js");
const app               = express();

var corsOptions = {
  origin: `http://localhost:${serverConfig.PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ativa web-socket no app express
enableWs(app); 

// routes
listFunction = require("./src/controllers/listFunction.js");
    // route - Main
    //app.get('/', listFunction.main);
    // route - Recebe
    app.get('/recebe', function(req, res) {
      console.log(`Recebeu: ${PORT}.`);
    });
    // route - Erro - Sempre por ultimo
    app.use(function(req, res) {
        res.json({ message: "ERRO" });
        console.log(`Pagina: /ERRO`);
    });
    // route - MQTT
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