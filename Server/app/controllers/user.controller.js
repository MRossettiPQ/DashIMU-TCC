exports.allAccess = (req, res) => {
    res.status(200).send("Publico.");
};

exports.fisioBoard = (req, res) => {
    res.status(200).send("Apenas o fisioterapeuta.");
};
