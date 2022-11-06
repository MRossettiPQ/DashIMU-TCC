#ifndef SENSOR_FILE_SYSTEM_H
#define SENSOR_FILE_SYSTEM_H

#include <config.h>
#include <string.h>

void InitFileSystem(){
    if (!SPIFFS.begin(true)){
        Serial.println("An error has occurred while mounting SPIFFS");
    }
    Serial.println("SPIFFS mounted successfully");
    
    ssid = ReadFile(SPIFFS, SSID_PATH);
    password = ReadFile(SPIFFS, PASSWORD_PATH);
    sensorFrequency = ReadFile(SPIFFS, SENSOR_FREQUENCY_PATH);
    backend = ReadFile(SPIFFS, BACKEND_PATH);
    backendPort = ReadFile(SPIFFS, BACKEND_PORT_PATH);
    nameSensor = ReadFile(SPIFFS, NAME_SENSOR_PATH);

    Serial.println("SSID: " + ssid + ",Password: " + password + ",Sensor Frequency: " + sensorFrequency);
    Serial.println("Backend url: " + backend + ",Backend port: " + backendPort + ",Sensor name: " + nameSensor);

    configurationServer.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
        Serial.println("index.html enviado para usuario");
        request->send(SPIFFS, "/index.html", "text/html");
    });

    configurationServer.on("/memo", HTTP_GET, [](AsyncWebServerRequest *request){
        String content = R"({"ssid":")" + ssid + R"(","password":")" + password + R"(","sensorFrequency":")" + sensorFrequency + "\"";
        content = content + R"(,"backend":")" + backend + + R"(","backendPort":")" + backendPort + R"(","nameSensor":")" + nameSensor + "\"}";
        request->send(200, "text/json", content);
    });

    configurationServer.serveStatic("/", SPIFFS, "/");
    configurationServer.on("/", HTTP_POST, [](AsyncWebServerRequest *request){
        int params = request->params();

        Serial.println("request->params()");
        for(int i=0;i<params;i++){
            AsyncWebParameter* p = request->getParam(i);

            Serial.println(p->isPost());
            Serial.println(p->name() + "" + p->value().c_str());
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
            // HTTP POST Sensor frequency value
            if (p->name() == input_sensorFrequency) {
                sensorFrequency = p->value().c_str();
                Serial.print("Sensor frequenct set to: " + sensorFrequency);
                WriteFile(SPIFFS, SENSOR_FREQUENCY_PATH, sensorFrequency.c_str());
            }
            // HTTP POST ip value
            if (p->name() == input_backend) {
                backend = p->value().c_str();
                Serial.print("IP Backend set to: " + backend);
                WriteFile(SPIFFS, BACKEND_PATH, backend.c_str());
            }
            // HTTP POST port value
            if (p->name() == input_backendPort) {
                backendPort = p->value().c_str();
                Serial.print("IP Backend Port set to: " + backendPort);
                WriteFile(SPIFFS, BACKEND_PORT_PATH, backendPort.c_str());
            }
            // HTTP POST sensor name value
            if (p->name() == input_nameSensor) {
                nameSensor = p->value().c_str();
                Serial.print("Name sensor set to: " + nameSensor);
                WriteFile(SPIFFS, NAME_SENSOR_PATH, nameSensor.c_str());
            }
        }
        request->send(200, "text/plain", "Success. ESP32 will now restart. Connect to your router and go to IP address: " + WiFi.localIP().toString());
        delay(3000);
        ESP.restart();
    });

    if (!InitWiFi()) {
        int numRandom = getRandom(0, 100, 1);
        //char *ssidName = ;
        //strcpy(ssidName, toUpperCase(numRandom));
        WiFi.softAP("ESP32-WIFI-MANAGER-", nullptr);

        IPAddress IP = WiFi.softAPIP();
        Serial.println("AP IP address: " + IP.toString());
    }

    configurationServer.begin();
}

String ReadFile(fs::FS &fs, const char *path) {
    Serial.printf("Reading file: %s\r\n", path);

    File file = fs.open(path);
    if (!file || file.isDirectory())
    {
        Serial.println("- failed to open file for reading");
        return {};
    }

    String fileContent;
    while (file.available())
    {
        fileContent = file.readStringUntil('\n');
        break;
    }
    return fileContent;
}

void WriteFile(fs::FS &fs, const char *path, const char *message) {
    Serial.printf("Writing file: %s\r\n", path);

    File file = fs.open(path, FILE_WRITE);
    if (!file)
    {
        Serial.println("- failed to open file for writing");
        return;
    }
    if (file.print(message))
    {
        Serial.println("- file written");
    }
    else
    {
        Serial.println("- file write failed");
    }
}

int getRandom(int lower, int upper, int count){
    int i;
    int num = 0;
    for (i = 0; i < count; i++) {
        num = (rand() % (upper - lower + 1)) + lower;
        Serial.println(num);
    }
    return num;
}

String processor(const String& var){
    if(var == "STATE") {
        return ssid;
    }
    if(var == "STATE") {
        return password;
    }
    if(var == "STATE") {
        return sensorFrequency;
    }
    if(var == "STATE") {
        return backend;
    }
    if(var == "STATE") {
        return backendPort;
    }
    if(var == "STATE") {
        return nameSensor;
    }
    return String();
}

#endif // SENSOR_FILE_SYSTEM_H
