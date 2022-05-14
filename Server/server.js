const express = require('express');
const enableWs = require('express-ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const enviroment = require('./enviroment.js');

const DataBaseOperator = require('./app/Core/DataBase');
const Routes = require('./routes');
const app = express();

app.use(cors());
// Pasta contendo o projeto SPA apos ser realizado o build
app.use(express.static('public'))

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Ativa web-socket no app express
enableWs(app);

// Rotas
Routes(app)

// Inicialização do Banco
const Funcao = DataBaseOperator.funcao;
//TODO - { force : false } opção para não dropar os dados do banco de dados -> se true deletaria todo banco a cada inicialização
DataBaseOperator
    .sequelize
    .sync({force: false})
    .then(() => {
        console.log('[SERVER] - Drop or Resync Database');
        DataBaseInicialize();
    });

function DataBaseInicialize() {
    Funcao
        .findAll()
        .then(funcao => {
            if (funcao.length) {
                console.log('[SERVER] - Ja possui as funções cadastrada')
            } else {
                Funcao
                    .bulkCreate([{
                        idFuncao: 1,
                        nomeFuncao: 'FISIO'
                    }, {
                        idFuncao: 2,
                        nomeFuncao: 'ADMIN'
                    }])
                    .then(r => console.log('[SERVER] - Foram cadastradas as funções de usuarios', r))
                    .catch(err => console.log('[SERVER] - Erro ao cadastradar as funções de usuarios', err));
            }
        })
        .catch(err => console.log(err));
}

// set port, listen for requests
const PORT = process.env.PORT || enviroment.HOST.PORT;
app.listen(PORT, () => console.log(`[SERVER] - Server está rodando na Porta: ${PORT}`));
