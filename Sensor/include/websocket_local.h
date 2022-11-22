#ifndef SENSOR_WEBSOCKET_LOCAL_H
#define SENSOR_WEBSOCKET_LOCAL_H

#include <config.h>

void InitWebsocketClient() {
    do {
        Serial.println("[SENSOR] - Starting the Websocket Client");
        connectedWebsocketClient = clientBackEnd.connect(backend, backendPort.toInt(), "/socket");
        if (connectedWebsocketClient) {
            Serial.println("[SENSOR] - Connected with the server!");
            SendStatusSensor();
        } else {
            Serial.println("[SENSOR] - Not connected to the server!");
        }
    } while (!connectedWebsocketClient);
    // digitalWrite(LED_CLIENT_CONNECTED, HIGH);

    // Callback when messages are received
    clientBackEnd.onEvent(onEventsCallback);
}

void SendStatusSensor() {
    clientBackEnd.send(R"({"ip":")" + addressESP + R"(","nameSensor":")" + nameSensor + R"(","available":")" + available + R"("})");
}

void InitWebsocketServer() {
    Serial.println("[SENSOR] - Starting the Websocket Server");
    do {
        serverSocket.listen(WEBSOCKET_SERVER_PORT);
        Serial.println(&"[SENSOR] - Socket server available? "[serverSocket.available()]);
    } while (!serverSocket.available());

    addressESP = WiFi.localIP().toString();
    Serial.print("[SENSOR] - IP Address:\t" + addressESP + ":" + WEBSOCKET_SERVER_PORT);
    //digitalWrite(LED_SERVER_CREATED, HIGH);
}

void MountBufferToSend() {
    if (mpu.update()) {
        jsonBufferServer += ReturnsJSONFromMeasurement(numberMeasurement);

        numberMeasurement = numberMeasurement + 1;
        // Buffer de 320 Measurement
        if (numberMeasurement == (lastDispatch + 40)) {
            Serial.println(jsonBufferServer);
            Serial.println("[SENSOR] - Send buffer");
            serverSocketClientList.send("[" + jsonBufferServer + "]");
            lastDispatch = numberMeasurement;
            numberSended = numberSended + 1;
            jsonBufferServer = "";
        } else {
            // For new element in array
            jsonBufferServer += ",";
        }
    }
}

void onMessageCallback(const WebsocketsMessage& message) {
    deserializeJson(doc, message.data());
}

void onEventsCallback(WebsocketsEvent event, String data) {
    switch (event) {
        case WebsocketsEvent::ConnectionOpened:
            Serial.println("[SENSOR] - Connection Opened");
            break;
        case WebsocketsEvent::ConnectionClosed:
            Serial.println("[SENSOR] - Connection Closed");
            break;
        case WebsocketsEvent::GotPing:
            //Serial.println("[SENSOR] - Got a Ping!");
            clientBackEnd.pong();
            break;
        case WebsocketsEvent::GotPong:
            //Serial.println("[SENSOR] - Got a Pong!");
            clientBackEnd.ping();
            break;
        default:
            //Serial.println("[SENSOR] - Got a default!");
            break;
    }
}

#endif //SENSOR_WEBSOCKET_LOCAL_H
