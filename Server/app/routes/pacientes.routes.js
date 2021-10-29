const pacienteController = require("../controllers/pacientes.controller");
const { autorizaJwt } = require("../middleware");
const { verificaCadastro } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    next();
  });

  app.get(
    "/api/pacientes",
    [autorizaJwt.verificaToken, autorizaJwt.seFisio],
    pacienteController.getListaPacientes
  );

  app.post(
    "/api/pacientes",
    [
      //autorizaJwt.verificaToken,
      verificaCadastro.verificaCPF,
      // autorizaJwt.seFisio,
    ],
    pacienteController.postRegistrarPaciente
  );
};
