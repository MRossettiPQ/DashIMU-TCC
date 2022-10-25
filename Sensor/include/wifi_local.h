#ifndef SENSOR_WIFI_LOCAL_H
#define SENSOR_WIFI_LOCAL_H

#include <config.h>

bool InitWiFi() {
    // Init WiFi
    Serial.println("[SENSOR] - Configuring WiFi");

    if(ssid == ""){
        Serial.println("Undefined SSID or IP address.");
        return false;
    }

    WiFiClass::mode(WIFI_STA);

    WiFi.begin(ssid.c_str(), password.c_str());
    Serial.println("Connecting to WiFi...");

    while(WiFiClass::status() != WL_CONNECTED) {
        tryConnectWifi++;
        delay(500);
        Serial.print('.');
        if (tryConnectWifi == 25) {
            Serial.println("Restarting WIFI");
            WiFi.disconnect(true, true);
            tryConnectWifi = 0;
            return false;
        }
    }
    connectedWiFi = true;
    digitalWrite(LED_WIFI_CONNECTED, HIGH);
    Serial.println("[SENSOR] - Wi-Fi connection established");
    Serial.println("[SENSOR] - IP address:\t" + WiFi.localIP().toString());
    return true;
}

#endif //SENSOR_WIFI_LOCAL_H
