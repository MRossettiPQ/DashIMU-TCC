#ifndef MPU_SOCKET_SERVER_NOTIFICATION_H
#define MPU_SOCKET_SERVER_NOTIFICATION_H

#include <config.h>

void InitNotification() {
    Serial.println("[SENSOR] - Initialize notification pins");
    // TODO Pin generico e temporario
    pinMode(LED_READY, OUTPUT);
    // Desliga o led do pin 2
    digitalWrite(LED_READY, LOW);
}

#endif //MPU_SOCKET_SERVER_NOTIFICATION_H
