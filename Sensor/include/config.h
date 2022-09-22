#ifndef SENSOR_CONFIG_H
#define SENSOR_CONFIG_H

// Sensor address
#define ADDRESS_SENSOR 0x68
// Sensor identity
String nameSensor = "Sensor_1";
// Time API
#define NTP_TIME_API "a.st1.ntp.br"
// Socket Server - generated in esp
#define WEBSOCKET_SERVER_PORT 8080
// Socket backend API
String WEBSOCKET_CLIENT_API = "150.162.235.24";
int WEBSOCKET_CLIENT_PORT = 8000;
// Router - SSID & Password
#define WIFI_SSID "lab120"
#define WIFI_PASSWORD "labredes120"

// Pin led
#define LED_WIFI_CONNECTED 13
#define LED_WIFI_AP 13
#define LED_SENSOR_INITIALIZED 13
#define LED_SENSOR_CALIBRATION_PLAN 13
#define LED_SENSOR_CALIBRATION_EIGHT 13
#define LED_SERVER_CREATED 13
#define LED_CLIENT_CONNECTED 13
#define INPUT_WIFI_MODE 13

#define JSON_CONFIG_FILE "./config/config.json"

// Wi-Fi e Timer
#include <WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
// Session
#include <Wire.h>
#include "MPU9250.h"
#include "eeprom_utils.h"
// WebSocket
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>

// NTP Time Servers
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_TIME_API, -3 * 3600, 60000);
WiFiServer configurationServer(80);

bool connectedWebsocketClient;

bool sensorMode = true;
bool wifiConfigured = false;
int status;
int numberMeasurement = 0;
int lastDispatch;
int cmdActual = 0;
int optReceivedFromCustomer = 0;
int tryConnectWifi = 0;

String horaLeitura;
String jsonReceivedFromCustomer;
String jsonBufferServer;
String addressESP;

DynamicJsonDocument doc(1024);

// Sensor connection
MPU9250 mpu;

// We use the websocket namespace so we can use the WebsocketsClient class
using namespace websockets;
WebsocketsServer serverSocket;                  // Websocket object to create websocket servert
WebsocketsClient clientBackEnd;                 // Websocket object to connect to backend and list ip
WebsocketsClient clientsList;                   // List of websocket server clients

// Sensor
void InitIMU();

void CalibrateIMU();

void PrintIMUCalibration();

void SaveIMUCalibration();

void LoadIMUCalibration();

void MountBufferToSend();

void StopMeasurement();

void RestartMeasurement();

String ReturnsJSONFromMeasurement(int MeasurementNumber);

//  Notification
void InitNotification();

//  Wi-Fi
void InitWiFi();

void ConfigureWiFi();

//  Websocket
void InitWebsocketServer();

void InitWebsocketClient();

void onMessageCallback(WebsocketsMessage message);

void onEventsCallback(WebsocketsEvent event, String data);

#endif //SENSOR_CONFIG_H
