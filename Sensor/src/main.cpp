#include <Arduino.h>
#include <freertos/FreeRTOS.h>
#include <freertos/task.h>
#include <esp_ipc.h>
// Wi-Fi e Timer
#include <WiFi.h> // for WiFi shield
#include <NTPClient.h>
#include <WiFiUdp.h>
// Sensor
#include <Wire.h>
#include "MPU9250.h"
#include "eeprom_utils.h"
// WebSocket
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>

// NTP Time Servers
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "a.st1.ntp.br", -3 * 3600, 60000);
// Roteador - SSID & Password
const char *wifi_ssid = "Mokinho";      //  Nome da rede de Wi-Fi
const char *wifi_password = "Rian2405"; //  Senha de Acesso da Wi-Fi

// Dados do servidor a ser conectado
const int websockets_server_port = 8080;               // Porta de conexão do servidor

const char *websockets_client_host = "192.168.3.13"; // IP do servidor websocket
const int websockets_client_port = 8000;               // Porta de conexão do servidor

int status, NumeroLeitura = 0, UltimoEnvio, tentativaConectarWifi = 0, cmdAtual = 0;
const char *IdSensor = "Sensor_2";
String HoraLeitura, json, BUFFER;

MPU9250 mpu;

// Utilizamos o namespace de websocket para podermos utilizar a classe WebsocketsClient
using namespace websockets;

WebsocketsServer serverSocket;
WebsocketsClient clientBackEnd;
// Objeto websocket client

String RetornaValoresIMU(int NumeroLeitura);

void print_calibration();

void setup() {
    Serial.begin(115200);

    // Inicialização do IMU
    do {
        Wire.begin();
        if (!mpu.setup(0x68)) {
            Serial.println("IMU Não foi inicializada");
            Serial.println("Confira a ligação da IMU com o ESP32 e reinicie o aparelho");
            Serial.print("Status: ");
            Serial.println(status);
        } else {
            Serial.println("IMU inicializada");
        }
        delay(500);
    } while (!mpu.available());

    WiFi.disconnect(true, true);
    // Inicializa configuração da rede
    WiFi.begin(wifi_ssid, wifi_password);
    // Verifica se a conexão foi estabelecida
    while (WiFi.status() != WL_CONNECTED) {
        tentativaConectarWifi++;
        // Aguarda até a Wi-Fi conectar
        delay(500);
        Serial.print('.');
        if (tentativaConectarWifi == 25) {
            Serial.println("Reiniciando WIFI");
            WiFi.disconnect(true, true);
            tentativaConectarWifi = 0;
            WiFi.begin(wifi_ssid, wifi_password);
        }
    }
    Serial.println('\n');
    Serial.println("Conexão Wi-Fi estabelecida");
    Serial.print("Endereço IP:\t");
    Serial.println(WiFi.localIP());

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

    // Configurar fuso horario
    timeClient.begin();
    timeClient.forceUpdate();

    serverSocket.listen(websockets_server_port);
    Serial.print("Socket server disponivel? ");
    Serial.println(serverSocket.available());
    Serial.print("Endereço IP:\t");

    String enderecoESP = WiFi.localIP().toString();

    Serial.print(enderecoESP);
    Serial.print(":\"");
    Serial.print(websockets_server_port);

    timeClient.begin();
    bool connected = clientBackEnd.connect(websockets_client_host, websockets_client_port, "/socket");

    if (connected) {
        Serial.println("Connected!");
        clientBackEnd.send(enderecoESP);
    } else {
        Serial.println("Not Connected!");
    }

    // run callback when messages are received
    clientBackEnd.onMessage([&](WebsocketsMessage message) {
        Serial.print("Got Message: ");
        Serial.println(message.data());
    });
}

void LoopOnProCpu(void *arg) {
    (void) arg;
    Serial.print("This loop runs on PRO_CPU which id is:");
    Serial.println(xPortGetCoreID());
    Serial.println();
    Serial.println();
}

