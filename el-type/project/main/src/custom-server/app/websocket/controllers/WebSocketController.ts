import type { Instance as ExpressWebSocket } from 'express-ws';
import dayjs from 'dayjs';
import type { ContextRequest } from '../../../core/utils/RequestUtil';
import { throwSuccess } from '../../../core/utils/RequestUtil';
import { settings } from '../../../settings';
import type * as ws from 'ws';
import { v4 as uuid } from 'uuid';

interface SensorSocket {
  uuid?: string;
  ip?: string;
  origin?: string;
}

interface SocketConnection extends ws {
  connectionInfo: SensorSocket;
  isAlive: boolean;
  origin: string;
  interval: any;
}

const sensorList: SensorSocket[] = [];

export default new (class WebSocketController {
  async metadata(req: ContextRequest) {
    return await throwSuccess({
      content: {
        socket_url: `${req.socket.localAddress}:${settings.host.port}`,
        url: req.socket.localAddress,
        port: settings.host.port,
      },
      log: 'Sensor list',
    });
  }

  async sensorList() {
    return await throwSuccess({
      local: 'SERVER:SENSOR',
      content: sensorList,
      log: 'Sensor list',
    });
  }

  sensorConnection(expressWs: ExpressWebSocket) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (client: SocketConnection, req: ContextRequest) => {
      console.log(`[SOCKET] - Client connected in network! - ${dayjs()}`);
      client.connectionInfo;

      client.isAlive = true;

      client.on('message', async (msg: string) => {
        try {
          console.log('[SOCKET] - message');
          const data = await JSON.parse(msg);
          console.log(data);
          if (data.origin) {
            client.origin = data.origin;
            if (data.origin === 'SENSOR' && client.connectionInfo === null) {
              client.connectionInfo = {
                uuid: uuid(),
                ...data,
              };
              sensorList.push(client.connectionInfo);
              console.log(`[SOCKET] - Add sensor - ${msg} - ${dayjs()}`);
            } else if (data.origin === 'SENSOR') {
              // Update sensor info
              client.connectionInfo = {
                ...client.connectionInfo,
                ...data,
              };
              const index = sensorList.findIndex(
                sensor => sensor.uuid === client.connectionInfo?.uuid,
              );
              sensorList[index] = { ...sensorList[index], ...data };
              console.log(`[SOCKET] - Update sensor - ${msg} - ${dayjs()}`);
            }
            switch (data?.type) {
              case 'GET_UPDATE_CLIENT_LIST':
                sendMessageToClient(client, 'UPDATE_CLIENT_LIST', sensorList);
                break;
              default:
                break;
            }
          }
        } catch (e) {
          console.log(e);
        }
      });

      client.once('close', e => {
        console.log('event:close');
        if (client.origin === 'SENSOR' && client.connectionInfo) {
          removeClient(client.connectionInfo);
          sendMessageAllClients(expressWs, 'UPDATE_CLIENT_LIST', sensorList);
          sendMessageAllClients(expressWs, 'SENSOR_DISCONNECTED', client.connectionInfo);
        }
        clearInterval(client.interval);
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      client.on('pong', (data: string) => {
        client.isAlive = true;
      });

      client.once('error', e => {
        console.log(e);
        client.close(1000, 'Keep alive timeout');
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

function sendMessageAllClients(
  expressWs: ExpressWebSocket,
  type: string,
  message: string | SensorSocket[] | SensorSocket,
) {
  function getClients(): ws[] | any {
    return expressWs.getWss().clients || [];
  }

  try {
    const clients = getClients();
    for (const client of clients) {
      client.send(
        JSON.stringify({
          origin: 'SERVER',
          type,
          message,
        }),
      );
    }
    console.log(`[SOCKET] - Send message all clients - ${type} - ${dayjs()}`);
  } catch (e) {
    console.log(e);
  }
}

function sendMessageToClient(
  client: SocketConnection,
  type: string,
  message: string | SensorSocket[] | SensorSocket,
) {
  client.send(
    JSON.stringify({
      origin: 'SERVER',
      type,
      message,
    }),
  );
}

function removeClient(connectionInfo: SensorSocket) {
  console.log('removeClient');
  const ip = connectionInfo?.ip;
  const index = sensorList.findIndex(sensor => sensor.uuid !== connectionInfo.uuid);
  sensorList.splice(index, 1);
  console.log(`[SOCKET] - Sensor ${ip} removed from network! - ${dayjs()}`);
}
