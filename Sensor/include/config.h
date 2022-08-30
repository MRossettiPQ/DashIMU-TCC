#ifndef SENSOR_CONFIG_H
#define SENSOR_CONFIG_H

// Identidade Session
#define ID_SENSOR "Sensor_1"
#define ADDR_SENSOR 0x68
// Time API
#define NTP_TIME_API "a.st1.ntp.br"
// Socket Server
#define WEBSOCKET_SERVER_PORT 8080
// Socket API
#define WEBSOCKET_SERVER_API_PORT "192.168.16.113"
#define WEBSOCKET_CLIENT_PORT 8000
// Roteador - SSID & Password
#define WIFI_SSID "ROTador"
#define WIFI_PASSWORD "Zotac460"

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

bool conectadoWebsocketCliente;

int status;
int numeroLeitura = 0;
int ultimoEnvio;
int cmdAtual = 0;
int optRecebidoCliente = 0;
int tentativaConectarWifi = 0;

String horaLeitura;
String jsonRecebidoCliente;
String jsonBufferServer;
String enderecoESP;

DynamicJsonDocument doc(1024);

// Para conexão com sensor
MPU9250 mpu;

// Utilizamos o namespace de websocket para podermos utilizar a classe WebsocketsClient
using namespace websockets;
WebsocketsServer serverSocket;                  // Objeto websocket para criar servidor websocket
WebsocketsClient clientBackEnd;                 // Objeto websocket para conectar ao backend e listar ip
WebsocketsClient clientsList;                   // Lista de clientes do servidor websocket

//
void InicializarIMU();
void CalibrarIMU();
void ImprimirCalibracaoIMU();
void SalvarCalibracaoIMU();
void CarregarCalibracaoIMU();
void MontaEnviaBuffer();
void PararMedicao();
void ReiniciarMedicao();
String RetornaValoresIMU(int NumeroLeitura);
//
void InicializarWiFi();
//
void InicializarServidorWebsocket();
void InicializarClienteWebsocket();
void onMessageCallback(WebsocketsMessage message);
void onEventsCallback(WebsocketsEvent event, String data);

#endif //SENSOR_CONFIG_H
