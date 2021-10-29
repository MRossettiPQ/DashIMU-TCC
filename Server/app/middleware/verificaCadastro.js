const db = require("../models");
const FUNCAO = db.FUNCAO;
const Usuario = db.usuario;

verificaUsuarioEmailDuplicados = (req, res, next) => {
  // Username
  Usuario.findOne({
    where: {
      usernameUser: req.body.usernameUser,
    },
  }).then((usuarioVerifica) => {
    if (usuarioVerifica) {
      res.status(400).send({
        message: "Falhou! Usuario esta em uso!",
      });
      return;
    }

    // Email
    Usuario.findOne({
      where: {
        emailUser: req.body.emailUser,
      },
    }).then((usuarioVerifica) => {
      if (usuarioVerifica) {
        res.status(400).send({
          message: "Falhou! E-Mail esta em uso!",
        });
        return;
      }

      next();
    });
  });
};

verificaRoleExistente = (req, res, next) => {
  if (req.body.funcao) {
    for (let i = 0; i < req.body.funcao.length; i++) {
      if (!FUNCAO.includes(req.body.funcao[i])) {
        res.status(400).send({
          message: "Falhou! Função não existe = " + req.body.funcao[i],
        });
        return;
      }
    }
  }

  next();
};

const verificaCadastro = {
  verificaUsuarioEmailDuplicados: verificaUsuarioEmailDuplicados,
  verificaRoleExistente: verificaRoleExistente,
};

module.exports = verificaCadastro;
