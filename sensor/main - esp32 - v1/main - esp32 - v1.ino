#include <WiFi.h>
#include <Wire.h>
#include <MPU9250.h>
#include <ArduinoWebsockets.h>

                                
// Roteador - SSID & Password
const char* wifi_ssid      = "ROTador";                         //  Nome da rede de Wi-Fi
const char* wifi_password  = "Zotac460";                        //  Senha de Acesso da Wi-Fi 
// Dados do servidor a ser conectado
const char* websockets_server_host = "192.168.16.113";          // IP do servidor websocket
const int   websockets_server_port = 3000;                      // Porta de conexão do servidor
// Utilizamos o namespace de websocket para podermos utilizar a classe WebsocketsClient
using namespace websockets;
// Objeto websocket client
WebsocketsClient client;
// an MPU9250 object with the MPU-9250 sensor on I2C bus 0 with address 0x68
MPU9250 IMU(Wire,0x68);
int status;

void setup() 
{
  // 
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

  // Iniciamos o callback onde as mesagens serão recebidas
  client.onMessage([&](WebsocketsMessage message)
  {        
    // Exibimos a mensagem recebida na serial
    Serial.print("Got Message: ");
    Serial.println(message.data());

    // Ligamos/Desligamos o led de acordo com o comando
    if(message.data().equalsIgnoreCase("ON"))
    {
      //digitalWrite(led, HIGH);
    }
    else
    {
      if(message.data().equalsIgnoreCase("OFF"))
      {
        //digitalWrite(led, LOW);
      }  
    }
  });
  /*
  while(!Serial) {}
  // start communication with IMU 
  status = IMU.begin();
  if (status < 0) {
    Serial.println("IMU initialization unsuccessful");
    Serial.println("Check IMU wiring or try cycling power");
    Serial.print("Status: ");
    Serial.println(status);
    while(1) {}
  }
  // setting the accelerometer full scale range to +/-8G 
  IMU.setAccelRange(MPU9250::ACCEL_RANGE_8G);
  // setting the gyroscope full scale range to +/-500 deg/s
  IMU.setGyroRange(MPU9250::GYRO_RANGE_500DPS);
  // setting DLPF bandwidth to 20 Hz
  IMU.setDlpfBandwidth(MPU9250::DLPF_BANDWIDTH_20HZ);
  // setting SRD to 19 for a 50 Hz update rate
  IMU.setSrd(19);
  */
}

void loop() 
{
  //  De tempo em tempo, o websockets client checa por novas mensagens recebidas
  if(client.available())
  {
    client.poll();
  } 
        
  delay(300);
  /*
  if()
  {
    // read the sensor
    
    IMU.readSensor();

    Serial.print("\n------------LEITURA DO SENSOR------------");
    Serial.print("\n--------------Acelerometro---------------\n");
    Serial.print(IMU.getAccelX_mss(),6);
    Serial.print("\t");
    Serial.print(IMU.getAccelY_mss(),6);
    Serial.print("\t");
    Serial.print(IMU.getAccelZ_mss(),6);
    
    Serial.print("\n---------------Giroscopio---------------\n");
    Serial.print(IMU.getGyroX_rads(),6);
    Serial.print("\t");
    Serial.print(IMU.getGyroY_rads(),6);
    Serial.print("\t");
    Serial.print(IMU.getGyroZ_rads(),6);
    

    Serial.print("\n--------------Magnetometro--------------\n");
    Serial.print(IMU.getMagX_uT(),6);
    Serial.print("\t");
    Serial.print(IMU.getMagY_uT(),6);
    Serial.print("\t");
    Serial.print(IMU.getMagZ_uT(),6);

    Serial.print("\n--------------Temperatura--------------\n");
    Serial.print(IMU.getTemperature_C(),6);
    delay(10);
  }
  */
}