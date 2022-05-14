const DataBaseOperator = require('../../Core/DataBase');
const UserContext = require('../../Core/Utils/UserContext');
const Paciente = DataBaseOperator.paciente;
const Usuario = DataBaseOperator.usuario;

postRegistrarPaciente = (req, res) => {
    console.log('[POST] - /api/paciente/cadastropaciente')
    const idUsuarioContexto = UserContext.getUserContextId(req, res)
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
                .setUsuarios(idUsuarioContexto)
                .then(() => {
                    res.status(200).send({message: 'Paciente registrado com sucesso!'});
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

getListaPacientes = (req, res) => {
    console.log('[GET] - /api/paciente')
    const idUsuarioContexto = UserContext.getUserContextId(req, res)
    Usuario
        .findByPk(idUsuarioContexto)
        .then(contextoUsuario => {
            contextoUsuario
                .getPacientes()
                .then(listaPacientes => {
                    res.status(200).send(listaPacientes);
                })
                .catch(err => {
                    res.status(500).send({message: err.message});
                });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

getPaciente = (req, res) => {
    console.log('[GET] - /api/paciente/:id')
    const idUsuarioContexto = UserContext.getUserContextId(req, res)
    const {id: idPaciente} = req.params;
    Paciente
        .findOne({
            where: {
                idPaciente: idPaciente,
            },
            include: [{
                model: Usuario,
                where: {
                    idUsuario: idUsuarioContexto,
                }
            }],
        })
        .then(paciente => {
            res.status(200).send(paciente);
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

module.exports = {
    getPaciente: getPaciente,
    getListaPacientes: getListaPacientes,
    postRegistrarPaciente: postRegistrarPaciente
};