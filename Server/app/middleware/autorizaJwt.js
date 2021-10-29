const jwt = require("jsonwebtoken");
const configAuth = require("../config/auth.config.js");
const db = require("../models");
const Usuario = db.usuario;

verificaToken = (req, res, next) => {
  console.log("verifica token", req);
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Nenhum token fornecido!",
    });
  }

  jwt.verify(token, configAuth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Não Autorizado!",
      });
    }
    req.idUser = decoded.idUser;
    next();
  });
};

seAdmin = (req, res, next) => {
  Usuario.findByPk(req.idUser).then((usuarioVerifica) => {
    usuarioVerifica.getFuncaos().then((funcaoVerifica) => {
      for (let i = 0; i < funcaoVerifica.length; i++) {
        if (funcaoVerifica[i].nomeFuncao === "ADMIN") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requer função de Admin!",
      });
      return;
    });
  });
};

seFisio = (req, res, next) => {
  Usuario.findByPk(req.idUser).then((usuarioVerifica) => {
    usuarioVerifica.getFuncaos().then((funcaoVerifica) => {
      for (let i = 0; i < funcaoVerifica.length; i++) {
        if (funcaoVerifica[i].nomeFuncao === "FISIO") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requer ser um Fisioterapeuta!",
      });
    });
  });
};

const autorizaJwt = {
  verificaToken: verificaToken,
  seAdmin: seAdmin,
  seFisio: seFisio,
};
module.exports = autorizaJwt;
