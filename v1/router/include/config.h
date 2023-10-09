#ifndef MPU_SOCKET_SERVER_CONFIG_H
#define MPU_SOCKET_SERVER_CONFIG_H

// OS
#include <cstring>

// Fs
#include "SPIFFS.h"
// WiFi
#include <NTPClient.h>
#include <WiFi.h>
#include <WiFiUdp.h>
// Server
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

#include "ArduinoJson.h"

// Time API
#define NTP_TIME_API "a.st1.ntp.br"
// Server sensor config
#define WEB_PORT 80
#define HTML_FILE "index.html"

// Pin led
#define LED_READY 2

// NTP Time Servers
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_TIME_API, -3 * 3600, 60000);

bool connected = false;

// Filesystem inputs and paths
// -- reference html
const char *input_ssid = "ssid";
const char *input_password = "password";
const char *input_backend = "backend";
const char *input_backendPort = "backendPort";
const char *input_sensorName = "sensorName";

// -- memory in run
String ssid;
String password;
String backend;
String backendPort;
String sensorName;

//
const char *SSID_PATH = "/config/ssid.txt";
const char *PASSWORD_PATH = "/config/password.txt";
const char *BACKEND_PATH = "/config/backend.txt";
const char *BACKEND_PORT_PATH = "/config/backendPort.txt";
const char *SENSOR_NAME_PATH = "/config/sensorName.txt";

// variables
int status;

// output
String addressESP;

// Websocket object to connect to backend and list ip
AsyncWebServer confServer(WEB_PORT);                 // AsyncWebServer                                               //

IPAddress localIP;                  //
IPAddress gateway(192, 168, 1, 1);  //
IPAddress subnet(255, 255, 0, 0);   //

//  File system
void InitFileSystem();                                              //
String ReadFile(fs::FS &fs, const char *path);                      //
void WriteFile(fs::FS &fs, const char *path, const char *message);  //
int getRandom(int lower, int upper, int count);                     //
void PrintFileSystem();                                             //

//  WiFi
void SetWiFi();                      //
void StartWiFi();                    //
void EventsWiFi(WiFiEvent_t event);  //

//  Server
void NotFoundController(AsyncWebServerRequest *request);            //
void SendAppController(AsyncWebServerRequest *request);             //
void ConfigurationStateController(AsyncWebServerRequest *request);  //
void ConfigurationSaveController(AsyncWebServerRequest *request);   //
void SetServer();                                                   //
void InitServer();                                                  //

#endif  // MPU_SOCKET_SERVER_CONFIG_H
