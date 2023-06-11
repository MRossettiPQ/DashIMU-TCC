#ifndef MPU_SOCKET_SERVER_CORE_SYSTEM_H
#define MPU_SOCKET_SERVER_CORE_SYSTEM_H

#include <config.h>

[[noreturn]] void CoreLoop(void *pvParameter){
    for (;;){
        if (WiFiClass::status() == WL_CONNECTED) {
        }


        vTaskDelay(300 / portTICK_PERIOD_MS);
    }
}

#endif // MPU_SOCKET_SERVER_CORE_SYSTEM_H
