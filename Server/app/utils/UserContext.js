const jwt = require('jsonwebtoken');
const configAuth = require('../config/auth.config');

export function getUserContextId(req, res) {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'Nenhum token fornecido!',
        });
    }

    jwt.verify(token, configAuth.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Não Autorizado!',
            });
        }
        req.idUser = decoded.idUser;
    }, (err, token) => console.log('Usuario verificado'));

    return req.idUser;
}