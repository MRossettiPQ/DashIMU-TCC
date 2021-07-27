const   { verificaCadastro }        = require("../middleware"),
        autController               = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        
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