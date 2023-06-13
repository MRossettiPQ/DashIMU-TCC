#ifndef MPU_SOCKET_SERVER_SOCKET_CLIENT_H
#define MPU_SOCKET_SERVER_SOCKET_CLIENT_H

#include <config.h>

void SetWebsocketClient() {
    Serial.println("[SENSOR] - Starting the Websocket Client");
    
    // Callback when messages are received
    // Callback of events
    clientBackEnd.onEvent(onEventsCallback);

    ConnectBackend();

    // Configure time zone
    timeClient.begin();
    timeClient.forceUpdate();
}

void ConnectBackend(){
    if (!connectedWebsocketClient) {
        Serial.println("[SENSOR] - Not connected to the server!");
        connectedWebsocketClient = clientBackEnd.connect(backend, backendPort.toInt(), "/socket");
        vTaskDelay(500 / portTICK_PERIOD_MS);
    } 
}

void SendStatusSensor() {
    String availableString = "";
    if(available){
        availableString = "true";
    } else {
        availableString = "false";
    }
    clientBackEnd.send(R"({"ip":")" + addressESP + R"(","origin":"SENSOR)" + R"(","sensorName":")" + sensorName + R"(","available":")" + availableString + R"("})");
}

void onEventsCallback(WebsocketsEvent event, String data) {
    switch (event) {
        case WebsocketsEvent::ConnectionOpened:
            Serial.println("[SENSOR] - Connection Opened");
            
            Serial.println("[SENSOR] - Connected with the server!");
            SendStatusSensor();
            break;
        case WebsocketsEvent::ConnectionClosed:
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
