#ifndef MPU_SOCKET_SERVER_SOCKET_SERVER_H
#define MPU_SOCKET_SERVER_SOCKET_SERVER_H

#include <config.h>

void NotFoundController(AsyncWebServerRequest *request) {
    if (request->method() == HTTP_OPTIONS) {
        request->send(200);
    } else {
        request->send(404, "text/plain", "Not found");
    }
}

void SendAppController(AsyncWebServerRequest *request) {
    request->send(SPIFFS, "/index.html", "text/html");
}

void ConfigurationStateController(AsyncWebServerRequest *request) {
    String content = "{";
    content += R"("ssid":")" + ssid + "\",";
    content += R"("password":")" + password + "\",";
    content += R"("backend":")" + backend + "\",";
    content += R"("backendPort":")" + backendPort + "\",";
    content += R"("sensorName":")" + sensorName;
    content += "}";

    request->send(200, "text/json", content);
}

void CalibrateController(AsyncWebServerRequest *request) {

    RestartMeasurement();
    CalibrateIMU();

    request->send(200);
}


void ConfigurationSaveController(AsyncWebServerRequest *request) {
    int params = request->params();
    for (int i = 0; i < params; i++) {
        AsyncWebParameter *p = request->getParam(i);
        // HTTP POST ssid value
        if (p->name() == input_ssid) {
            ssid = p->value().c_str();
            WriteFile(SPIFFS, SSID_PATH, ssid.c_str());
        }
        // HTTP POST password value
        if (p->name() == input_password) {
            password = p->value().c_str();
            WriteFile(SPIFFS, PASSWORD_PATH, password.c_str());
        }
        // HTTP POST ip value
        if (p->name() == input_backend) {
            backend = p->value().c_str();
            WriteFile(SPIFFS, BACKEND_PATH, backend.c_str());
        }
        // HTTP POST port value
        if (p->name() == input_backendPort) {
            backendPort = p->value().c_str();
            WriteFile(SPIFFS, BACKEND_PORT_PATH, backendPort.c_str());
        }
        // HTTP POST sensor name value
        if (p->name() == input_sensorName) {
            sensorName = p->value().c_str();
            WriteFile(SPIFFS, SENSOR_NAME_PATH, sensorName.c_str());
        }
    }
    PrintFileSystem();

    request->send(200);

    delay(3000);
    ESP.restart();
}

void GetMeasurementController(AsyncWebServerRequest *request) {
    String measurement = CreateJsonFromMeasurement(1);
    String content = R"({"message":)" + measurement + ",";
    content += R"("origin": "SENSOR",)";
    content += R"("type": "UNIQUE_MEASUREMENT"})";
    request->send(200, "text/json", content);
}

void SetServer() {
    Serial.println("[SENSOR] - Set th Server");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    confServer.serveStatic("/", SPIFFS, "/");

    confServer.onNotFound(NotFoundController);

    confServer.on("/", HTTP_GET, SendAppController);

    confServer.on("/api/configuration", HTTP_GET, ConfigurationStateController);

    confServer.on("/api/configuration", HTTP_POST, ConfigurationSaveController);

    confServer.on("/api/measurement", HTTP_GET, GetMeasurementController);

    confServer.on("/api/calibrate", HTTP_POST, CalibrateController);

    confServerSocket.onEvent(onWsServerEvent);

    confServer.addHandler(&confServerSocket);
}

void InitServer() {
    Serial.println("[SENSOR] - Starting the Server");
    confServer.begin();
}

void HandleServerMessage(AwsFrameInfo *info, uint8_t *data, size_t len) {
    int cmdReceivedFromClient = 0;
    if (info->final && (info->index == 0) && (info->len == len)) {
        if (info->opcode == WS_TEXT) {
            data[len] = 0;
            Serial.print("data is ");
            Serial.println((char *)data);
            DynamicJsonDocument doc(512);
            deserializeJson(doc, (char *)data);
            if (doc["message"]["cmd"].as<String>()) {
                cmdReceivedFromClient = doc["message"]["cmd"].as<int>();
                if (cmdReceivedFromClient != 0) {
                    Serial.println("Diferent of 0");
                }
                cmdActual = cmdReceivedFromClient;
                Serial.printf("\ncmdActual %d\n", cmdActual);
            }
        } else {
            Serial.println("Received a ws message, but it isn't text");
        }
    } else {
        Serial.println("Received a ws message, but it didn't fit into one frame");
    }
}

void onWsServerEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
    switch (type) {
        case WS_EVT_CONNECT:
            Serial.println("Websocket client connection received");
            Serial.println(available);
            if (available) {
                available = false;
                RestartMeasurement();
                SendStatusSensor();
            } else {
                client->close(1000, "Sensor já está em uso por outra sessão");
            }
            break;
        case WS_EVT_DISCONNECT:
            Serial.println("Websocket disconnected");
            available = true;
            SendStatusSensor();
            RestartMeasurement();
            break;
        case WS_EVT_DATA:
            Serial.println("Websocket data");
            HandleServerMessage((AwsFrameInfo *)arg, data, len);
            break;
        case WS_EVT_PONG:
            Serial.println("Websocket pong: ");
            client->ping();
            break;
        case WS_EVT_ERROR:
            Serial.println("Websocket error ");
            available = true;
            SendStatusSensor();
            RestartMeasurement();
            break;
    }
}
#endif  // MPU_SOCKET_SERVER_SOCKET_SERVER_H
