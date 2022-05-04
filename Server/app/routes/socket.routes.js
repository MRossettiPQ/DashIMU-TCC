const {autorizaJwt} = require("../middleware");

let listaSensores = [];
module.exports = function (app) {
    // app.get("/ping", function (req, res) {
//   res.json({ message: "testando server" });
//   console.log(`Pagina: /`);
// });
    app.ws("/", function (client, req) {
        console.log(client.getgid())
        client.on("message", function (msg) {
            listaSensores.push({
                id: client.id,
                ip: msg
            })
            console.log(`Adicionar sensor: ${msg}`);
            console.log(listaSensores);
        });

        client.on("close", (ws, req) => {
            console.log("WebSocket was closed");
            // listaSensores.splice(ws.socket.id, 1)
            console.log(`Adicionar sensor: ${listaSensores} - ${ws}`);
        });
    });

    app.get(
        "/api/sensores/lista",
        [autorizaJwt.verificaToken, autorizaJwt.seAdminFisio],
        (req, res) => {
            res.status(200).send(listaSensores);
        }
    );
};
