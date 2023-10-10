#ifndef MPU_SOCKET_SERVER_CONFIG_H
#define MPU_SOCKET_SERVER_CONFIG_H

// OS
#include <cstring>
// Sensor
#include <Wire.h>

#include "MPU9250.h"
#include "eeprom_utils.h"
// Fs
#include "SPIFFS.h"
// WiFi
#include <NTPClient.h>
#include <WiFi.h>
#include <WiFiUdp.h>
// Server
#include <ArduinoWebsockets.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

#include "ArduinoJson.h"

// Time API
#define NTP_TIME_API "a.st1.ntp.br"

// Sensor address
#define ADDRESS_SENSOR 0x68
#define SDA_PIN 21
#define SCL_PIN 22

// Server sensor config
#define WEB_PORT 80

// Pin led
#define LED_READY 2

// Filesystem inputs and paths
// Reference for the html
const char *input_ssid = "ssid";
const char *input_password = "password";
const char *input_backend = "backend";
const char *input_backendPort = "backendPort";
const char *input_sensorName = "sensorName";

String ssid;
String password;
String backend;
String backendPort;
String sensorName;

const char *SSID_PATH = "/config/ssid.txt";
const char *PASSWORD_PATH = "/config/password.txt";
const char *BACKEND_PATH = "/config/backend.txt";
const char *BACKEND_PORT_PATH = "/config/backendPort.txt";
const char *SENSOR_NAME_PATH = "/config/sensorName.txt";

// LOOP
#define BUFFER_LENGTH 30

unsigned long last_clean_up = 0;
unsigned long last_wifi_try_connect = 0;
unsigned long last_socket_ping = 0;
unsigned long previous_millis = 0;
const unsigned long delayInterval = 8;
const unsigned long delayCleanupClients = 200;

// NTP Time Servers
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_TIME_API, -3 * 3600, 60000);

bool connectedWebsocketClient = false;
bool serverAvailable = true;
bool clientAvailable = false;
bool connectedWifi = false;
bool calibrating = false;

// Variables
int status;
int numberMeasurement = 0;
int numberOfBuffer = 0;
int lastDispatch = 0;
int cmdActual = 0;

// Output
String addressESP;
String measurements;

// Sensor connection
MPU9250 mpu;

// Websocket object to connect to backend and list ip
// We use the websocket namespace, so we can use the WebsocketsClient class
using namespace websockets;
// Socket client
WebsocketsClient clientBackEnd;
// AsyncWebServer
AsyncWebServer confServer(WEB_PORT);
// Socket of AsyncWebServer
AsyncWebSocket confServerSocket("/socket/session");

IPAddress localIP;                  //
IPAddress gateway(192, 168, 1, 1);  //
IPAddress subnet(255, 255, 0, 0);   //

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

//  File system
void InitFileSystem();
void WriteFile(fs::FS &fs, const char *path, const char *message);
void PrintFileSystem();
String ReadFile(fs::FS &fs, const char *path);
int getRandom(int lower, int upper);

//  WiFi
void SetWiFi();
void StartWiFi();
void EventsWiFi(WiFiEvent_t event);
void OnConnectWifi();

//  Websocket
void SendStatusSensor();
void ConnectBackend();
void onEventsCallback(WebsocketsEvent event, String data);

//  Notification
void InitNotification();

//  Server
void NotFoundController(AsyncWebServerRequest *request);
void SendAppController(AsyncWebServerRequest *request);
void ConfigurationStateController(AsyncWebServerRequest *request);
void ConfigurationSaveController(AsyncWebServerRequest *request);
void GetMeasurementController(AsyncWebServerRequest *request);
void CalibrateController(AsyncWebServerRequest *request);
void SetServer();
void InitServer();
void onWsServerEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len);
void HandleServerMessage(AwsFrameInfo *info, uint8_t *data, size_t len);

#endif  // MPU_SOCKET_SERVER_CONFIG_H
