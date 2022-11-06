#ifndef SENSOR_WEBSOCKET_LOCAL_H
#define SENSOR_WEBSOCKET_LOCAL_H

#include <config.h>

void InitWebsocketClient() {
    do {
        Serial.println("[SENSOR] - Starting the Websocket Client");
        connectedWebsocketClient = clientBackEnd.connect(backend, backendPort.toInt(), "/socket");
        if (connectedWebsocketClient) {
            Serial.println("[SENSOR] - Connected with the server!");
            clientBackEnd.send("{\"ip\":\"" + addressESP +"\",\"nameSensor\":\"" + nameSensor + "\"}");
        } else {
            Serial.println("[SENSOR] - Not connected to the server!");
        }
    } while (!connectedWebsocketClient);
    // digitalWrite(LED_CLIENT_CONNECTED, HIGH);

    // Callback when messages are received
    clientBackEnd.onMessage([&](const WebsocketsMessage &message) {
        Serial.print("Got Message: ");
        Serial.println(message.data());
    });
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
    Serial.println("[SENSOR] - Mount/Send buffer");
    if (mpu.update()) {
        //Serial.println(&"[SENSOR] - Command received:"[optReceivedFromCustomer]);
        //Serial.println(&"[SENSOR] - Command in force:"[cmdActual]);
        jsonBufferServer += ReturnsJSONFromMeasurement(numberMeasurement);

        Serial.println(jsonBufferServer);
        // Buffer de 320 Measurement
        if (numberMeasurement == (lastDispatch + 40)) {
            Serial.println("[SENSOR] - Send buffer");
            clientsList.send("[" + jsonBufferServer + "]");
            lastDispatch = numberMeasurement;
            jsonBufferServer = "";
        } else {
            // For new element in array
            jsonBufferServer += ",";
        }

        numberMeasurement = numberMeasurement + 1;
    }
}

void onMessageCallback(const WebsocketsMessage& message) {
    deserializeJson(doc, message.data());
    //Serial.println("[SENSOR] - Event onMessage");
    //Serial.println(message.data());
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
            break;
        case WebsocketsEvent::GotPong:
            //Serial.println("[SENSOR] - Got a Pong!");
            break;
        default:
            //Serial.println("[SENSOR] - Got a default!");
            break;
    }
}

#endif //SENSOR_WEBSOCKET_LOCAL_H
