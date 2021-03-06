const DataBaseOperator = require('../../Core/DataBase');
const FuncaoEnum = DataBaseOperator.FuncaoEnum;
const Usuario = DataBaseOperator.usuario;
const Paciente = DataBaseOperator.paciente;

verificaUsuarioEmailDuplicados = (req, res, next) => {
  // Usuarioname
  Usuario.findOne({
    where: {
      usernameUsuario: req.body.usernameUsuario,
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
        emailUsuario: req.body.emailUsuario,
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
      if (!FuncaoEnum.includes(req.body.funcao[i])) {
        res.status(400).send({
          message: "Falhou! Função não existe = " + req.body.funcao[i],
        });
        return;
      }
    }
  }

  next();
};

verificaCPF = (req, res, next) => {
  Paciente.findOne({
    where: {
      cpfPaciente: req.body.cpfPaciente,
    },
  }).then((usuarioVerifica) => {
    console.log("Usuario encontrado: ", usuarioVerifica);
    if (usuarioVerifica) {
      res.status(400).send({
        message: "Falhou! CPF esta na lista!",
      });
      return;
    }

    next();
  });
};

module.exports = {
    verificaCPF: verificaCPF,
    verificaUsuarioEmailDuplicados: verificaUsuarioEmailDuplicados,
    verificaRoleExistente: verificaRoleExistente,
};