void loop() {
    //Execute LoopOnAppCpu on PRO_CPU
    //esp_ipc_call(PRO_CPU_NUM, LoopOnProCpu, NULL);
    WebsocketsClient clientsList = serverSocket.accept();
    Serial.println("\n CLIENTE CONECTOU");
    timeClient.update();
    NumeroLeitura = 0;
    UltimoEnvio = 0;
    do {
        DynamicJsonDocument doc(1024);
        clientsList.onMessage([&](WebsocketsMessage message) {
            deserializeJson(doc, message.data());
            Serial.println(message.data());
        });
        JsonObject obj = doc.as<JsonObject>();

        int opt = obj["cmd"].as<int>();
        if (opt != 0) {
            cmdAtual = opt;
        }
        switch (cmdAtual) {
            case 1:
                Serial.println("OPÇÃO:" + opt);
                Serial.println("ATUAL:" + cmdAtual);
                Serial.println("\n ENVIAR LEITURA");
                BUFFER += RetornaValoresIMU(NumeroLeitura);

                //Buffer de 320 leituras
                if (NumeroLeitura == (UltimoEnvio + 40)) {
                    // clientsList.send(BUFFER);
                    clientsList.send("[" + BUFFER + "]");
                    UltimoEnvio = NumeroLeitura;
                    BUFFER = "";
                } else {
                    BUFFER += ",";
                }

                NumeroLeitura = NumeroLeitura + 1;
                break;

            case 2:
                Serial.println("\n OPCAO 2");
                /* code */
                break;

            default:
                if(mpu.update()){
                    Serial.println("\n ENVIAR LEITURA");
                    BUFFER += RetornaValoresIMU(NumeroLeitura);

                    //Buffer de 320 leituras
                    if (NumeroLeitura == (UltimoEnvio + 40)) {
                        // clientsList.send(BUFFER);
                        clientsList.send("[" + BUFFER + "]");
                        UltimoEnvio = NumeroLeitura;
                        BUFFER = "";
                    } else {
                        BUFFER += ",";
                    }

                    NumeroLeitura = NumeroLeitura + 1;
                }
                break;
        }

        if (clientBackEnd.available()) {
            clientBackEnd.poll();
        }

        delay(8);
    } while (clientsList.available());

    Serial.println("\n NENHUM CLIENTE DISPONIVEL");
    clientsList.close();

    delay(100);
}

String RetornaValoresIMU(int NumeroLeitura) {
    HoraLeitura = timeClient.getFormattedTime();
    // Acelerometro
    double AccelX_mss = mpu.getAccBiasX() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY;
    double AccelY_mss = mpu.getAccBiasY() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY;
    double AccelZ_mss = mpu.getAccBiasZ() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY;
    // Aceleração Linear
    double AccelX_Lin = mpu.getLinearAccX();
    double AccelY_Lin = mpu.getLinearAccY();
    double AccelZ_Lin = mpu.getLinearAccZ();
    // Giroscopio
    double GyroX_rads = mpu.getGyroBiasX() / (float) MPU9250::CALIB_GYRO_SENSITIVITY;
    double GyroY_rads = mpu.getGyroBiasY() / (float) MPU9250::CALIB_GYRO_SENSITIVITY;
    double GyroZ_rads = mpu.getGyroBiasZ() / (float) MPU9250::CALIB_GYRO_SENSITIVITY;
    // Magnetometro
    double MagX_uT = mpu.getMagBiasX();
    double MagY_uT = mpu.getMagBiasY();
    double MagZ_uT = mpu.getMagBiasZ();
    // Roll, Pitch e Yaw
    double Roll = mpu.getRoll();
    double Pitch = mpu.getPitch();
    double Yaw = mpu.getYaw();

    //double veloX = mpu.ge();
    //double veloY = mpu.getYaw();
    //double veloZ = mpu.getYaw();

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

void print_calibration() {
    Serial.println("< calibration parameters >");
    Serial.println("accel bias [g]: ");
    Serial.print(mpu.getAccBiasX() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY);
    Serial.print("\", ");
    Serial.print(mpu.getAccBiasY() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY);
    Serial.print("\", ");
    Serial.print(mpu.getAccBiasZ() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY);
    Serial.println();
    Serial.println("gyro bias [deg/s]: ");
    Serial.print(mpu.getGyroBiasX() / (float) MPU9250::CALIB_GYRO_SENSITIVITY);
    Serial.print("\", ");
    Serial.print(mpu.getGyroBiasY() / (float) MPU9250::CALIB_GYRO_SENSITIVITY);
    Serial.print("\", ");
    Serial.print(mpu.getGyroBiasZ() / (float) MPU9250::CALIB_GYRO_SENSITIVITY);
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