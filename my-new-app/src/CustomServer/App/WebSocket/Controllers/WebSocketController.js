const dayjs = require("dayjs");
const { throwSuccess } = require("../../../core/Utils/RequestUtil");
const { v4: uuidv4 } = require("uuid");
const network = require("network");
const environment = require("../../../Environment");

let sensorList = [];
module.exports = new (class WebSocketController {
  async metadata() {
    function getIP() {
      return new Promise((resolve) => {
        network.get_private_ip((err, ip) => {
          resolve(ip || "0.0.0.0");
        });
      });
    }

    let server_ip = await getIP();
    return await throwSuccess({
      content: {
        socket_url: `${server_ip}:${environment.host.port}`,
        url: server_ip,
        port: environment.host.port,
      },
      log: "Sensor list",
    });
  }

  async list() {
    return await throwSuccess({
      local: "SERVER:SENSOR",
      content: sensorList,
      log: "Sensor list",
    });
  }

  sensorConnection() {
    return function (client, req) {
      console.log(`[SOCKET] - Client connected in network! - ${dayjs()}`);

      client.connectionInfo = null;

      client.isAlive = true;

      client.on("message", async (msg) => {
        try {
          console.log(`[SOCKET] - message`);
          const data = await JSON.parse(msg);
          console.log(data);
          if (data.origin) {
            client.origin = data.origin;
            if (data.origin === "SENSOR" && client.connectionInfo === null) {
              client.connectionInfo = {
                uuid: uuidv4(null, null, null),
                ...data,
              };
              sensorList.push(client.connectionInfo);
              console.log(`[SOCKET] - Add sensor - ${msg} - ${dayjs()}`);
            } else if (data.origin === "SENSOR") {
              // Update sensor info
              client.connectionInfo = {
                ...client.connectionInfo,
                ...data,
              };
              const index = sensorList.findIndex((sensor) => sensor.uuid === client.connectionInfo.uuid);
              sensorList[index] = { ...sensorList[index], ...data };
              console.log(`[SOCKET] - Update sensor - ${msg} - ${dayjs()}`);
            }
            switch (data?.type) {
              case "GET_UPDATE_CLIENT_LIST":
                sendMessageToClient(client, "UPDATE_CLIENT_LIST", sensorList);
                break;
              default:
                break;
            }
          }
        } catch (e) {
          console.log(e);
        }
      });

      client.once("close", (e) => {
        console.log("event:close");
        if (client.origin === "SENSOR") {
          removeClient(client.connectionInfo);
          sendMessageAllClients(expressWs, "UPDATE_CLIENT_LIST", sensorList);
          sendMessageAllClients(expressWs, "SENSOR_DISCONNECTED", client.connectionInfo);
        }
        clearInterval(client.interval);
      });

      client.on("pong", (data) => {
        client.isAlive = true;
      });

      client.once("error", (e) => {
        console.log(e);
        client.close(1000, "Keep alive timeout");
      });

      client.interval = setInterval(() => {
        if (!client.isAlive) {
          return client.terminate();
        }

        client.isAlive = false;
        client.ping();
      }, 5000);
    };
  }
})();

function sendMessageAllClients(expressWs, type, message) {
  function getClients() {
    return expressWs.getWss("/").clients || [];
  }

  try {
    const clients = getClients();
    clients.forEach((client) => {
      client.send(
        JSON.stringify({
          origin: "SERVER",
          type,
          message,
        })
      );
    });
    console.log(`[SOCKET] - Send message all clients - ${type} - ${dayjs()}`);
  } catch (e) {
    console.log(e);
  }
}

function sendMessageToClient(client, type, message) {
  client.send(
    JSON.stringify({
      origin: "SERVER",
      type,
      message,
    })
  );
}

function removeClient(connectionInfo) {
  console.log("removeClient");
  let ip = connectionInfo?.ip;
  let index = sensorList.findIndex((sensor) => {
    return sensor.uuid !== connectionInfo.uuid;
  });

  sensorList.splice(index, 1);
  console.log(`[SOCKET] - Sensor ${ip} removed from network! - ${dayjs()}`);
}
