#include <Arduino.h>
#include "config.h"
#include "file_system.h"
#include "wifi_local.h"
#include "notification.h"
#include "socket_client.h"
#include "http_server.h"
#include "mpu_sensor.h"

void setup(){
    Serial.begin(115200);
    //  Initialize notification
    InitNotification();

    //  Initialize FileSystem
    InitFileSystem();

    //  Initialize WiFi AP Station
    SetWiFi();

    //  Initialize MPU-9250
    InitIMU();

    //  Initialize CalibrateIMU
    //  CalibrateIMU();
}

void loop() {
        bool connectedWiFi = WiFiClass::status() == WL_CONNECTED;
        socketIO.loop();
        static uint32_t prev_ms = millis();
        static uint32_t last_clean_up = prev_ms;

        if (connectedWiFi && (millis() > (last_clean_up + 500))) {
            last_clean_up = millis();
            
            if(!socketIO.isConnected()) {
                // Quando não está conectado a Backend, tenta conectar.
                ConnectBackend();
            }
        }

        if (mpu.update()){
            if (millis() >= (prev_ms + TIME_BETWEEN_MEASUREMENT_MILIS)){
                prev_ms = millis();
                switch (cmdActual){
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

                    case 4:
                        RestartMeasurement();
                        Serial.println("[SENSOR] - Calibrate sensor");
                        CalibrateIMU();
                        break;

                    case 5:
                        RestartMeasurement();
                        Serial.println("[SENSOR] - Load calibration");
                        LoadIMUCalibration();
                        break;

                    default:
                        break;
                }
            }

            if (!connectedWiFi){
                // Quando não está conectado a Wi-Fi, tenta conectar.
                StartWiFi();

                vTaskDelay(500 / portTICK_PERIOD_MS);
                digitalWrite(LED_READY, HIGH);

                vTaskDelay(500 / portTICK_PERIOD_MS);
                digitalWrite(LED_READY, LOW);
            }
    }
}