#ifndef MPU_SOCKET_SERVER_SOCKET_CLIENT_H
#define MPU_SOCKET_SERVER_SOCKET_CLIENT_H

#include <config.h>

void onSocketClientEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n");
            connectedWebsocketClient = false;
            RestartMeasurement();
            ConnectBackend();
            break;
        case sIOtype_CONNECT:
            Serial.println("[SENSOR] - Connection Opened");
            
            Serial.println("[SENSOR] - Connected with the server!");
            SendStatusSensor();

            Serial.printf("[IOc] Connected to url: %s\n", payload);
            // join default namespace (no auto join in Socket.IO V3)
            connectedWebsocketClient = true;
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
        {
            char * sptr = NULL;
            int id = strtol((char *)payload, &sptr, 10);
            Serial.printf("[IOc] get event: %s id: %d\n", payload, id);
            if(id) {
                payload = (uint8_t *)sptr;
            }
            DynamicJsonDocument doc(1024);
            DeserializationError error = deserializeJson(doc, payload, length);
            if(error) {
                Serial.print(F("deserializeJson() failed: "));
                Serial.println(error.c_str());
                return;
            }

            String eventName = doc[0];
            Serial.printf("[IOc] event name: %s\n", eventName.c_str());

            // Message Includes a ID for a ACK (callback)
            if(id) {
                // creat JSON message for Socket.IO (ack)
                DynamicJsonDocument docOut(1024);
                JsonArray array = docOut.to<JsonArray>();

                // add payload (parameters) for the ack (callback function)
                JsonObject param1 = array.createNestedObject();
                param1["now"] = millis();

                // JSON to String (serializion)
                String output;
                output += id;
                serializeJson(docOut, output);

                // Send event
                socketIO.send(sIOtype_ACK, output);
            }
        }
            break;
        case sIOtype_ACK:
            Serial.printf("[IOc] get ack: %u\n", length);
            break;
        case sIOtype_ERROR:
            Serial.printf("[IOc] get error: %u\n", length);
            break;
        case sIOtype_BINARY_EVENT:
            Serial.printf("[IOc] get binary: %u\n", length);
            break;
        case sIOtype_BINARY_ACK:
            Serial.printf("[IOc] get binary ack: %u\n", length);
            break;
    }
}

void SetWebsocketClient() {
    Serial.println("[SENSOR] - Starting the Websocket Client");
    // Callback of events
    socketIO.onEvent(onSocketClientEvent);

    // Configure time zone
    timeClient.begin();
    timeClient.forceUpdate();
}

void ConnectBackend(){
    if (!connectedWebsocketClient) {
        Serial.println("[SENSOR] - Not connected to the server!");
        socketIO.begin("10.11.100.100", 8880, "/socket.io/?EIO=4");
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
    //socketIO.send(R"({"ip":")" + addressESP + R"(","origin":"SENSOR)" + R"(","sensorName":")" + nameSensor + R"(","available":")" + availableString + R"("})");
}

#endif //MPU_SOCKET_SERVER_SOCKET_CLIENT_H
