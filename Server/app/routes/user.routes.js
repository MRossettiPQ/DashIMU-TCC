const   { autorizaJwt }         = require("../middleware"),
        userController          = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials':true
        });
        next();
    });

    app.get("/api/test/all", userController.allAccess);

    app.get(
        "/api/test/user",
        [autorizaJwt.verificaToken],
        userController.userBoard
    );

    app.get(
        "/api/test/paciente",
        [autorizaJwt.verificaToken, autorizaJwt.sePaciente],
        userController.pacienteBoard
    );

    app.get(
        "/api/test/admin",
        [autorizaJwt.verificaToken, autorizaJwt.seAdmin],
        userController.adminBoard
    );
};