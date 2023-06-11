#ifndef MPU_SOCKET_SERVER_SOCKET_CLIENT_H
#define MPU_SOCKET_SERVER_SOCKET_CLIENT_H

#include <config.h>

void onSocketClientEvent(socketIOmessageType_t type, uint8_t *payload, size_t length) {
    switch (type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n");
            RestartMeasurement();
            // Seta o led 2 como desativado para demonstrar estar indisponivel
            digitalWrite(LED_READY, LOW);
            break;
        case sIOtype_CONNECT:
            digitalWrite(LED_READY, LOW);
            Serial.println("[SENSOR] - Connection Opened and Connected with the server!");

            socketIO.send(sIOtype_CONNECT, "/");
            SendStatusSensor("register-sensor");
            
            // Seta o led 2 como ativado para demonstrar estar disponivel
            digitalWrite(LED_READY, HIGH);
            break;
        case sIOtype_EVENT: {
            char *sptr = NULL;
            int id = strtol((char *)payload, &sptr, 10);
            Serial.printf("[IOc] get id: %d\n", id);
            if (id) {
                payload = (uint8_t *)sptr;
            }
            DynamicJsonDocument doc(1024);
            DeserializationError error = deserializeJson(doc, payload, length);
            if (error) {
                Serial.print(F("deserializeJson() failed: "));
                Serial.println(error.c_str());
                return;
            }

            String eventName = doc[0];
            Serial.printf("[IOc] event name: %s\n", eventName.c_str());

            String message;
            if (eventName == "start") {
                cmdActual = 1;
                //socketIO.sendEVENT("[sensor-running]");
                message = MountEmptyMessage("sensor-running");
                socketIO.sendEVENT(message);
            }
            if (eventName == "stop") {
                cmdActual = 2;
                message = MountEmptyMessage("sensor-stopped");
                socketIO.sendEVENT(message);
            }
            if (eventName == "calibrate") {
                cmdActual = 3;
            }

            if (id) {
                // creat JSON message for Socket.IO (ack)
                DynamicJsonDocument docOut(512);
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
        } break;
        case sIOtype_ACK:
            Serial.printf("[SENSOR:IO] - get ack: %u\n", length);
            break;
        case sIOtype_ERROR:
            Serial.printf("[SENSOR:IO] - get error: %u\n", length);
            break;
        case sIOtype_BINARY_EVENT:
            Serial.printf("[SENSOR:IO] - get binary: %u\n", length);
            break;
        case sIOtype_BINARY_ACK:
            Serial.printf("[SENSOR:IO] - get binary ack: %u\n", length);
            break;
    }
}

void SetWebsocketClient() {
    Serial.println("[SENSOR:IO] - Starting the Websocket Client");
    // Callback of events
    socketIO.onEvent(onSocketClientEvent);

    // Configure time zone
    timeClient.begin();
    timeClient.forceUpdate();
}

void ConnectBackend() {
    Serial.println("[SENSOR:IO] - Not connected to the server!");
    socketIO.begin(backend, backendPort.toInt(), "/socket/?EIO=4", "arduino");
    vTaskDelay(500 / portTICK_PERIOD_MS);
}

String MountEmptyMessage(String event) {
    DynamicJsonDocument doc(256);
    JsonArray array = doc.to<JsonArray>();
    array.add(event);
    array.add("");

    // Zerar mensagem
    String message;
    serializeJson(doc, message);
    Serial.println(message);
    return message;
}

void SendStatusSensor(String type) {
    DynamicJsonDocument statusDoc(256);
    JsonArray array = statusDoc.to<JsonArray>();
    
    // Adição do evento para o socket.io
    array.add(type);

    JsonObject param = array.createNestedObject();
    param["ip"] = WiFi.localIP().toString();
    param["origin"] = "SENSOR";
    param["sensorName"] = nameSensor;
    param["ssid"] = ssid;
    param["password"] = password;
    param["backend"] = backend;
    param["backendPort"] = backendPort;

    String content;
    serializeJson(statusDoc, content);
    Serial.println(content);
    socketIO.sendEVENT(content);
}

#endif  // MPU_SOCKET_SERVER_SOCKET_CLIENT_H