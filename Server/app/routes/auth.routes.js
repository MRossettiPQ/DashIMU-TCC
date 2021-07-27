const   { verificaCadastro }        = require("../middleware"),
        autController               = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials':true
        });
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verificaCadastro.verificaUsuarioEmailDuplicados,
            verificaCadastro.verificaRoleExistente
        ],
        autController.registrar
    );

    app.post("/api/auth/signin", autController.logar);
};