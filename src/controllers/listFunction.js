const dbConnect = require("../modules/conBanco.js");
//Rota - Main
exports.main = (req, res) => {
    res.render('./views/index.js');
    //res.sendFile(__dirname + '/views/index.html');
    //res.json({ message: "TESTE" });
    console.log(`Pagina: /`);
};