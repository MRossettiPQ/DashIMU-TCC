#ifndef SENSOR_WIFI_LOCAL_H
#define SENSOR_WIFI_LOCAL_H

#include <config.h>

bool InitWiFi() {
    Serial.println("[SENSOR] - Configuring WiFi");

    if (ssid == "") {
        Serial.println("Undefined SSID");
    }

    WiFiClass::mode(WIFI_AP_STA);

    String name = "ESP32-WIFI-MANAGER-";
    char *ssidName = const_cast<char *>(name.c_str());
    char str[256];
    itoa(getRandom(0, 100, 1), str, 10);
    strcat(ssidName, str);
    WiFi.softAP(ssidName, nullptr);

    configurationServer.begin();

    IPAddress IP = WiFi.softAPIP();
    Serial.println("AP IP address: " + IP.toString() + ", SSID: " + ssidName);

    if (!WiFi.config(localIP, gateway, subnet)) {
        Serial.println("STA Failed to configure");
        return false;
    }

    if (ssid != "") {
        StartWiFi();
        Serial.println("[SENSOR] - Wi-Fi connection established - IP address: " + WiFi.localIP().toString());
        return true;
    } 

    return false;
}

bool StartWiFi() {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid.c_str(), password.c_str());
    while (WiFiClass::status() != WL_CONNECTED) {
        tryConnectWifi++;
        delay(500);
        Serial.print('.');

        if (tryConnectWifi == 50) {
            Serial.println("Restarting WIFI");
            Serial.println("SSID: " + ssid);
            Serial.println("Password: " + password);
            tryConnectWifi = 0;
        }
    }
    return true;
}

void WiFiStationDisconnected(WiFiEvent_t event, WiFiEventInfo_t info) {
    Serial.println("Disconnected from WiFi access point");
    Serial.print("WiFi lost connection. Reason: ");
    Serial.println(info.wifi_sta_disconnected.reason);
    Serial.println("Trying to Reconnect");
    WiFi.begin(ssid.c_str(), password.c_str());
}

#endif //SENSOR_WIFI_LOCAL_H
