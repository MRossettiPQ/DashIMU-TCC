const throwError = (cond = false, message, res) => {
    if (cond) {
        res
            .status(500)
            .send({
                message: message
            });
    }
}

const throwSucess = (content = null, message, res) => {
    res
        .status(200)
        .send({
            content: content,
            message: message
        });
}

module.exports = {
    throwError: throwError,
    throwSucess: throwSucess
};