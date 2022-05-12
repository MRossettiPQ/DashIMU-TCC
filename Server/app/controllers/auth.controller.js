const DataBaseOperator = require('../models');
const {enviroment} = require('../../enviroment.js');
const Usuario = DataBaseOperator.usuario;
const Funcao = DataBaseOperator.funcao;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registrar = (req, res) => {
    console.log('[POST] /api/auth/signup')
    // Salva o cadastro do usuario no banco
    Usuario
        .create({
            usernameUsuario: req.body.usernameUsuario,
            emailUsuario: req.body.emailUsuario,
            telefoneUsuario: req.body.telefoneUsuario,
            nomeUsuario: req.body.nomeUsuario,
            nascUsuario: req.body.nascUsuario,
            senhaUsuario: bcrypt.hashSync(req.body.senhaUsuario, 8)
        })
        .then(usuarioCad => {
            usuarioCad
                .setFuncaos([1])
                .then(() => {
                    res.send({message: 'Usuario registrado com sucesso!'});
                });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.logar = (req, res) => {
    console.log('[POST] /api/auth/signin')
    Usuario
        .findOne({
            where: {
                usernameUsuario: req.body.usernameUsuario
            },
            include: Funcao
        })
        .then(usuarioLog => {
            if (!usuarioLog) {
                return res.status(404).send({message: 'Usuario não encontrado.'});
            }

            const senhaValida = bcrypt.compareSync(
                req.body.senhaUsuario,
                usuarioLog.senhaUsuario
            );

            if (!senhaValida) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Senha invalida!'
                });
            }

            const token = jwt.sign({
                    idUsuario: usuarioLog.idUsuario
                },
                enviroment.JWT_SECRET,
                {
                    expiresIn: 86400
                },
                (err, token) => {
                    if (token !== null) {
                        const authorities = [];
                        console.log(usuarioLog)
                        usuarioLog
                            .getFuncaos()
                            .then(listaFuncoes => {
                                for (let i = 0; i < listaFuncoes.length; i++) {
                                    authorities.push('ROLE_' + listaFuncoes[i].nomeFuncao.toUpperCase());
                                }
                                console.log('authorities', authorities, listaFuncoes, usuarioLog.idUsuario)
                                if (listaFuncoes.length) {
                                    console.log('[POST] /api/auth/signin - Usuario verificado')
                                    res.status(200).send({
                                        idUsuario: usuarioLog.idUsuario,
                                        nomeUsuario: usuarioLog.nomeUsuario,
                                        nascUsuario: usuarioLog.nascUsuario,
                                        telefoneUsuario: usuarioLog.telefoneUsuario,
                                        usernameUsuario: usuarioLog.usernameUsuario,
                                        emailUsuario: usuarioLog.emailUsuario,
                                        funcao: authorities,
                                        accessToken: token
                                    });
                                } else {
                                    console.log('[POST] /api/auth/signin - Usuario não autorizado')
                                    res.status(500).send({message: `Não foi possivel autenticar o usuario`});
                                }
                            });
                    } else {
                        console.log('[POST] /api/auth/signin - Usuario não autorizado')
                        res.status(500).send({message: `Não foi possivel autenticar o usuario ${err.message}`});
                    }
                }
            );
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
