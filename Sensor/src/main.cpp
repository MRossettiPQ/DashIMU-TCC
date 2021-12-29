#include <Arduino.h>
//Wi-Fi e Timer
#include <WiFi.h> // for WiFi shield
#include <NTPClient.h>
#include <WiFiUdp.h>
//Sensor
#include <Wire.h>
#include "MPU9250.h"
#include "eeprom_utils.h"
//WebSocket
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>

// NTP Time Servers
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "a.st1.ntp.br", -3 * 3600, 60000);
// Roteador - SSID & Password
const char *wifi_ssid = "ROTador";      //  Nome da rede de Wi-Fi
const char *wifi_password = "Zotac460"; //  Senha de Acesso da Wi-Fi

// Dados do servidor a ser conectado
const char *websockets_server_host = "192.168.16.104"; // IP do servidor websocket
const int websockets_server_port = 8080;               // Porta de conexão do servidor

//Socket server
const int socket_server = 8080;

int status, NumeroLeitura = 0, UltimoEnvio;
const char *IdSensor = "Sensor_1";
String ComandoRecebido, HoraLeitura, json, BUFFER;

MPU9250 mpu;

// Utilizamos o namespace de websocket para podermos utilizar a classe WebsocketsClient
using namespace websockets;

WebsocketsServer serverSocket;
WebsocketsClient clientsList;
WebsocketsClient clientBackEnd;
WebsocketsMessage msg;
// Objeto websocket client

String RetornaValoresIMU(int NumeroLeitura);
void print_calibration();

void setup()
{
  Serial.begin(115200);
  // Inicializa configuração da rede
  WiFi.begin(wifi_ssid, wifi_password);
  // Verifica se a conexão foi estabelecida
  while (WiFi.status() != WL_CONNECTED)
  {
    // Aguarda até a Wi-Fi conectar
    delay(500);
    Serial.print('.');
  }
  Serial.println('\n');
  Serial.println("Conexão Wi-Fi estabelecida");
  Serial.print("Endereço IP:\t");
  Serial.println(WiFi.localIP());

  //Inicialização do IMU
  do
  {
    Wire.begin();
    if (!mpu.setup(0x68))
    {
      Serial.println("IMU Não foi inicializada");
      Serial.println("Confira a ligação da IMU com o ESP32 e reinicie o aparelho");
      Serial.print("Status: ");
      Serial.println(status);
    }
    else
    {
      Serial.println("IMU inicializada");
    }
    delay(500);
  } while (!mpu.available());

#if defined(ESP_PLATFORM) || defined(ESP32)
  EEPROM.begin(0x80);
#endif

  delay(5000);

  // calibrate anytime you want to
  Serial.println("Accel Gyro calibration will start in 5sec.");
  Serial.println("Please leave the device still on the flat plane.");
  mpu.verbose(true);
  delay(5000);
  mpu.calibrateAccelGyro();

  Serial.println("Mag calibration will start in 5sec.");
  Serial.println("Please Wave device in a figure eight until done.");
  delay(5000);
  mpu.calibrateMag();

  print_calibration();
  mpu.verbose(false);

  // save to eeprom
  saveCalibration();

  // load from eeprom
  loadCalibration();

  //Configurar fuso horario
  timeClient.begin();
  timeClient.forceUpdate();

  serverSocket.listen(socket_server);
  Serial.print("Socket server disponivel? ");
  Serial.println(serverSocket.available());
  Serial.print("Endereço IP:\t");
  Serial.print(WiFi.localIP());
  Serial.print(":\"");
  Serial.print(socket_server);

  timeClient.begin();
}

void loop()
{
  timeClient.update();
  clientsList = serverSocket.accept();
  NumeroLeitura = 0;
  UltimoEnvio = 0;
  Serial.println("\n CLIENTE CONECTOU");
  do
  {
    // clientsList.onMessage([&](WebsocketsMessage message)
    //                       {
    //                         Serial.print("Recebi uma mensage do cliente ->");
    //                         Serial.println(message);
    //                       });

    BUFFER += RetornaValoresIMU(NumeroLeitura);

    if (NumeroLeitura == (UltimoEnvio + 13))
    {
      clientsList.send(BUFFER);
      // clientsList.send("[" + BUFFER + "]");
      UltimoEnvio = NumeroLeitura;
      BUFFER = "";
    }
    else
    {
      BUFFER += ",";
    }

    NumeroLeitura = NumeroLeitura + 1;

    delay(8);
  } while (clientsList.available());

  clientsList.close();

  delay(100);
}

