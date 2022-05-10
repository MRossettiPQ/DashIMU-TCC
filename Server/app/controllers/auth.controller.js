const db = require('../models');
const authConfig = require('../config/auth.config');
const Usuario = db.usuario;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registrar = (req, res) => {
    // Salva o cadastro do usuario no banco
    Usuario.create({
        usernameUser: req.body.usernameUser,
        emailUser: req.body.emailUser,
        telefoneUser: req.body.telefoneUser,
        nomeUser: req.body.nomeUser,
        nascUser: req.body.nascUser,
        senhaUser: bcrypt.hashSync(req.body.senhaUser, 8)
    })
        .then(usuarioCad => {
            usuarioCad.setFuncaos([1]).then(() => {
                res.send({message: 'Usuario registrado com sucesso!'});
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.logar = (req, res) => {
    Usuario.findOne({
        where: {
            usernameUser: req.body.usernameUser
        }
    })
        .then(usuarioLog => {
            if (!usuarioLog) {
                return res.status(404).send({message: 'Usuario não encontrado.'});
            }

            const senhaValida = bcrypt.compareSync(
                req.body.senhaUser,
                usuarioLog.senhaUser
            );

            if (!senhaValida) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Senha invalida!'
                });
            }

            const token = jwt.sign({
                    idUser: usuarioLog.idUser
                },
                authConfig.secret,
                {
                    expiresIn: 86400
                },
                (err, token) => {
                    console.log('TOKENZADO');
                });

            const authorities = [];
            usuarioLog.getFuncaos().then(funcao => {
                for (let i = 0; i < funcao.length; i++) {
                    authorities.push('ROLE_' + funcao[i].nomeFuncao.toUpperCase());
                }
                res.status(200).send({
                    idUser: usuarioLog.idUser,
                    nomeUser: usuarioLog.nomeUser,
                    nascUser: usuarioLog.nascUser,
                    telefoneUser: usuarioLog.telefoneUser,
                    usernameUser: usuarioLog.usernameUser,
                    emailUser: usuarioLog.emailUser,
                    funcao: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
