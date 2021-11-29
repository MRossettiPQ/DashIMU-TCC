const jwt = require("jsonwebtoken");
const configAuth = require("../config/auth.config.js");
const db = require("../models");
const Usuario = db.usuario;

verificaToken = (req, res, next) => {
  //console.log("VERIFICAR JWT");
  let token = req.headers["x-access-token"];

  //console.log("HEADER - ", req.headers);

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
    console.log("VERIFICOU JWT - ID USER:", req.idUser);
    next();
  });
};

seAdmin = (req, res, next) => {
  Usuario.findByPk(req.idUser).then((usuarioVerifica) => {
    //console.log("VERIFICAR ADMIN");
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

sePaciente = (req, res, next) => {
  //console.log("VERIFICAR PACIENTE");
  Usuario.findByPk(req.idUser).then((usuarioVerifica) => {
    usuarioVerifica.getFuncaos().then((funcaoVerifica) => {
      for (let i = 0; i < funcaoVerifica.length; i++) {
        if (funcaoVerifica[i].nomeFuncao === "PACIENTE") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requer ser um Paciente!",
      });
    });
  });
};

seFisio = (req, res, next) => {
  //console.log("VERIFICAR FISIO");
  Usuario.findByPk(req.idUser).then((usuarioVerifica) => {
    usuarioVerifica.getFuncaos().then((funcaoVerifica) => {
      for (let i = 0; i < funcaoVerifica.length; i++) {
        if (funcaoVerifica[i].nomeFuncao === "FISIO") {
          console.log("VERIFICOU FISIO");
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
  sePaciente: sePaciente,
};
module.exports = autorizaJwt;
