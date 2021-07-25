const   db          = require("../models"),
        ROLES       = db.ROLES,
        User        = db.user;

verificaUsuarioEmailDuplicados = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            usernameUser: req.body.usernameUser
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Falhou! Usuario esta em uso!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                emailUser: req.body.emailUser
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Falhou! E-Mail esta em uso!"
                });
                return;
            }

            next();
        });
    });
};

verificaRoleExistente = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Falhou! Role não existe = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verificaCadastro = {
    verificaUsuarioEmailDuplicados: verificaUsuarioEmailDuplicados,
    verificaRoleExistente: verificaRoleExistente
};

module.exports = verificaCadastro;