#ifndef MPU_SOCKET_SERVER_FILE_SYSTEM_H
#define MPU_SOCKET_SERVER_FILE_SYSTEM_H
#include <config.h>

void InitFileSystem() {
    if (!SPIFFS.begin(true)) {
        Serial.println("An error has occurred while mounting SPIFFS");
    }
    Serial.println("SPIFFS mounted successfully");

    ssid = ReadFile(SPIFFS, SSID_PATH);
    password = ReadFile(SPIFFS, PASSWORD_PATH);
    sensorFrequency = ReadFile(SPIFFS, SENSOR_FREQUENCY_PATH);
    backend = ReadFile(SPIFFS, BACKEND_PATH);
    backendPort = ReadFile(SPIFFS, BACKEND_PORT_PATH);
    sensorName = ReadFile(SPIFFS, SENSOR_NAME_PATH);

    PrintFileSystem();
}

void PrintFileSystem() {
    Serial.println("SSID: " + ssid);
    Serial.println("Password: " + password);
    Serial.println("Backend url: " + backend);
    Serial.println("Backend port: " + backendPort);
    Serial.println("Sensor frequency: " + sensorFrequency);
    Serial.println("Sensor name: " + sensorName);
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
        Serial.println("- file write failed");
    }
}

int getRandom(int lower, int upper, int count) {
    int randomized = random(lower, upper);
    return randomized;
}

#endif //MPU_SOCKET_SERVER_FILE_SYSTEM_H
