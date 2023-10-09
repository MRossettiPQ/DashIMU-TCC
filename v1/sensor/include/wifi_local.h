#ifndef MPU_SOCKET_SERVER_WIFI_LOCAL_H
#define MPU_SOCKET_SERVER_WIFI_LOCAL_H

#include <config.h>

void SetWiFi() {
    Serial.println("[SENSOR] - Configuring WiFi");

    WiFiClass::mode(WIFI_AP_STA);

    WiFi.onEvent(EventsWiFi);
    String name = "MPU-MANAGER-";
    char *ssidName = const_cast<char *>(name.c_str());
    char str[256];
    itoa(getRandom(0, 100), str, 10);
    strcat(ssidName, str);
    WiFi.softAP(ssidName, nullptr);

    SetServer();

    //  Initialize Web Server and Web Socket
    InitServer();

    IPAddress IP = WiFi.softAPIP();
    Serial.println("AP IP address: " + IP.toString() + ", SSID: " + ssidName);

    if (!WiFi.config(localIP, gateway, subnet)) {
        Serial.println("STA Failed to configure");
        ESP.restart();
    }

    StartWiFi();
}

void StartWiFi() {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid.c_str(), password.c_str());
    vTaskDelay(100 / portTICK_PERIOD_MS);

    if (WiFiClass::status() != WL_CONNECTED) {
        Serial.println("WiFi not connectedWifi");
    } else {
        Serial.println("");
        addressESP = WiFi.localIP().toString();
        Serial.println("\n[SENSOR] - Wi-Fi connection established - IP address: " + addressESP);
        Serial.println("\n[SENSOR] - IP Address:\t" + addressESP + ":" + WEB_PORT);
    }
}

void EventsWiFi(WiFiEvent_t event) {
    Serial.printf("[WiFi-event] event: %d\n", event);
    switch (event) {
        case ARDUINO_EVENT_WIFI_READY:
            Serial.println("WiFi interface ready");
            break;
        case ARDUINO_EVENT_WIFI_SCAN_DONE:
            Serial.println("Completed scan for access points");
            break;
        case ARDUINO_EVENT_WIFI_STA_START:
            Serial.println("WiFi client started");
            break;
        case ARDUINO_EVENT_WIFI_STA_STOP:
            Serial.println("WiFi clients stopped");
            break;
        case ARDUINO_EVENT_WIFI_STA_CONNECTED:
            Serial.println("Connected to access point");
            break;
        case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
            Serial.println("Disconnected from WiFi access point");

            break;
        case ARDUINO_EVENT_WIFI_STA_AUTHMODE_CHANGE:
            Serial.println("Authentication mode of access point has changed");
            break;

        case ARDUINO_EVENT_WIFI_STA_GOT_IP:
            OnConnectWifi();
            break;
        case ARDUINO_EVENT_WIFI_STA_LOST_IP:
            Serial.println("Lost IP address and IP address is reset to 0");
            break;
        case ARDUINO_EVENT_WPS_ER_SUCCESS:
            Serial.println("WiFi Protected Setup (WPS): succeeded in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_FAILED:
            Serial.println("WiFi Protected Setup (WPS): failed in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_TIMEOUT:
            Serial.println("WiFi Protected Setup (WPS): timeout in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_PIN:
            Serial.println("WiFi Protected Setup (WPS): pin code in enrollee mode");
            break;
        case ARDUINO_EVENT_WIFI_AP_START:
            Serial.println("WiFi access point started");
            break;
        case ARDUINO_EVENT_WIFI_AP_STOP:
            Serial.println("WiFi access point  stopped");
            break;
        case ARDUINO_EVENT_WIFI_AP_STACONNECTED:
            Serial.println("Client connectedWifi");
            break;
        case ARDUINO_EVENT_WIFI_AP_STADISCONNECTED:
            Serial.println("Client disconnected");
            break;
        case ARDUINO_EVENT_WIFI_AP_STAIPASSIGNED:
            Serial.println("Assigned IP address to client");
            break;
        case ARDUINO_EVENT_WIFI_AP_PROBEREQRECVED:
            Serial.println("Received probe request");
            break;
        case ARDUINO_EVENT_WIFI_AP_GOT_IP6:
            Serial.println("AP IPv6 is preferred");
            break;
        case ARDUINO_EVENT_WIFI_STA_GOT_IP6:
            Serial.println("STA IPv6 is preferred");
            break;
        case ARDUINO_EVENT_ETH_GOT_IP6:
            Serial.println("Ethernet IPv6 is preferred");
            break;
        case ARDUINO_EVENT_ETH_START:
            Serial.println("Ethernet started");
            break;
        case ARDUINO_EVENT_ETH_STOP:
            Serial.println("Ethernet stopped");
            break;
        case ARDUINO_EVENT_ETH_CONNECTED:
            Serial.println("Ethernet connectedWifi");
            break;
        case ARDUINO_EVENT_ETH_DISCONNECTED:
            Serial.println("Ethernet disconnected");
            break;
        case ARDUINO_EVENT_ETH_GOT_IP:
            Serial.println("Obtained IP address");
            break;
        default:
            break;
    }
}

void OnConnectWifi() {
    Serial.print("Obtained IP address: ");

    addressESP = WiFi.localIP().toString();
    Serial.println(addressESP);
    // Configure time zone
    timeClient.begin();
    timeClient.forceUpdate();
}

#endif // MPU_SOCKET_SERVER_WIFI_LOCAL_H
