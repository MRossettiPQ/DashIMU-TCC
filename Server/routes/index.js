const AutorizaJwt = require('../app/Core/Middleware/AutorizaJwt.js');
const MedicaoController = require('../app/Sessao/Controllers/MedicaoController.js');
const SciLabController = require('../app/Sessao/Controllers/SciLabController.js');
const VerificaCadastro = require('../app/Core/Middleware/VerificaCadastro.js');
const PacienteController = require('../app/Paciente/Controllers/PacienteController.js');
const AutenticacaoController = require('../app/Usuario/Controllers/AutenticacaoController.js');
const header = require('./header');


let listaSensores = [];
module.exports = function (app) {
    //TODO root
    app.get('/ping', (req, res, next) => {
        console.log(`Pagina: /ping`);
        res.json({message: 'Testando server'});
    });

    //TODO SENSOR
    app.ws('/socket', (client, req) => {
        client.on('message', (msg) => {
            listaSensores.push({
                id: client.id,
                ip: msg
            })
            console.log(`Adicionar sensor: ${msg}`);
            console.log(listaSensores);
        });

        client.on('close', (ws, req) => {
            console.log('WebSocket was closed');
            // listaSensores.splice(ws.socket.id, 1)
            console.log(`Adicionar sensor: ${listaSensores} - ${ws}`);
        });
    });

    //TODO header
    app.use((req, res, next) => {
        header(req, res, next);
    });

    //TODO Sensores
    app.get(
        '/api/sensores/lista',
        [
            AutorizaJwt.verificaToken,
            AutorizaJwt.seAdminFisio
        ],
        (req, res) => {
            res.status(200).send(listaSensores);
        }
    );

    //TODO Autenticação
    app.post(
        '/api/auth/signup',
        [
            VerificaCadastro.verificaUsuarioEmailDuplicados,
            VerificaCadastro.verificaRoleExistente
        ],
        AutenticacaoController.registrar
    );

    app.post(
        '/api/auth/signin',
        AutenticacaoController.logar
    );

    //TODO paciente
    app.get(
        '/api/paciente',
        [
            AutorizaJwt.verificaToken,
            AutorizaJwt.seAdminFisio
        ],
        PacienteController.getListaPacientes
    );

    app.get(
        '/api/paciente/:id',
        [
            AutorizaJwt.verificaToken,
            AutorizaJwt.seAdminFisio
        ],
        PacienteController.getPaciente
    );

    app.post(
        '/api/paciente/cadastropaciente',
        [
            AutorizaJwt.verificaToken,
            AutorizaJwt.seAdminFisio,
            VerificaCadastro.verificaCPF
        ],
        PacienteController.postRegistrarPaciente
    );

    //TODO Medição
    app.get(
        '/api/medicao',
        [
            AutorizaJwt.verificaToken,
            AutorizaJwt.seAdminFisio
        ],
        MedicaoController.getListaMedicao
    );

    app.get(
        '/api/medicao/:id',
        [
            AutorizaJwt.verificaToken,
            AutorizaJwt.seAdminFisio
        ],
        MedicaoController.getMedicao
    );

    app.post(
        '/api/medicao/',
        [
            AutorizaJwt.verificaToken,
            VerificaCadastro.verificaCPF
        ],
        MedicaoController.postRegistraMedicao
    );

    //TODO Scilab
    app.post(
        '/api/scilab/',
        [
            AutorizaJwt.verificaToken,
            AutorizaJwt.seAdminFisio
        ],
        SciLabController.getCalcular
    );

};