String RetornaValoresIMU(int NumeroLeitura)
{

  HoraLeitura = timeClient.getFormattedTime();
  //Acelerometro
  double AccelX_mss = mpu.getAccBiasX() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
  double AccelY_mss = mpu.getAccBiasY() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
  double AccelZ_mss = mpu.getAccBiasZ() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
  //Aceleração Linear
  double AccelX_Lin = mpu.getLinearAccX();
  double AccelY_Lin = mpu.getLinearAccY();
  double AccelZ_Lin = mpu.getLinearAccZ();
  //Giroscopio
  double GyroX_rads = mpu.getGyroBiasX() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
  double GyroY_rads = mpu.getGyroBiasY() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
  double GyroZ_rads = mpu.getGyroBiasZ() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
  //Magnetometro
  double MagX_uT = mpu.getMagBiasX();
  double MagY_uT = mpu.getMagBiasY();
  double MagZ_uT = mpu.getMagBiasZ();
  //Roll, Pitch e Yaw
  double Roll = mpu.getRoll();
  double Pitch = mpu.getPitch();
  double Yaw = mpu.getYaw();

  //------------LEITURA DO SENSOR-----------

  String Leitura = "{\"idSensor\":\"";
  Leitura += IdSensor;
  Leitura += "\",\"numLeitura\":\"";
  Leitura += NumeroLeitura;
  Leitura += "\",\"horaLeitura\":\"";
  Leitura += HoraLeitura;
  //--------------Acelerometro--------------
  Leitura += "\",\"AccelX_mss\":\"";
  Leitura += AccelX_mss;
  Leitura += "\",\"AccelY_mss\":\"";
  Leitura += AccelY_mss;
  Leitura += "\",\"AccelZ_mss\":\"";
  Leitura += AccelZ_mss;
  //--------------Acel. Liner---------------
  Leitura += "\",\"AccelX_Lin\":\"";
  Leitura += AccelX_Lin;
  Leitura += "\",\"AccelY_Lin\":\"";
  Leitura += AccelY_Lin;
  Leitura += "\",\"AccelZ_Lin\":\"";
  Leitura += AccelZ_Lin;
  //---------------Giroscopio---------------
  Leitura += "\",\"GyroX_rads\":\"";
  Leitura += GyroX_rads;
  Leitura += "\",\"GyroY_rads\":\"";
  Leitura += GyroY_rads;
  Leitura += "\",\"GyroZ_rads\":\"";
  Leitura += GyroZ_rads;
  //--------------Magnetometro--------------
  Leitura += "\",\"MagX_uT\":\"";
  Leitura += MagX_uT;
  Leitura += "\",\"MagY_uT\":\"";
  Leitura += MagY_uT;
  Leitura += "\",\"MagZ_uT\":\"";
  Leitura += MagZ_uT;
  //----------Roll, Pitch e Yaw-------------
  Leitura += "\",\"Roll\":\"";
  Leitura += Roll;
  Leitura += "\",\"Pitch\":\"";
  Leitura += Pitch;
  Leitura += "\",\"Yaw\":\"";
  Leitura += Yaw;
  Leitura += "\"}";

  return Leitura;
}

void print_calibration()
{
  Serial.println("< calibration parameters >");
  Serial.println("accel bias [g]: ");
  Serial.print(mpu.getAccBiasX() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY);
  Serial.print("\", ");
  Serial.print(mpu.getAccBiasY() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY);
  Serial.print("\", ");
  Serial.print(mpu.getAccBiasZ() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY);
  Serial.println();
  Serial.println("gyro bias [deg/s]: ");
  Serial.print(mpu.getGyroBiasX() / (float)MPU9250::CALIB_GYRO_SENSITIVITY);
  Serial.print("\", ");
  Serial.print(mpu.getGyroBiasY() / (float)MPU9250::CALIB_GYRO_SENSITIVITY);
  Serial.print("\", ");
  Serial.print(mpu.getGyroBiasZ() / (float)MPU9250::CALIB_GYRO_SENSITIVITY);
  Serial.println();
  Serial.println("mag bias [mG]: ");
  Serial.print(mpu.getMagBiasX());
  Serial.print("\", ");
  Serial.print(mpu.getMagBiasY());
  Serial.print("\", ");
  Serial.print(mpu.getMagBiasZ());
  Serial.println();
  Serial.println("mag scale []: ");
  Serial.print(mpu.getMagScaleX());
  Serial.print("\", ");
  Serial.print(mpu.getMagScaleY());
  Serial.print("\", ");
  Serial.print(mpu.getMagScaleZ());
  Serial.println();
}