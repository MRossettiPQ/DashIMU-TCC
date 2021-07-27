exports.allAccess = (req, res) => {
    res.status(200).send("Publico.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Apenas usuario.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Apenas administrador.");
};

exports.pacienteBoard = (req, res) => {
    res.status(200).send("Apenas o paciente.");
};