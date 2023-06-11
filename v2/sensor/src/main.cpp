#include <Arduino.h>

#include "config.h"
#include "file_system.h"
#include "http_server.h"
#include "mpu_sensor.h"
#include "notification.h"
#include "socket_client.h"
#include "wifi_local.h"

void setup() {
    Serial.begin(115200);
    //  Initialize notification
    InitNotification();

    //  Initialize FileSystem
    InitFileSystem();

    //  Initialize WiFi AP Station
    SetWiFi();

    //  Initialize MPU-9250
    InitIMU();

    LoadIMUCalibration();

    //  Initialize CalibrateIMU
    //  CalibrateIMU();
    
    SetWebsocketClient();

    // Quando não está conectado a Backend, tenta conectar.
    ConnectBackend();
}

void loop() {
    bool connectedWiFi = WiFiClass::status() == WL_CONNECTED;
    socketIO.loop();
    static uint32_t prev_ms = millis();

    if (socketIO.isConnected() && connectedWiFi) {
        // Apenas quando está conectado ao backend é que o sensor entra no fluxo de atualização do gyro
        if (mpu.update()) {
            if (millis() >= (prev_ms + TIME_BETWEEN_MEASUREMENT_MILIS)) {
                prev_ms = millis();
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
                        RestartMeasurement();
                        Serial.println("[SENSOR] - Calibrate sensor");
                        CalibrateIMU();
                        break;

                    default:
                        break;
                }
            }
        }
    }

    if (!connectedWiFi) {
        // Quando não está conectado a Wi-Fi, tenta conectar.
        StartWiFi();

        digitalWrite(LED_READY, HIGH);
        vTaskDelay(500 / portTICK_PERIOD_MS);

        digitalWrite(LED_READY, LOW);
        vTaskDelay(500 / portTICK_PERIOD_MS);
    }
}