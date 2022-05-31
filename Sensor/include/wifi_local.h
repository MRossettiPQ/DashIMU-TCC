#ifndef SENSOR_WIFI_LOCAL_H
#define SENSOR_WIFI_LOCAL_H

#include <config.h>

void InicializarWiFi() {
    // Inicializa WiFi
    Serial.println("[SENSOR] - Configurando WiFi");

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        tentativaConectarWifi++;
        // Aguarda até a Wi-Fi conectar
        delay(500);
        Serial.print('.');
        if (tentativaConectarWifi == 25) {
            Serial.println("Reiniciando WIFI");
            WiFi.disconnect(true, true);
            tentativaConectarWifi = 0;
            WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
        }
    }
    Serial.println("[SENSOR] - Conexão Wi-Fi estabelecida");
    Serial.println("[SENSOR] - Endereço IP:\t" + WiFi.localIP().toString());
}

#endif //SENSOR_WIFI_LOCAL_H
