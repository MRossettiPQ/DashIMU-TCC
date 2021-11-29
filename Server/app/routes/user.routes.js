const { autorizaJwt } = require("../middleware");
const userController = require("../controllers/user.controller");

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

  app.get("/api/all", userController.allAccess);

  app.get(
    "/api/fisio",
    [autorizaJwt.verificaToken, autorizaJwt.seFisio],
    userController.fisioBoard
  );
};
