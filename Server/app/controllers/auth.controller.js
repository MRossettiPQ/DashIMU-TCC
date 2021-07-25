const   db          = require("../models"),
        config      = require("../config/auth.config"),
        User        = db.user,
        Role        = db.role,
        Op          = db.Sequelize.Op,
        jwt         = require("jsonwebtoken"),
        bcrypt      = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        usernameUser: req.body.usernameUser,
        emailUser: req.body.emailUser,
        telefoneUser: req.body,telefoneUser,
        nomeUser: req.body.nomeUser,
        nascUser: req.body.nascUser,
        senhaUser: bcrypt.hashSync(req.body.senhaUser, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        nomeRole: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "Usuario registrado!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "Usuario não foi registrado!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            usernameUser: req.body.usernameUser
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Usuario não encontrado." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.senhaUser,
                user.senhaUser
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Senha invalida!"
                });
            }

            var token = jwt.sign({ idUser: user.idUser }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].nomeRole.toUpperCase());
                }
                res.status(200).send({
                    idUser: user.idUser,
                    usernameUser: user.usernameUser,
                    emailUser: user.emailUser,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};