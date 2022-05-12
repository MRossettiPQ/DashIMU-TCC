const jwt = require('jsonwebtoken');
const {enviroment} = require('../../enviroment.js');
const DataBaseOperator = require('../models');
const Usuario = DataBaseOperator.usuario;

verificaToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'Nenhum token fornecido!',
        });
    }

  jwt.verify(token, enviroment.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Não Autorizado!",
      });
    }
    req.idUsuario = decoded.idUsuario;
    console.log("VERIFICOU JWT - ID USER:", req.idUsuario);
    next();
  });
};

seAdmin = (req, res, next) => {
    Usuario.findByPk(req.idUsuario).then((usuarioVerifica) => {
        usuarioVerifica.getFuncaos().then((funcaoVerifica) => {
            for (let i = 0; i < funcaoVerifica.length; i++) {
                if (funcaoVerifica[i].nomeFuncao === 'ADMIN') {
                    console.log('VERIFICOU FISIO');
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Requer ser um Administrador!',
            });
        });
    });
};

sePaciente = (req, res, next) => {
    Usuario.findByPk(req.idUsuario).then((usuarioVerifica) => {
        usuarioVerifica.getFuncaos().then((funcaoVerifica) => {
            for (let i = 0; i < funcaoVerifica.length; i++) {
                if (funcaoVerifica[i].nomeFuncao === 'PACIENTE') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Requer ser um Paciente!',
            });
        });
    });
};

seFisio = (req, res, next) => {
    Usuario.findByPk(req.idUsuario).then((usuarioVerifica) => {
        usuarioVerifica.getFuncaos().then((funcaoVerifica) => {
            for (let i = 0; i < funcaoVerifica.length; i++) {
                if (funcaoVerifica[i].nomeFuncao === 'FISIO') {
                    console.log('VERIFICOU FISIO');
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Requer ser um Fisioterapeuta!',
            });
        });
    });
};

seAdminFisio = (req, res, next) => {
    Usuario.findByPk(req.idUsuario).then((usuarioVerifica) => {
        usuarioVerifica.getFuncaos().then((funcaoVerifica) => {
            for (let i = 0; i < funcaoVerifica.length; i++) {
                if (
                    funcaoVerifica[i].nomeFuncao === 'ADMIN' ||
                    funcaoVerifica[i].nomeFuncao === 'FISIO'
                ) {
                    console.log('VERIFICOU FISIO OU ADMIN');
                    next();
                    return;
                }
            }
            console.log('aqui 403')

            res.status(403).send({
                message: 'Requer ser um Administrador/Fisioterapeuta!',
            });
        });
    });
};

const autorizaJwt = {
    verificaToken: verificaToken,
    seAdmin: seAdmin,
    seFisio: seFisio,
    sePaciente: sePaciente,
    seAdminFisio: seAdminFisio,
};
module.exports = autorizaJwt;
