#ifndef MPU_SOCKET_SERVER_CONFIG_H
#define MPU_SOCKET_SERVER_CONFIG_H

// OS
#include <cstring>
// Sensor
#include "eeprom_utils.h"
#include "MPU9250.h"
#include <Wire.h>
// Fs
#include "SPIFFS.h"
// WiFi
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WiFiClientSecure.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
// Server
#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include "ArduinoJson.h"
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

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

// LOOP
#define SEND_DELAY 150                                  // in s, example = 15s,
#define MEASUREMENT_FREQUENCY 120                       // in Hz, MEASUREMENT_FREQUENCY > 0
#define TIME_BETWEEN_MEASUREMENT_MILIS 8                //
#define BUFFER_LENGTH 80                                //

// NTP Time Servers
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_TIME_API, -3 * 3600, 60000);

bool connectedWebsocketClient = false;
bool available = true;
bool calibrating = false;

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
int numberSended = 0;
int lastDispatch = 0;
int cmdActual = 0;
int tryConnectWifi = 0;

// output
String horaLeitura;
String addressESP;
String measurementArray = "";

// Sensor connection
MPU9250 mpu;

// Websocket object to connect to backend and list ip
SocketIOclient socketIO;
AsyncWebServer confServer(WEB_PORT); // AsyncWebServer

IPAddress localIP;                 //
IPAddress gateway(192, 168, 1, 1); //
IPAddress subnet(255, 255, 0, 0);  //

// Sensor
void InitIMU();                                           //
void CalibrateIMU();                                      //
void PrintIMUCalibration();                               //
void SaveIMUCalibration();                                //
void LoadIMUCalibration();                                //
void MountBufferToSend();                                 //
void StopMeasurement();                                   //
void RestartMeasurement();                                //
void ScannerI2C();                                        //
String ReturnsJSONFromMeasurement(int MeasurementNumber); //

//  File system
void InitFileSystem();                                             //
String ReadFile(fs::FS &fs, const char *path);                     //
void WriteFile(fs::FS &fs, const char *path, const char *message); //
int getRandom(int lower, int upper, int count);                    //
void PrintFileSystem();                                            //

//  WiFi
void SetWiFi();                     //
void StartWiFi();                   //
String ScanWiFi();                  //
void EventsWiFi(WiFiEvent_t event); //

//  Websocket
void SetWebsocketClient(); //
void SendStatusSensor();   //
void ConnectBackend();

//  Notification
void InitNotification(); //

//  Server
void NotFoundController(AsyncWebServerRequest *request);           //
void SendAppController(AsyncWebServerRequest *request);            //
void ConfigurationStateController(AsyncWebServerRequest *request); //
void ConfigurationSaveController(AsyncWebServerRequest *request);  //
void GetMeasurementController(AsyncWebServerRequest *request);     //
void SetServer();                                                  //
void InitServer();                                                 //
void RestartServer();                                              //

//  Websocket
void InitWebsocketClient(); //
void onSocketClientEvent(socketIOmessageType_t type, uint8_t *payload, size_t length);
#endif // MPU_SOCKET_SERVER_CONFIG_H
