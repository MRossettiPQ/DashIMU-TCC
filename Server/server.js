const express = require('express');
const enableWs = require('express-ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const {enviroment} = require('./enviroment.js');

const DataBaseOperator = require('./app/models');
const app = express();

app.use(cors());
// pasta contendo o projeto SPA apos ser realizado o build
app.use(express.static('public'))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// ativa web-socket no app express
enableWs(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/pacientes.routes')(app);
require('./app/routes/socket.routes')(app);

// Banco
const Funcao = DataBaseOperator.funcao;

DataBaseOperator.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync Database');
    initial();
});

function initial() {
    Funcao.findAll().then(funcao => {
        if (funcao.length) {
            console.log('ja possui as funções cadastrada')
        } else {
            Funcao.bulkCreate([{
                idFuncao: 1,
                nomeFuncao: 'FISIO'
            }, {
                idFuncao: 2,
                nomeFuncao: 'ADMIN'
            }]).then(r => console.log('Foram cadastradas as funções de usuarios'));
        }
    }).catch(err => {
        console.log(err)
    });
}

// set port, listen for requests
const PORT = process.env.PORT || enviroment.HOST.PORT;
app.listen(PORT, () => {
    console.log(`Server está rodando na Porta: ${PORT}.`);
    console.log(`Cors está rodando na Porta: ${enviroment.HOST.PORT_CORS}.`);
});
