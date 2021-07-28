const   db              = require("../models"),
        authConfig      = require("../config/auth.config"),
        Usuario         = db.usuario,
        Funcao          = db.funcao,
        Op              = db.Sequelize.Op,
        jwt             = require("jsonwebtoken"),
        bcrypt          = require("bcryptjs");

exports.registrar = (req, res) => {
    // Salva o cadastro do usuario no banco
    Usuario.create({
        usernameUser: req.body.usernameUser,
        emailUser: req.body.emailUser,
        telefoneUser: req.body.telefoneUser,
        nomeUser: req.body.nomeUser,
        nascUser: req.body.nascUser,
        senhaUser: bcrypt.hashSync(req.body.senhaUser, 8)
    }).then(usuarioCad => {
        if (req.body.funcao) {
            Funcao.findAll({
                where: {
                    nomeFuncao: {
                        [Op.or]: req.body.funcao
                    }
                }
            }).then(funcao => {
                usuarioCad.setFuncaos(funcao).then(() => {
                    res.send({ message: "Usuario registrado!" });
                });
            });
        } else {
            // user role = 1
            usuarioCad.setFuncaos([1]).then(() => {
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

        var token = jwt.sign({ idUser: usuarioLog.idUser }, authConfig.secret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = [];
        usuarioLog.getFuncaos().then(funcao => {
            for (let i = 0; i < funcao.length; i++) {
                authorities.push("ROLE_" + funcao[i].nomeFuncao.toUpperCase());
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
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};