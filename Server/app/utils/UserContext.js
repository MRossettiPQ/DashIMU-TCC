const jwt = require('jsonwebtoken');
const {enviroment} = require('../../enviroment.js');

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


const UserContext = {
    getUserContextId: getUserContextId,
};

module.exports = UserContext;