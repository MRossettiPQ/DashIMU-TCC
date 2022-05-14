const jwt = require('jsonwebtoken');
const enviroment = require('../../../enviroment.js');
const DataBaseOperator = require('../DataBase');
const Usuario = DataBaseOperator.usuario;

const getUserContextId = (req, res) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'Nenhum token fornecido!',
        });
    }

    return jwt.verify(token, enviroment.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Não Autorizado!',
            });
        }
        req.idUsuario = decoded.idUsuario;
    }, (err, token) => {
        if (token !== null) {
            return req.idUsuario;
        } else {
            res.status(500).send({message: 'Necessario estar logado'});
        }
    });
}

const getUserContext = (req, res) => {
    const idUsuarioContexto = getUserContextId(req, res)

    Usuario
        .findById(idUsuarioContexto)
        .then(contextoUsuario => {
            return contextoUsuario
        })
        .catch(err => {
            res.status(500).send({message: 'Necessario estar logado'});
        });
}

module.exports = {
    getUserContextId: getUserContextId,
    getUserContext: getUserContext,
};