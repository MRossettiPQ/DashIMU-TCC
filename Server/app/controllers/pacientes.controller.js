const db = require("../models");
const Paciente = db.paciente;
const Usuario = db.usuario;

exports.postRegistrarPaciente = (req, res) => {
    const {id} = req.params;

    Paciente.create({
        nomePaciente: req.body.nomePaciente,
        cpfPaciente: req.body.cpfPaciente,
        emailPaciente: req.body.emailPaciente,
        telefonePaciente: req.body.telefonePaciente,
        nascPaciente: req.body.nascPaciente,
        alturaPaciente: req.body.alturaPaciente
    })
        .then(pacienteCad => {
            pacienteCad.setUsers(id).then(() => {
                res.status(200).send({message: "Paciente registrado com sucesso!"});
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getListaPacientes = (req, res) => {
    Usuario.findByPk(req.idUser)
        .then(contextoUsuario => {
            contextoUsuario.getPacientes().then(listaPacientes => {
                res.status(200).send(listaPacientes);
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.getPaciente = (req, res) => {
    const {id} = req.params;

    Usuario.findByPk(req.idUser)
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
