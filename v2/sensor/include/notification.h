#ifndef MPU_SOCKET_SERVER_NOTIFICATION_H
#define MPU_SOCKET_SERVER_NOTIFICATION_H

#include <config.h>

void InitNotification() {
    Serial.println("[SENSOR] - Initialize notification pins");
    // TODO Futuramente setar led para cada caso abaixo.
    // Ao conectar na wifi
    pinMode(LED_WIFI_CONNECTED, OUTPUT);
    // Ao ativar AP
    pinMode(LED_WIFI_AP, OUTPUT);
    // Ao inicializar sensor
    pinMode(LED_SENSOR_INITIALIZED, OUTPUT);
    // Ao chegar na etapa de calibração -> "Em local plano"
    pinMode(LED_SENSOR_CALIBRATION_PLAN, OUTPUT);
    // Ao chegar na etapa de calibração -> "Movimentar em forma de 8"
    pinMode(LED_SENSOR_CALIBRATION_EIGHT, OUTPUT);
    // Ao inicializar o server HTTP
    pinMode(LED_SERVER_CREATED, OUTPUT);
    // Ao ter clientes observando os dados desse sensor
    pinMode(LED_CLIENT_CONNECTED, OUTPUT);
    // TODO Pin generico e temporario
    pinMode(LED_READY, OUTPUT);
    // Desliga o led do pin 2
    digitalWrite(LED_READY, LOW);
}

#endif  // MPU_SOCKET_SERVER_NOTIFICATION_H
