const   db          = require("../models"),
        authConfig  = require("../config/auth.config"),
        Usuario     = db.usuario,
        Funcao      = db.funcao,
        Op          = db.Sequelize.Op,
        jwt         = require("jsonwebtoken"),
        bcrypt      = require("bcryptjs");

exports.registrar = (req, res) => {
    // Save User to Database
    Usuario.create({
        usernameUser:   req.body.usernameUser,
        emailUser:      req.body.emailUser,
        telefoneUser:   req.body.telefoneUser,
        nomeUser:       req.body.nomeUser,
        nascUser:       req.body.nascUser,
        senhaUser:      bcrypt.hashSync(req.body.senhaUser, 8)
    }).then(usuarioCad => {
            if (req.body.funcao) {
                Funcao.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.funcao
                        }
                    }
                }).then(funcao => {
                    usuarioCad.setFuncao(funcao).then(() => {
                        res.send({ message: "Usuario registrado!" });
                    });
                });
            } else {
                // user role = 1
                usuarioCad.setFuncao([1]).then(() => {
                    res.send({ message: "Usuario não foi registrado!" });
                });
            }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.logar = (req, res) => {
    Usuario.findOne({
        where: {
            usernameUser: req.body.usernameUser
        }
    }).then(usuarioLog => {
            if (!usuarioLog) {
                return res.status(404).send({ message: "Usuario não encontrado." });
            }

            var senhaValida = bcrypt.compareSync(
                req.body.senhaUser,
                usuarioLog.senhaUser
            );

            if (!senhaValida) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Senha invalida!"
                });
            }

            var token = jwt.sign({ idUser: user.idUser }, authConfig.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            usuarioLog.getFuncao().then(funcao => {
                for (let i = 0; i < funcao.length; i++) {
                    authorities.push("ROLE_" + funcao[i].nomeFuncao.toUpperCase());
                }
                res.status(200).send({
                    idUser: user.idUser,
                    usernameUser: user.usernameUser,
                    emailUser: user.emailUser,
                    funcao: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};