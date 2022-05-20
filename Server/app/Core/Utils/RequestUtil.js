const throwError = (cond = true, message, res) => {
    if (cond) {
        res.status(500).send({message: message});
    }
}

module.exports = {
    throwError: throwError,
};