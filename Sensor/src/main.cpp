#include <Arduino.h>
#include "config.h"
#include "sensor_local.h"
#include "websocket_local.h"
#include "wifi_local.h"

void setup() {
    Serial.begin(115200);
    //
    InicializarIMU();
    //
    InicializarWiFi();
    //
    CalibrarIMU();
    //
    InicializarServidorWebsocket();
    // Configurar fuso horario
    timeClient.begin();
    timeClient.forceUpdate();
    //
    InicializarClienteWebsocket();
}

void loop() {
    clientsList = serverSocket.accept();
    Serial.println("[SENSOR] - Cliente conectou");
    timeClient.update();
    numeroLeitura = 0;
    ultimoEnvio = 0;
    do {
        if (clientsList.available()) {
            clientsList.poll();
        }
        clientsList.onMessage(onMessageCallback);
        JsonObject obj = doc.as<JsonObject>();

        optRecebidoCliente = obj["cmd"].as<int>();
        Serial.println("[SENSOR] - Evento optRecebidoCliente" + optRecebidoCliente);
        if (optRecebidoCliente != 0) {
            cmdAtual = optRecebidoCliente;
        }
        switch (cmdAtual) {
            case 1:
                Serial.println("[SENSOR] - Leitura");
                MontaEnviaBuffer();
                break;

            case 2:
                Serial.println("[SENSOR] - Pausar");
                break;

            case 3:
                Serial.println("[SENSOR] - Reiniciar");
                ReiniciarMedicao();
                break;

            case 4:
                PararMedicao();
                Serial.println("[SENSOR] - Calibrar Sensor");
                CalibrarIMU();
                break;

            case 5:
                PararMedicao();
                Serial.println("[SENSOR] - Salvar Calibraçao");
                SalvarCalibracaoIMU();
                break;

            case 6:
                PararMedicao();
                Serial.println("[SENSOR] - Resgatar Calibraçao");
                CarregarCalibracaoIMU();
                break;

            default:
                break;
        }

        delay(8);
    } while (clientsList.available());

    Serial.println("[SENSOR] - Nenhum cliente disponivel");
    clientsList.close();

    delay(100);
}