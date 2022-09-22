#include <Arduino.h>
#include "config.h"
#include "sensor_local.h"
#include "websocket_local.h"
#include "wifi_local.h"
#include "notification.h"

void setup() {
    Serial.begin(115200);
    //  Connect sensor
    InitIMU();
    //  Initialize notification
    // InitNotification();
    //  Wi-Fi
    InitWiFi();
    //  Calibrate sensor
    CalibrateIMU();
    //  Create server
    InitWebsocketServer();
    // Configure time zone
    timeClient.begin();
    timeClient.forceUpdate();
    //  List server on backend
    InitWebsocketClient();
}

void loop() {
    clientsList = serverSocket.accept();
    Serial.println("[SENSOR] - Customer connected");
    timeClient.update();
    numberMeasurement = 0;
    lastDispatch = 0;
    do {
        if (clientsList.available()) {
            clientsList.poll();
        }
        clientsList.onMessage(onMessageCallback);
        JsonObject obj = doc.as<JsonObject>();

        optReceivedFromCustomer = obj["cmd"].as<int>();
        Serial.println(&"[SENSOR] - Event optReceivedFromCustomer" [ optReceivedFromCustomer]);
        if (optReceivedFromCustomer != 0) {
            cmdActual = optReceivedFromCustomer;
        }
        switch (cmdActual) {
            case 1:
                Serial.println("[SENSOR] - Measurement");
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

            default:
                break;
        }

        delay(8);
    } while (clientsList.available());

    Serial.println("[SENSOR] - No customer available");
    clientsList.close();

    delay(100);
}