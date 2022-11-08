#include <Arduino.h>
#include "config.h"
#include "wifi_local.h"
#include "file_system.h"
#include "sensor_local.h"
#include "websocket_local.h"
#include "notification.h"

void setup() {
    Serial.begin(115200);

    InitFileSystem();

    InitWiFi();
    //  ScannerI2C();
    if (WiFiClass::status() == WL_CONNECTED) {
        InitIMU();
        //  Initialize notification
        InitNotification();
        //  Calibrate sensor
        CalibrateIMU();
        //  Create server
        InitWebsocketServer();
        // Configure time zone
        timeClient.begin();
        timeClient.forceUpdate();
        //  List server on backend
        InitWebsocketClient();
        
        digitalWrite(LED_READY, HIGH);
    }
}

void loop() {
    if (WiFiClass::status() == WL_CONNECTED) {
        serverSocketClientList = serverSocket.accept();
        clientBackEnd.send(R"({"available":"false"})");
        Serial.println("[SENSOR] - Customer connected");
        timeClient.update();

        while (serverSocketClientList.available()) {
            serverSocketClientList.poll();

            serverSocketClientList.onMessage(onMessageCallback);
            JsonObject obj = doc.as<JsonObject>();
            optReceivedFromCustomer = obj["cmd"].as<int>();
            if (optReceivedFromCustomer != 0) {
                cmdActual = optReceivedFromCustomer;
                optReceivedFromCustomer = 0;
            }
            switch (cmdActual) {
                case 1:
                    //Serial.println("[SENSOR] - Mount/Send buffer");
                    MountBufferToSend();
                    break;

                case 2:
                    Serial.println("[SENSOR] - Pause");
                    break;

                case 3:
                    Serial.println("[SENSOR] - Restart");
                    RestartMeasurement();
                    break;

                case 4:
                    StopMeasurement();
                    Serial.println("[SENSOR] - Calibrate sensor");
                    CalibrateIMU();
                    break;

                    /*
                        case 5:
                            StopMeasurement();
                            Serial.println("[SENSOR] - Save calibration");
                            SaveIMUCalibration();
                            break;

                        case 6:
                            StopMeasurement();
                            Serial.println("[SENSOR] - Load calibration");
                            LoadIMUCalibration();
                            break;
                    */
                default:
                    break;
            }

            delay(8);
        }
        Serial.println("[SENSOR] - No customer available");
        clientBackEnd.send(R"({"available":"true"})");
        serverSocketClientList.close();
        numberMeasurement = 0;
        lastDispatch = 0;
        cmdActual = 0;
        jsonBufferServer = "";
        delay(100);
    } else {
        delay(500);
        digitalWrite(LED_READY, HIGH);
        delay(500);
        digitalWrite(LED_READY, LOW);
    }
}