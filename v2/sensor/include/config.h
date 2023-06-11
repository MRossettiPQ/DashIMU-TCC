#ifndef MPU_SOCKET_SERVER_CONFIG_H
#define MPU_SOCKET_SERVER_CONFIG_H

// OS
#include <cstring>
// Sensor
#include <Wire.h>

#include "MPU9250.h"
#include "eeprom_utils.h"
// Filesystem
#include "SPIFFS.h"
// WiFi
#include <NTPClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
// #include <WiFiMulti.h>
#include <WiFiUdp.h>
// Server
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <SocketIOclient.h>
#include <WebSocketsClient.h>
// JSON
#include "ArduinoJson.h"

// Time API
#define NTP_TIME_API "a.st1.ntp.br"
// Sensor address
#define ADDRESS_SENSOR 0x68
#define SDA_PIN 21
#define SCL_PIN 22
// Server sensor config
#define WEB_PORT 80
#define HTML_FILE "index.html"

// Pin led
#define LED_I2C_SCAN 12
#define LED_WIFI_CONNECTED 12
#define LED_WIFI_AP 12
#define LED_SENSOR_INITIALIZED 12
#define LED_SENSOR_CALIBRATION_PLAN 12
#define LED_SENSOR_CALIBRATION_EIGHT 12
#define LED_SERVER_CREATED 12
#define LED_CLIENT_CONNECTED 12
#define LED_READY 2

// Loop
#define BUFFER_LENGTH 100
// Se BUFFER_LENGTH = 320 então TIME_BETWEEN_MEASUREMENT_MILIS = 8ms = 125hz
#define TIME_BETWEEN_MEASUREMENT_MILIS 8
#define OBJECT_SIZE 26
#define MEASUREMENT_SIZE 430    
const size_t capacity = BUFFER_LENGTH * MEASUREMENT_SIZE;

// NTP Time Servers
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_TIME_API, -3 * 3600, 60000);

bool calibrating = false;

// Filesystem inputs and paths
// -- reference html
const char *input_ssid = "ssid";
const char *input_password = "password";
const char *input_sensorFrequency = "sensorFrequency";
const char *input_backend = "backend";
const char *input_backendPort = "backendPort";
const char *input_nameSensor = "sensorName";

// -- memory in run
String ssid;
String password;
String sensorFrequency;
String backend;
String backendPort;
String nameSensor;

// -- path of file memory in data folder
const char *SSID_PATH = "/config/ssid.txt";
const char *SENSOR_FREQUENCY_PATH = "/config/sensorFrequency.txt";
const char *PASSWORD_PATH = "/config/password.txt";
const char *BACKEND_PATH = "/config/backend.txt";
const char *BACKEND_PORT_PATH = "/config/backendPort.txt";
const char *NAME_SENSOR_PATH = "/config/nameSensor.txt";

// Variables
int status;
int numberMeasurement = 0;
int numberSended = 0;
int lastDispatch = 0;
int cmdActual = 0;

// Output
String timeMeasurement = "";
String addressESP = "";

// Sensor connection
MPU9250 mpu;

// AsyncWebServer - Websocket object to connect to backend and list ip
SocketIOclient socketIO;
AsyncWebServer confServer(WEB_PORT);

DynamicJsonDocument measurement(MEASUREMENT_SIZE);
DynamicJsonDocument buffer(capacity);
JsonArray measurements = buffer.to<JsonArray>();

// Configuração de rede
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
String CreateJsonFromMeasurement(int MeasurementNumber);
JsonObject CreateJsonObjectFromMeasurement(int MeasurementNumber);

//  File system
void InitFileSystem();
String ReadFile(fs::FS &fs, const char *path);
void WriteFile(fs::FS &fs, const char *path, const char *message);
int getRandom(int lower, int upper, int count);
void PrintFileSystem();

//  WiFi
void SetWiFi();
void StartWiFi();
String ScanWiFi();
void EventsWiFi(WiFiEvent_t event);

//  Websocket
void SetWebsocketClient();
void SendStatusSensor(String type);
void ConnectBackend();

//  Notification
void InitNotification();

//  Server
void NotFoundController(AsyncWebServerRequest *request);
void SendAppController(AsyncWebServerRequest *request);
void ConfigurationStateController(AsyncWebServerRequest *request);
void ConfigurationSaveController(AsyncWebServerRequest *request);
void GetMeasurementController(AsyncWebServerRequest *request);
void SetServer();
void InitServer();
void RestartServer();

//  Websocket
void onSocketClientEvent(socketIOmessageType_t type, uint8_t *payload, size_t length);
String MountEmptyMessage(String event);
#endif  // MPU_SOCKET_SERVER_CONFIG_H
