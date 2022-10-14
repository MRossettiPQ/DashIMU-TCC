#ifndef SENSOR_FILE_SYSTEM_H
#define SENSOR_FILE_SYSTEM_H

#include <config.h>

void InitFileSystem() {
    if (!SPIFFS.begin(true)) {
        Serial.println("An error has occurred while mounting SPIFFS");
    }
    Serial.println("SPIFFS mounted successfully");
    ssid = ReadFile(SPIFFS, SSID_PATH);
    password = ReadFile(SPIFFS, PASSWORD_PATH);
    ip = ReadFile(SPIFFS, IP_PATH);
    backend = ReadFile(SPIFFS, BACKEND_PATH);
    backendPort = ReadFile(SPIFFS, BACKEND_PORT_PATH);
    nameSensor = ReadFile(SPIFFS, NAME_SENSOR_PATH);

    Serial.println("SSID: " + ssid + ",Password: " + password + ",IP: " + ip);
    Serial.println("Backend url: " + backend + ",Backend port: " + backendPort + ",Sensor name: " + nameSensor);

    if (InitWiFi()) {
        configurationServer.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
            request->send(SPIFFS, "/index.html", "text/html", false, Processor);
        });
        configurationServer.serveStatic("/", SPIFFS, "/");
        configurationServer.begin();
    } else {
        Serial.println("Setting Access Point");
        WiFi.softAP("ESP32-WIFI-MANAGER", nullptr);

        IPAddress IP = WiFi.softAPIP();
        Serial.print("AP IP address: " + IP.toString());

        configurationServer.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
            request->send(SPIFFS, "/wifimanager.html", "text/html");
        });

        configurationServer.serveStatic("/", SPIFFS, "/");
        configurationServer.on("/", HTTP_POST, [](AsyncWebServerRequest *request) {
            int params = request->params();
            for(int i=0;i<params;i++){
                AsyncWebParameter* p = request->getParam(i);
                if(p->isPost()){
                    // HTTP POST ssid value
                    if (p->name() == input_ssid) {
                        ssid = p->value().c_str();
                        Serial.print("SSID set to: " + ssid);
                        WriteFile(SPIFFS, SSID_PATH, ssid.c_str());
                    }
                    // HTTP POST password value
                    if (p->name() == input_password) {
                        password = p->value().c_str();
                        Serial.print("Password set to: " + password);
                        WriteFile(SPIFFS, PASSWORD_PATH, password.c_str());
                    }
                    // HTTP POST ip value
                    if (p->name() == input_ip) {
                        ip = p->value().c_str();
                        Serial.print("IP Address set to: " + ip);
                        WriteFile(SPIFFS, IP_PATH, ip.c_str());
                    }
                    // HTTP POST ip value
                    if (p->name() == input_backend) {
                        backend = p->value().c_str();
                        Serial.print("IP Backend set to: " + backend);
                        WriteFile(SPIFFS, BACKEND_PATH, backend.c_str());
                    }
                    if (p->name() == input_backendPort) {
                        backendPort = p->value().c_str();
                        Serial.print("IP Backend Port set to: " + backendPort);
                        WriteFile(SPIFFS, BACKEND_PORT_PATH, backendPort.c_str());
                    }
                    if (p->name() == input_nameSensor) {
                        nameSensor = p->value().c_str();
                        Serial.print("Name sensor set to: " + nameSensor);
                        WriteFile(SPIFFS, IP_PATH, nameSensor.c_str());
                    }
                }
            }
            request->send(200, "text/plain", "Success. ESP32 will now restart. Connect to your router and go to IP address: " + ip);
            delay(3000);
            ESP.restart();
        });
        configurationServer.begin();
    }
}

String ReadFile(fs::FS &fs, const char *path) {
    Serial.printf("Reading file: %s\r\n", path);

    File file = fs.open(path);
    if (!file || file.isDirectory()) {
        Serial.println("- failed to open file for reading");
        return {};
    }

    String fileContent;
    while (file.available()) {
        fileContent = file.readStringUntil('\n');
        break;
    }
    return fileContent;
}

void WriteFile(fs::FS &fs, const char *path, const char *message) {
    Serial.printf("Writing file: %s\r\n", path);

    File file = fs.open(path, FILE_WRITE);
    if (!file) {
        Serial.println("- failed to open file for writing");
        return;
    }
    if (file.print(message)) {
        Serial.println("- file written");
    } else {
        Serial.println("- frite failed");
    }
}

String Processor(const String& var) {
    if(var == "GPIO_STATE") {
        return var;
    }
    return {};
}

#endif //SENSOR_FILE_SYSTEM_H
