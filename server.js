/*

*/
const express           = require("express"),
      bodyParser        = require("body-parser"),
      cors              = require("cors"),
      path              = require('path');

const serverConfig = require("./config/serverConfig.js");
var app = express();

var corsOptions = {
  origin: `http://localhost:${serverConfig.PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// react to express
app.set('views', path.resolve('./src/views'));
app.set('view engine', '.js'); 
//app.engine('.js', require('react').createEngine());

// routes
listFunction = require("./src/controllers/listFunction.js");
    // route - Main
    app.get('/', listFunction.main);
    // route - Recebe
    app.get('/recebe', function(req, res) {
      console.log(`Recebeu: ${PORT}.`);
    });
    // route - Erro - Sempre por ultimo
    app.use(function(req, res) {
        res.json({ message: "ERRO" });
        console.log(`Pagina: /ERRO`);
    });

// set port, listen for requests
const PORT = process.env.PORT || serverConfig.PORT;
app.listen(PORT, () => {
  console.log(`Server está rodando na Porta: ${PORT}.`);
});