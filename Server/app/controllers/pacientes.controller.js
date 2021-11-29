const db = require("../models");
const Paciente = db.paciente;
const Usuario = db.usuario;

exports.postRegistrarPaciente = (req, res) => {
  console.log("idUsuario: ", req.body.idUser);
  Paciente.create({
    nomePaciente: req.body.nomePaciente,
    cpfPaciente: req.body.cpfPaciente,
    emailPaciente: req.body.emailPaciente,
    telefonePaciente: req.body.telefonePaciente,
    nascPaciente: req.body.nascPaciente,
    alturaPaciente: req.body.alturaPaciente,
  })
    .then((pacienteCad) => {
      //console.log("Paciente Cadastrado: ", pacienteCad);
      pacienteCad.setUsers(req.body.idUser).then(() => {
        res.send({ message: "Paciente registrado com sucesso!" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getListaPacientes = (req, res) => {
  //console.log(req.idUser);
  Usuario.findByPk(req.idUser)
    .then((contextoUsuario) => {
      contextoUsuario.getPacientes().then((listaPacientes) => {
        //console.log("Lista de pacientes - ", listaPacientes);
        res.status(200).send(listaPacientes);
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

  // res.status(200).send("Apenas o fisioterapeuta.");
};
