const {verificaCadastro} = require('../middleware');
const autController = require('../controllers/auth.controller');
const header = require('./header');

module.exports = function (app) {
    app.use((req, res, next) => {
        header(req, res, next);
    });

    app.post(
        '/api/auth/signup',
        [
            verificaCadastro.verificaUsuarioEmailDuplicados,
            verificaCadastro.verificaRoleExistente
        ],
        autController.registrar
    );

    app.post('/api/auth/signin', autController.logar);
};
