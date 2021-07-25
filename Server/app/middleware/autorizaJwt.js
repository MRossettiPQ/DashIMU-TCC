const   jwt             = require("jsonwebtoken"),
        config          = require("../config/auth.config.js"),
        db              = require("../models"),
        User            = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "Nenhum token fornecido!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Não Autorizado!"
            });
        }
        req.idUser = decoded.idUser;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.idUser).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "ADMIN") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requer Admin Role!"
            });
            return;
        });
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.idUser).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nomeRole === "MODERADOR") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requer Moderator Role!"
            });
        });
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.idUser).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nomeRole === "MODERADOR") {
                    next();
                    return;
                }

                if (roles[i].nomeRole === "ADMIN") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Requer Moderator ou Admin Role!"
            });
        });
    });
};

const autorizaJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = autorizaJwt;