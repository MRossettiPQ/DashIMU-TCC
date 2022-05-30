#ifndef SENSOR_WIFI_LOCAL_H
#define SENSOR_WIFI_LOCAL_H

#include <config.h>

void InicializarWiFi() {
    // Inicializa WiFi
    Serial.println("[SENSOR] - Configurando WiFi");
    do {
        WiFi.disconnect(true, true);
        WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
        delay(2500);
        // Verifica se a conexão foi estabelecida
    } while (WiFi.status() != WL_CONNECTED);
    Serial.println("[SENSOR] - Conexão Wi-Fi estabelecida");
    Serial.println("[SENSOR] - Endereço IP:\t" + WiFi.localIP().toString());
}

#endif //SENSOR_WIFI_LOCAL_H
