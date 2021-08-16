#include <WiFi.h>
#include <Wire.h>
#include <MPU9250.h>
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>
#include <NTPClient.h>

                                
// NTP Time Servers
WiFiUDP udp;
NTPClient ntp(udp, "a.st1.ntp.br", -3 * 3600, 60000);
// Roteador - SSID & Password
const char* wifi_ssid      = "ROTador";                         //  Nome da rede de Wi-Fi
const char* wifi_password  = "Zotac460";                        //  Senha de Acesso da Wi-Fi 
// Dados do servidor a ser conectado
const char* websockets_server_host = "192.168.16.104";          // IP do servidor websocket
const int   websockets_server_port = 8080;                      // Porta de conexão do servidor
// Utilizamos o namespace de websocket para podermos utilizar a classe WebsocketsClient
using namespace websockets;
// Objeto websocket client
WebsocketsClient client;
// an MPU9250 object with the MPU-9250 sensor on I2C bus 0 with address 0x68
MPU9250 IMU(Wire,0x68);
int status, numLeitura = 0;
const char* idSensor = "Sensor_1";
String comandoStoS, horaLeitura;
// idSensor, horaSensor, numLeitura, AccelX_mss, AccelY_mss, AccelZ_mss, GyroX_rads, GyroY_rads, GyroZ_rads, MagX_uT, MagY_uT, MagZ_uT

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
  Serial.println("Conexão estabelecida");  
  Serial.print("Endereço IP:\t");
  Serial.println(WiFi.localIP());
  // Tentamos conectar com o websockets server
  bool connected;
  do
  {
    connected = client.connect(websockets_server_host, websockets_server_port, "/socket");
    // Se foi possível conectar
    if(connected) 
    {
      // Exibimos mensagem de sucesso
      Serial.println("Conectou ao Server no Node!");
      // Enviamos uma msg "Hello Server" para o servidor
      client.send("Ola ADM do Servidor!!!");
    } // Se não foi possível conectar
    else 
    {
      // Exibimos mensagem de falha
      Serial.println("Nao Conectamos ao Servidor!");
      delay(500);
    }
  }while(!connected);
  //Inicialização do IMU
  do
  {
    status = IMU.begin();
    if (status < 0) {
      //Serial.println("IMU Não foi inicializada");
      //Serial.println("Confira a ligação da IMU com o ESP32 e reinicie o aparelho");
      //Serial.print("Status: ");
      //Serial.println(status);
    }
    else{
      Serial.println("IMU inicializada");
    }
    delay(500);
  }while(!Serial);

  // setting the accelerometer full scale range to +/-8G 
  IMU.setAccelRange(MPU9250::ACCEL_RANGE_8G);
  // setting the gyroscope full scale range to +/-500 deg/s
  IMU.setGyroRange(MPU9250::GYRO_RANGE_500DPS);
  // setting DLPF bandwidth to 20 Hz
  IMU.setDlpfBandwidth(MPU9250::DLPF_BANDWIDTH_20HZ);
  // setting SRD to 19 for a 50 Hz update rate
  IMU.setSrd(19);

  //Configurar fuso horario
  ntp.begin();               
  ntp.forceUpdate();    

  // Iniciamos o callback onde as mesagens serão recebidas
  client.onMessage([&](WebsocketsMessage message)
  {        
    // Exibimos a mensagem recebida na serial
    //Serial.print("Recebemos uma mensagem do Server: ");   //ENVIAR OU NÃO A LEITURA
    //Serial.println(message.data());

    comandoStoS = message.data();
  });
}

void loop() 
{
  //  De tempo em tempo, o websockets client checa por novas mensagens recebidas
  if(client.available())
  {
    client.poll();
    if(comandoStoS == "ON"){
      IMU.readSensor();
      horaLeitura = ntp.getFormattedTime();
      //------------LEITURA DO SENSOR------------
      String json = "{\"idSensor\":";
      json += idSensor;
      json += ",\"numLeitura\":";
      json += numLeitura;
      json += ",\"horaLeitura\":";
      json += horaLeitura;
      //--------------Acelerometro---------------
      json += ",\"AccelX_mss\":";
      json += IMU.getAccelX_mss();
      json += ",\"AccelY_mss\":";
      json += IMU.getAccelY_mss();
      json += ",\"AccelZ_mss\":";
      json += IMU.getAccelZ_mss();
      //---------------Giroscopio---------------
      json += ",\"GyroX_rads\":";
      json += IMU.getGyroX_rads();
      json += ",\"GyroY_rads\":";
      json += IMU.getGyroY_rads();
      json += ",\"GyroZ_rads\":";
      json += IMU.getGyroZ_rads();
      //--------------Magnetometro--------------
      json += ",\"MagX_uT\":";
      json += IMU.getMagX_uT();
      json += ",\"MagY_uT\":";
      json += IMU.getMagY_uT();
      json += ",\"MagZ_uT\":";
      json += IMU.getMagZ_uT();
      json += "}";

      numLeitura = numLeitura + 1;
      client.send(json.c_str(), json.length());
    }
    else{

    }
  }

  delay(100);
}