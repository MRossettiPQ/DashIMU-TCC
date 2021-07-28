exports.allAccess = (req, res) => {
    res.status(200).send("Publico.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Apenas o fisioterapeuta.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Apenas o administrador.");
};

exports.pacienteBoard = (req, res) => {
    res.status(200).send("Apenas o paciente.");
};