#ifndef MPU_SOCKET_SERVER_SOCKET_CLIENT_H
#define MPU_SOCKET_SERVER_SOCKET_CLIENT_H

#include <config.h>

void ConnectBackend() {
    if (!connectedWebsocketClient) {
        Serial.println("[SENSOR] - Not connectedWifi to the server!");

        // Callback of events
        clientBackEnd.onEvent(onEventsCallback);
        connectedWebsocketClient = clientBackEnd.connect(backend, backendPort.toInt(), "/socket");
        vTaskDelay(250 / portTICK_PERIOD_MS);
    }
}

void SendStatusSensor() {
    String available = "";
    if (serverAvailable) {
        available = "true";
    } else {
        available = "false";
    }
    clientBackEnd.send(R"({"ip":")" + addressESP + R"(","origin":"SENSOR")" + R"(,"sensorName":")" + sensorName +
                       R"(","available":")" + available + R"("})");
}

void onEventsCallback(WebsocketsEvent event, String data) {
    //Serial.println("[SENSOR] - onEventsCallback");
    switch (event) {
        case WebsocketsEvent::ConnectionOpened:
            digitalWrite(LED_READY, HIGH);
            connectedWebsocketClient = true;
            Serial.println("[SENSOR] - Connection Opened - Connected with the server!");

            SendStatusSensor();
            break;
        case WebsocketsEvent::ConnectionClosed:
            digitalWrite(LED_READY, LOW);
            Serial.println("[SENSOR] - Connection Closed");
            connectedWebsocketClient = false;
            RestartMeasurement();
            ConnectBackend();
            break;
        case WebsocketsEvent::GotPing:
            Serial.println("[SENSOR] - Got a Ping!");
            clientBackEnd.pong();
            break;
        case WebsocketsEvent::GotPong:
            Serial.println("[SENSOR] - Got a Pong!");
            clientBackEnd.ping();
            break;
        default:
            break;
    }
}

#endif //MPU_SOCKET_SERVER_SOCKET_CLIENT_H
