#include <Arduino.h>

#include "config.h"
#include "file_system.h"
#include "mpu_sensor.h"
#include "notification.h"
#include "socket_client.h"
#include "socket_server.h"
#include "wifi_local.h"

void setup() {
    Serial.begin(115200);
    digitalWrite(LED_READY, LOW);
    //  Initialize notification

    InitNotification();

    //  Initialize FileSystem
    InitFileSystem();

    //  Initialize WiFi AP Station
    SetWiFi();

    //  Initialize MPU-9250
    InitIMU();

    Serial.println("[SENSOR] - Load calibration");
    LoadIMUCalibration();
    //  Initialize CalibrateIMU
    //  CalibrateIMU();

    digitalWrite(LED_READY, HIGH);
}

void loop() {
    // running time atual
    unsigned long current_millis = millis();
    connected = WiFiClass::status() == WL_CONNECTED;

    confServerSocket.cleanupClients();

    if ((current_millis >= (last_clean_up + delayCleanupClients)) && connected) {
        // Verifica e limpa a lista de usuario a cada 500ms
        last_clean_up = current_millis;
        confServerSocket.pingAll();
        bool available = clientBackEnd.available();
        if (available) {
            clientBackEnd.poll();
        }
        if (!available) {
            RestartMeasurement();
            ConnectBackend();
        }
    }

    if ((current_millis >= (previous_millis + delayInterval)) && connected) {
        // ACESSANDO O UPDATE DO GYROSCOPIO A CADA 8 ms
        previous_millis = current_millis;

        if (mpu.update()) {
            switch (cmdActual) {
                case 1:
                    // Serial.println("[SENSOR] - Mount/Send buffer");
                    MountBufferToSend();
                    break;

                case 2:
                    Serial.println("[SENSOR] - Pause");
                    RestartMeasurement();
                    break;

                case 3:
                    Serial.println("[SENSOR] - Restart");
                    RestartMeasurement();
                    break;

                default:
                    break;
            }
        }
    }

    if (!connected) {
        StartWiFi();

        vTaskDelay(500 / portTICK_PERIOD_MS);
        digitalWrite(LED_READY, HIGH);
        vTaskDelay(500 / portTICK_PERIOD_MS);
        digitalWrite(LED_READY, LOW);
    }
}