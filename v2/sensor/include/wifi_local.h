#ifndef MPU_SOCKET_SERVER_WIFI_LOCAL_H
#define MPU_SOCKET_SERVER_WIFI_LOCAL_H

#include <config.h>

void SetWiFi() {
    Serial.println("[SENSOR:WiFi] - Configuring WiFi");
    // 
    WiFiClass::mode(WIFI_AP_STA);
    // 
    WiFi.onEvent(EventsWiFi);
    // 
    String name = "MPU-MANAGER-";
    char *ssidName = const_cast<char *>(name.c_str());
    char str[256];
    itoa(getRandom(0, 100, 1), str, 10);
    strcat(ssidName, str);
    WiFi.softAP(ssidName, nullptr);
    //
    SetServer();

    //  Initialize Web Server and Web Socket
    InitServer();

    IPAddress IP = WiFi.softAPIP();
    Serial.println("[SENSOR:WiFi] - AP IP address: " + IP.toString() + ", SSID: " + ssidName);

    if (!WiFi.config(localIP, gateway, subnet)) {
        Serial.println("[SENSOR:WiFi] - STA Failed to configure");
        ESP.restart();
    }

    StartWiFi();
}

void StartWiFi() {
    Serial.println("[SENSOR:WiFi] - Connecting to WiFi...");
    if (ssid != "") {
        WiFi.begin(ssid.c_str(), password.c_str());
        if (WiFiClass::status() != WL_CONNECTED) {
            Serial.println("[SENSOR:WiFi] - WiFi not connected");
        }

        if (WiFiClass::status() == WL_CONNECTED) {
            addressESP = WiFi.localIP().toString();

            timeClient.begin();
            timeClient.update();

            Serial.println("[SENSOR:WiFi] - Wi-Fi connection established - IP address: " + addressESP);
            Serial.println("[SENSOR:WiFi] - IP Address:\t" + addressESP + ":" + WEB_PORT);
        }
    }
}

String ScanWiFi() {
    String wifiList = "[";
    /*
    int n = WiFi.scanComplete();
    if (n == -2) {
        WiFi.scanNetworks(true);
    } else if (n) {
        for (int i = 0; i < n; ++i) {
            if (i) wifiList += ",";
            wifiList += "{";
            wifiList += R"("rssi":")" + String(WiFi.RSSI(i)) + "\"";
            wifiList += R"(,"ssid":")" + WiFi.SSID(i) + "\"";
            wifiList += R"(,"bssid":")" + WiFi.BSSIDstr(i) + "\"";
            wifiList += R"(,"channel":")" + String(WiFi.channel(i)) + "\"";
            wifiList += R"(,"secure":")" + String(WiFi.encryptionType(i)) + "\"";
            wifiList += "}";
        }
        WiFi.scanDelete();
        if (WiFi.scanComplete() == -2) {
            WiFi.scanNetworks(true);
        }
    }*/
    wifiList += "]";
    return wifiList;
}

void EventsWiFi(WiFiEvent_t event) {
    Serial.printf("[WiFi:EVENT] event: %d\n", event);
    switch (event) {
        case ARDUINO_EVENT_WIFI_READY:
            Serial.println("[SENSOR:WiFi] - WiFi interface ready");
            break;
        case ARDUINO_EVENT_WIFI_SCAN_DONE:
            Serial.println("[SENSOR:WiFi] - Completed scan for access points");
            break;
        case ARDUINO_EVENT_WIFI_STA_START:
            Serial.println("[SENSOR:WiFi] - WiFi client started");
            break;
        case ARDUINO_EVENT_WIFI_STA_STOP:
            Serial.println("[SENSOR:WiFi] - WiFi clients stopped");
            break;
        case ARDUINO_EVENT_WIFI_STA_CONNECTED:
            Serial.println("[SENSOR:WiFi] - Connected to access point");
            break;
        case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
            Serial.println("[SENSOR:WiFi] - Disconnected from WiFi access point");
            break;
        case ARDUINO_EVENT_WIFI_STA_AUTHMODE_CHANGE:
            Serial.println("[SENSOR:WiFi] - Authentication mode of access point has changed");
            break;
        case ARDUINO_EVENT_WIFI_STA_GOT_IP:
            Serial.print("[SENSOR:WiFi] - Obtained IP address: ");
            Serial.println(WiFi.localIP());
            break;
        case ARDUINO_EVENT_WIFI_STA_LOST_IP:
            Serial.println("[SENSOR:WiFi] - Lost IP address and IP address is reset to 0");
            break;
        case ARDUINO_EVENT_WPS_ER_SUCCESS:
            Serial.println("[SENSOR:WiFi] - WiFi Protected Setup (WPS): succeeded in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_FAILED:
            Serial.println("[SENSOR:WiFi] - WiFi Protected Setup (WPS): failed in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_TIMEOUT:
            Serial.println("[SENSOR:WiFi] - WiFi Protected Setup (WPS): timeout in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_PIN:
            Serial.println("[SENSOR:WiFi] - WiFi Protected Setup (WPS): pin code in enrollee mode");
            break;
        case ARDUINO_EVENT_WIFI_AP_START:
            Serial.println("[SENSOR:WiFi] - WiFi access point started");
            break;
        case ARDUINO_EVENT_WIFI_AP_STOP:
            Serial.println("[SENSOR:WiFi] - WiFi access point  stopped");
            break;
        case ARDUINO_EVENT_WIFI_AP_STACONNECTED:
            Serial.println("[SENSOR:WiFi] - Client connected");
            break;
        case ARDUINO_EVENT_WIFI_AP_STADISCONNECTED:
            Serial.println("[SENSOR:WiFi] - Client disconnected");
            break;
        case ARDUINO_EVENT_WIFI_AP_STAIPASSIGNED:
            Serial.println("[SENSOR:WiFi] - Assigned IP address to client");
            break;
        case ARDUINO_EVENT_WIFI_AP_PROBEREQRECVED:
            Serial.println("[SENSOR:WiFi] - Received probe request");
            break;
        case ARDUINO_EVENT_WIFI_AP_GOT_IP6:
            Serial.println("[SENSOR:WiFi] - AP IPv6 is preferred");
            break;
        case ARDUINO_EVENT_WIFI_STA_GOT_IP6:
            Serial.println("[SENSOR:WiFi] - STA IPv6 is preferred");
            break;
        case ARDUINO_EVENT_ETH_GOT_IP6:
            Serial.println("[SENSOR:WiFi] - Ethernet IPv6 is preferred");
            break;
        case ARDUINO_EVENT_ETH_START:
            Serial.println("[SENSOR:WiFi] - Ethernet started");
            break;
        case ARDUINO_EVENT_ETH_STOP:
            Serial.println("[SENSOR:WiFi] - Ethernet stopped");
            break;
        case ARDUINO_EVENT_ETH_CONNECTED:
            Serial.println("[SENSOR:WiFi] - Ethernet connected");
            break;
        case ARDUINO_EVENT_ETH_DISCONNECTED:
            Serial.println("[SENSOR:WiFi] - Ethernet disconnected");
            break;
        case ARDUINO_EVENT_ETH_GOT_IP:
            Serial.println("[SENSOR:WiFi] - Obtained IP address");
            break;
        default:
            break;
    }
}

#endif  // MPU_SOCKET_SERVER_WIFI_LOCAL_H
