const db = require("../models"),
  Paciente = db.paciente;

exports.registrar = (req, res) => {
  console.log("Registro de Paciente - Objeto - ", req.body);

  Paciente.create({
    nomePaciente: req.body.nomePaciente,
    cpfPaciente: req.body.cpfPaciente,
    emailPaciente: req.body.emailPaciente,
    telefonePaciente: req.body.telefonePaciente,
    nascPaciente: req.body.nascPaciente,
    alturaPaciente: req.body.alturaPaciente,
  })
    .then((pacienteCad) => {
      pacienteCad.setUsers([req.body.idUser]).then(() => {
        res.send({ message: "Paciente registrado com sucesso!" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
