const DataBaseOperator = require('../../Core/DataBase');
const UserContext = require('../../Core/Utils/UserContext');
const RequestUtil = require('../../Core/Utils/RequestUtil');
const Medicao = DataBaseOperator.medicao;
const Usuario = DataBaseOperator.usuario;

exports.getCalcular = (req, res) => {
    console.log('[POST] - /api/medicao')
    const idUsuario = UserContext.getUserContextId(req, res)
    const {id: idPaciente} = req.params;

    RequestUtil.throwError(idUsuario === null, "Necessario estar logado", res)
    RequestUtil.throwError(idPaciente === null, "Falta a id do paciente", res)

    Medicao
        .create(req.body)
        .then(medicao => {
            res.status(200).send({message: 'Paciente registrado com sucesso!'});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getCentralVariabilidadeSalto = (req, res) => {
    console.log('[POST] - /api/medicao/centralvariabilidadesalto')
    const idUsuario = UserContext.getUserContextId(req, res)
    const {id: idPaciente} = req.params;

    RequestUtil.throwError(idUsuario === null, "Necessario estar logado", res)
    RequestUtil.throwError(idPaciente === null, "Falta a id do paciente", res)

    Medicao
        .create(req.body)
        .then(medicao => {
            res.status(200).send({message: 'Paciente registrado com sucesso!'});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};
