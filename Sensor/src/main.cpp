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
        DynamicJsonDocument doc(1024);
        clientsList.onMessage([&](WebsocketsMessage message) {
            deserializeJson(doc, message.data());
            Serial.println("[SENSOR] - Evento onMessage");
            Serial.println(message.data());
        });
        JsonObject obj = doc.as<JsonObject>();

        optRecebidoCliente = obj["cmd"].as<int>();
        Serial.println("[SENSOR] - Evento optRecebidoCliente" + optRecebidoCliente);
        if (optRecebidoCliente != 0) {
            cmdAtual = optRecebidoCliente;
        }
        switch (cmdAtual) {
            case 1:
                MontaEnviaBuffer();
                break;

            case 2:
                Serial.println("\n OPCAO 2");
                /* code */
                break;

            default:
                MontaEnviaBuffer();
                break;
        }

        if (clientBackEnd.available()) {
            clientBackEnd.poll();
        }

        delay(8);
    } while (clientsList.available());

    Serial.println("[SENSOR] - Nenhum cliente disponivel");
    clientsList.close();

    delay(100);
}