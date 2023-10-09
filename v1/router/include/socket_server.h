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
}

void InitServer() {
    Serial.println("[SENSOR] - Starting the Server");
    confServer.begin();
}

#endif  // MPU_SOCKET_SERVER_SOCKET_SERVER_H
