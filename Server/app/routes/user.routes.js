const   { autorizaJwt }         = require("../middleware"),
        userController          = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        
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