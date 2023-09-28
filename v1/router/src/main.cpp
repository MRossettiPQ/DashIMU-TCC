#include <Arduino.h>

#include "config.h"
#include "file_system.h"
#include "socket_server.h"
#include "wifi_local.h"

void setup() {
    Serial.begin(115200);
    digitalWrite(LED_READY, LOW);

    //  Initialize FileSystem
    InitFileSystem();

    //  Initialize WiFi AP Station
    SetWiFi();

    digitalWrite(LED_READY, HIGH);
}

void loop() {
    // Running time actual
    unsigned long current_millis = millis();
    connected = WiFiClass::status() == WL_CONNECTED;

    if (!connected) {
        StartWiFi();

        vTaskDelay(500 / portTICK_PERIOD_MS);
        digitalWrite(LED_READY, HIGH);
        vTaskDelay(500 / portTICK_PERIOD_MS);
        digitalWrite(LED_READY, LOW);
    }
}