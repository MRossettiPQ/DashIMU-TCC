#ifndef MPU_SOCKET_SERVER_NOTIFICATION_H
#define MPU_SOCKET_SERVER_NOTIFICATION_H

#include <config.h>

void InitNotification(){
    Serial.println("[SENSOR] - Initialize notification pins");
    pinMode(LED_WIFI_CONNECTED, OUTPUT);
    pinMode(LED_WIFI_AP, OUTPUT);
    pinMode(LED_SENSOR_INITIALIZED, OUTPUT);
    pinMode(LED_SENSOR_CALIBRATION_PLAN, OUTPUT);
    pinMode(LED_SENSOR_CALIBRATION_EIGHT, OUTPUT);
    pinMode(LED_SERVER_CREATED, OUTPUT);
    pinMode(LED_CLIENT_CONNECTED, OUTPUT);
    pinMode(LED_READY, OUTPUT);
}

#endif //MPU_SOCKET_SERVER_NOTIFICATION_H
