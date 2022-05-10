const pacienteController = require("../controllers/medicoes.controller");
const { autorizaJwt } = require("../middleware");
const { verificaCadastro } = require("../middleware");
const header = require("./header");

module.exports = function(app) {
  app.use(function(req, res, next) {
    header(req, res, next);
  });

  app.get(
    "/api/paciente",
    [autorizaJwt.verificaToken, autorizaJwt.seAdminFisio],
    pacienteController.getListaPacientes
  );

  app.get(
    "/api/paciente/:id",
    [autorizaJwt.verificaToken, autorizaJwt.seAdminFisio],
    pacienteController.getPaciente
  );

  app.post(
    "/api/paciente/:id/cadastropaciente",
    [verificaCadastro.verificaCPF],
    pacienteController.postRegistrarPaciente
  );
};