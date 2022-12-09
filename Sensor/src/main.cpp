#include <Arduino.h>
#include "config.h"
#include "file_system.h"
#include "wifi_local.h"
#include "notification.h"
#include "socket_client.h"
#include "socket_server.h"
#include "mpu_sensor.h"
#include "core_system.h"

void setup()
{
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

    //  Initialize CalibrateIMU
    CalibrateIMU();

    //  Initialize Web Server and Web Socket
    SetServer();

    SetWebsocketClient();

    //  xTaskCreatePinnedToCore(CoreLoop, "CoreLoop", STACK_CORE * 1024, nullptr, 2, &TaskCoreLoop, 0);
}

void loop()
{
    static uint32_t prev_ms = millis();
    static uint32_t last_clean_up = prev_ms;

    if(mpu.update()) {
        if (WiFiClass::status() == WL_CONNECTED)
        {
            if (millis() > last_clean_up + 300)
            {
                last_clean_up = millis();
                confServerSocket.cleanupClients();
                if (clientBackEnd.available())
                {
                    clientBackEnd.poll();
                }
                else
                {
                    RestartMeasurement();
                    ConnectBackend();
                }
            }
        }

        if ((millis() > prev_ms + TIME_BETWEEN_MEASUREMENT_MILIS))
        {
            prev_ms = millis();
            switch (cmdActual)
            {
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

        if (WiFiClass::status() != WL_CONNECTED) {
            StartWiFi();

            vTaskDelay(500 / portTICK_PERIOD_MS);
            digitalWrite(LED_READY, HIGH);
            vTaskDelay(500 / portTICK_PERIOD_MS);
            digitalWrite(LED_READY, LOW);
        }
    }
}