#ifndef MPU_SOCKET_SERVER_FILE_SYSTEM_H
#define MPU_SOCKET_SERVER_FILE_SYSTEM_H
#include <config.h>

void InitFileSystem() {
    if (!SPIFFS.begin(true)) {
        Serial.println("[SENSOR:FS] - An error has occurred while mounting SPIFFS");
    }
    Serial.println("[SENSOR:FS] - SPIFFS mounted successfully");

    ssid = ReadFile(SPIFFS, SSID_PATH);
    password = ReadFile(SPIFFS, PASSWORD_PATH);
    sensorFrequency = ReadFile(SPIFFS, SENSOR_FREQUENCY_PATH);
    backend = ReadFile(SPIFFS, BACKEND_PATH);
    backendPort = ReadFile(SPIFFS, BACKEND_PORT_PATH);
    nameSensor = ReadFile(SPIFFS, NAME_SENSOR_PATH);

    PrintFileSystem();
}

void PrintFileSystem() {
    Serial.println("[SENSOR:FS:DATA] - SSID: " + ssid);
    Serial.println("[SENSOR:FS:DATA] - Password: " + password);
    Serial.println("[SENSOR:FS:DATA] - Backend url: " + backend);
    Serial.println("[SENSOR:FS:DATA] - Backend port: " + backendPort);
    Serial.println("[SENSOR:FS:DATA] - Sensor frequency: " + sensorFrequency);
    Serial.println("[SENSOR:FS:DATA] - Sensor name: " + nameSensor);
}

String ReadFile(fs::FS &fs, const char *path) {
    Serial.printf("[SENSOR:FS] - Reading file: %s\r\n", path);

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
    Serial.printf("[SENSOR:FS] - Writing file: %s\r\n", path);

    File file = fs.open(path, FILE_WRITE);
    if (!file) {
        Serial.println("- failed to open file for writing");
        return;
    }

    if (file.print(message)) {
        Serial.println("- file written");
    } else {
        Serial.println("- file write failed");
    }
}

int getRandom(int lower, int upper, int count) {
    return random(lower, upper);
}

#endif  // MPU_SOCKET_SERVER_FILE_SYSTEM_H
