exports.allAccess = (req, res) => {
    res.status(200).send("Publico.");
};

exports.fisioBoard = (req, res) => {
    res.status(200).send("Apenas o fisioterapeuta.");
};

exports.sensorBoard = (req, res) => {
    res.status(200).send("Aqui terá dados do sensor.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Apenas o administrador.");
};

exports.pacienteBoard = (req, res) => {
    res.status(200).send("Apenas o paciente.");
};
