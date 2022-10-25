#ifndef SENSOR_CONFIG_H
#define SENSOR_CONFIG_H

// Time API
#define NTP_TIME_API "a.st1.ntp.br"
// Sensor address
#define ADDRESS_SENSOR 0x68
#define SDA_PIN 21
#define SCL_PIN 22
// Server sensor config
#define WEB_PORT 80
// Socket Server - generated in esp
#define WEBSOCKET_SERVER_PORT 8080

// Pin led
#define LED_I2C_SCAN 12
#define LED_WIFI_CONNECTED 12
#define LED_WIFI_AP 12
#define LED_SENSOR_INITIALIZED 12
#define LED_SENSOR_CALIBRATION_PLAN 12
#define LED_SENSOR_CALIBRATION_EIGHT 12
#define LED_SERVER_CREATED 12
#define LED_CLIENT_CONNECTED 12

// imports and dependency
#include "eeprom_utils.h"
#include "SPIFFS.h"
#include <WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <Wire.h>
#include "MPU9250.h"
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

// NTP Time Servers
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_TIME_API, -3 * 3600, 60000);

bool connectedWebsocketClient;
bool connectedWiFi = false;

// Filesystem inputs and paths
// -- reference html
const char *input_ssid = "ssid";
const char *input_password = "password";
const char *input_sensorFrequency = "sensorFrequency";
const char *input_backend = "backend";
const char *input_backendPort = "backendPort";
const char *input_nameSensor = "nameSensor";

// -- memory in run
String ssid;
String password;
String sensorFrequency;
String backend;
String backendPort;
String nameSensor;

//
const char *SSID_PATH = "/config/ssid.txt";
const char *SENSOR_FREQUENCY_PATH = "/config/sensorFrequency.txt";
const char *PASSWORD_PATH = "/config/password.txt";
const char *BACKEND_PATH = "/config/backend.txt";
const char *BACKEND_PORT_PATH = "/config/backendPort.txt";
const char *NAME_SENSOR_PATH = "/config/nameSensor.txt";

// variables
int status;
int numberMeasurement = 0;
int lastDispatch;
int cmdActual = 0;
int optReceivedFromCustomer = 0;
int tryConnectWifi = 0;

// output
String horaLeitura;
String jsonReceivedFromClient;
String jsonBufferServer;
String addressESP;

DynamicJsonDocument doc(1024);

// Sensor connection
MPU9250 mpu;

// We use the websocket namespace, so we can use the WebsocketsClient class
using namespace websockets;
WebsocketsServer serverSocket;                  // Websocket object to create websocket servert
WebsocketsClient clientBackEnd;                 // Websocket object to connect to backend and list ip
WebsocketsClient clientsList;                   // List of websocket server clients
AsyncWebServer configurationServer(WEB_PORT);

IPAddress localIP;
IPAddress gateway(192, 168, 1, 1);
IPAddress subnet(255, 255, 0, 0);

// Sensor
void InitIMU();

void CalibrateIMU();

void PrintIMUCalibration();

void SaveIMUCalibration();

void LoadIMUCalibration();

void MountBufferToSend();

void StopMeasurement();

void RestartMeasurement();

void ScannerI2C();

String ReturnsJSONFromMeasurement(int MeasurementNumber);

//  Notification
void InitNotification();

//  Wi-Fi
bool InitWiFi();

//  Websocket
void InitWebsocketServer();

void InitWebsocketClient();

void onMessageCallback(const WebsocketsMessage& message);

void onEventsCallback(WebsocketsEvent event, String data);

//  File system
void InitFileSystem();

String ReadFile(fs::FS &fs, const char *path);

void WriteFile(fs::FS &fs, const char *path, const char *message);

String Processor(const String &var);

#endif //SENSOR_CONFIG_H
