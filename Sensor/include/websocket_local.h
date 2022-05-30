#ifndef SENSOR_WEBSOCKET_LOCAL_H
#define SENSOR_WEBSOCKET_LOCAL_H

#include <config.h>

void InicializarClienteWebsocket() {
    do {
        Serial.println("[SENSOR] - Iniciando o cliente Websocket");
        conectadoWebsocketCliente = clientBackEnd.connect(WEBSOCKET_SERVER_API_PORT, WEBSOCKET_CLIENT_PORT, "/socket");
        if (conectadoWebsocketCliente) {
            Serial.println("[SENSOR] - Conectado com o servidor!");
            clientBackEnd.send(enderecoESP);
        } else {
            Serial.println("[SENSOR] - Não conectado com o servidor!");
        }
    } while (!conectadoWebsocketCliente);

    // Callback when messages are received
    clientBackEnd.onMessage([&](WebsocketsMessage message) {
        Serial.print("Got Message: ");
        Serial.println(message.data());
    });
}

void InicializarServidorWebsocket() {
    Serial.println("[SENSOR] - Iniciando o servidor Websocket");
    do {
        serverSocket.listen(WEBSOCKET_SERVER_PORT);
        Serial.println("[SENSOR] - Socket server disponivel? " + serverSocket.available());
    } while (!serverSocket.available());

    enderecoESP = WiFi.localIP().toString();
    Serial.print("[SENSOR] - Endereço IP:\t" + enderecoESP + ":" + WEBSOCKET_SERVER_PORT);
}

void MontaEnviaBuffer() {
    Serial.println("[SENSOR] - Montar buffer de leituras");
    if(mpu.update()){
        Serial.println("[SENSOR] - Comando recebido:" + optRecebidoCliente);
        Serial.println("[SENSOR] - Comando em vigor:" + cmdAtual);
        jsonBufferServer += RetornaValoresIMU(numeroLeitura);

        // Buffer de 320 leituras
        if (numeroLeitura == (ultimoEnvio + 40)) {
            clientsList.send("[" + jsonBufferServer + "]");
            ultimoEnvio = numeroLeitura;
            jsonBufferServer = "";
        } else {
            // Para novo elemento no array
            jsonBufferServer += ",";
        }

        numeroLeitura = numeroLeitura + 1;
    }
}

#endif //SENSOR_WEBSOCKET_LOCAL_H
