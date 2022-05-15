const DataBaseOperator = require('../../Core/DataBase');
const enviroment = require('../../../enviroment.js');
const Usuario = DataBaseOperator.usuario;
const Funcao = DataBaseOperator.funcao;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

registrar = (req, res) => {
    console.log('[POST] - /api/auth/signup')
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
                    res.send({
                        usernameUsuario: usuarioCad.usernameUsuario,
                        emailUsuario: usuarioCad.emailUsuario,
                        message: 'Usuario registrado com sucesso!'
                    });
                });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

logar = (req, res) => {
    console.log('[POST] - /api/auth/signin')
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
                null
            );

            if (token !== null) {
                const authorities = [];
                usuarioLog
                    .getFuncaos()
                    .then(listaFuncoes => {
                        for (let i = 0; i < listaFuncoes.length; i++) {
                            authorities.push('ROLE_' + listaFuncoes[i].nomeFuncao.toUpperCase());
                        }
                        if (listaFuncoes.length) {
                            console.log('[POST] - /api/auth/signin - Usuario verificado')
                            res.status(200).send({
                                idUsuario: usuarioLog.idUsuario,
                                nomeUsuario: usuarioLog.nomeUsuario,
                                funcoesUsuario: authorities,
                                telefoneUsuario: usuarioLog.telefoneUsuario,
                                usernameUsuario: usuarioLog.usernameUsuario,
                                emailUsuario: usuarioLog.emailUsuario,
                                funcao: authorities,
                                accessToken: token,
                                message: 'Logado com sucesso'
                            });
                        } else {
                            console.log('[POST] - /api/auth/signin - Usuario não autorizado')
                            res.status(500).send({message: `Não foi possivel autenticar o usuario`});
                        }
                    });
            } else {
                console.log('[POST] - /api/auth/signin - Usuario não autorizado')
                res.status(500).send({message: `Não foi possivel autenticar o usuario`});
            }
        })
        .catch(err => {
            console.log('[POST] - /api/auth/signin - Usuario não encontrado')
            res.status(500).send({message: `Usuario não encontrado, ${err.message}`});
        });
};

module.exports = {
    logar: logar,
    registrar: registrar,
};