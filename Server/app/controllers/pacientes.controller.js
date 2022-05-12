const db = require('../models');
const UserContext = require('../utils/UserContext');
const Paciente = db.paciente;
const Usuario = db.usuario;

exports.postRegistrarPaciente = (req, res) => {
    console.log('[POST] /api/paciente/cadastropaciente')
    const usuarioId = UserContext.getUserContextId(req, res)
    Paciente
        .create({
            nomePaciente: req.body.nomePaciente,
            cpfPaciente: req.body.cpfPaciente,
            emailPaciente: req.body.emailPaciente,
            telefonePaciente: req.body.telefonePaciente,
            nascPaciente: req.body.nascPaciente,
            alturaPaciente: req.body.alturaPaciente
        })
        .then(pacienteCad => {
            pacienteCad
                .setUsuarios(usuarioId)
                .then(() => {
                    res.status(200).send({message: 'Paciente registrado com sucesso!'});
                });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getListaPacientes = (req, res) => {
    console.log('[GET] /api/paciente')
    console.log(req)
    Usuario.findByPk(req.idUsuario)
        .then(contextoUsuario => {
            contextoUsuario.getPacientes().then(listaPacientes => {
                console.log(listaPacientes)
                res.status(200).send(listaPacientes);
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getPaciente = (req, res) => {
    console.log('[GET] /api/paciente/:id')
    const {id} = req.params;

    Usuario.findByPk(req.idUsuario)
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
};
