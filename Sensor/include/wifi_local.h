#ifndef SENSOR_WIFI_LOCAL_H
#define SENSOR_WIFI_LOCAL_H

#include <config.h>

void InitWiFi() {
    // Init WiFi
    Serial.println("[SENSOR] - Configuring WiFi");

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFiClass::status() != WL_CONNECTED) {
        tryConnectWifi++;
        // Waits for Wi-Fi to connect
        delay(500);
        Serial.print('.');
        if (tryConnectWifi == 25) {
            Serial.println("Restarting WIFI");
            WiFi.disconnect(true, true);
            tryConnectWifi = 0;
            WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
        }
    }
    digitalWrite(LED_WIFI_CONNECTED, HIGH);
    Serial.println("[SENSOR] - Wi-Fi connection established");
    Serial.println("[SENSOR] - IP address:\t" + WiFi.localIP().toString());
}


void ConfigureWiFi() {
    // Configure WiFi
    Serial.println("[SENSOR] - Configure WiFi");
    WiFi.disconnect(true, true);
    digitalWrite(LED_WIFI_AP, HIGH);
    WiFiClass::mode(WIFI_MODE_AP);
    configurationServer.begin();
    do {
        WiFiClient configurationClient = configurationServer.available();
        while (configurationClient.connected()) {
            String currentLine = "";
            if (configurationClient.available()) {
                char c = configurationClient.read();
                Serial.write(c);
                if (c == '\n') {
                    if (currentLine.length() == 0) {
                        configurationClient.println("HTTP/1.1 200 OK");
                        configurationClient.println("Content-type:text/html");
                        configurationClient.println();
                        configurationClient.print("Click <a href=\"/H\">here</a> to turn the LED on pin 2 on.<br>");
                        configurationClient.print("Click <a href=\"/L\">here</a> to turn the LED on pin 2 off.<br>");
                        configurationClient.println();
                        break;
                    } else {
                        currentLine = "";
                    }
                } else if (c != '\r') {
                    currentLine += c;
                }
            }
        }
        delay(100);
    } while (!wifiConfigured);
    WiFiClass::mode(WIFI_MODE_STA);
    digitalWrite(LED_WIFI_AP, LOW);
}

void SaveConfiguration(){
    StaticJsonDocument<512> json;
    json["backendIP"] = "testString";
    json["backendPort"] = "testString";
    json["wifiPassword"] = "testString";
    json["wifiSSID"] = "testString";
}

#endif //SENSOR_WIFI_LOCAL_H
