const DataBaseOperator = require('../../Core/DataBase');
const UserContext = require('../../Core/Utils/UserContext');
const Medicao = DataBaseOperator.medicao;
const Usuario = DataBaseOperator.usuario;

exports.postRegistraMedicao = (req, res) => {
    console.log('[POST] - /api/medicao')
    const usuarioId = UserContext.getUserContextId(req, res)
    const {id: idPaciente} = req.params;

    Medicao
        .create(req.body)
        .then(medicao => {
            res.status(200).send({message: 'Paciente registrado com sucesso!'});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getListaMedicao = (req, res) => {
    console.log('[GET] - /api/medicao')
    Usuario
        .findByPk(req.idUsuario)
        .then(contextoUsuario => {
            contextoUsuario.getPacientes().then(listaPacientes => {
                res.status(200).send(listaPacientes);
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getMedicao = (req, res) => {
    console.log('[GET] - /api/medicao/:id')
    const {id} = req.params;

    if (id) {
        Usuario
            .findByPk(req.idUsuario)
            .then(contextoUsuario => {
                Paciente.findByPk(id)
                    .then(paciente => {
                        res.status(200).send(paciente);
                    })
                    .catch(err => {
                        res.status(500).send({message: err.message});
                    });
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    } else {
        res.status(500).send({message: 'id não identificado'});
    }
};
