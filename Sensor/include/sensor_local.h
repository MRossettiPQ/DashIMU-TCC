#ifndef SENSOR_SENSOR_LOCAL_H
#define SENSOR_SENSOR_LOCAL_H

#include <config.h>

void InicializarIMU() {
    // Inicialização do IMU
    do {
        Wire.begin();
        if (!mpu.setup(ADDR_SENSOR)) {
            Serial.println("[SENSOR] - Não foi inicializada, Confira a ligação da IMU com o ESP32 e reinicie o aparelho");
            Serial.println("[SENSOR] - Status: " + status);
        } else {
            Serial.println("[SENSOR] - IMU Inicializada");
        }
        delay(500);
    } while (!mpu.available());
}

void CalibrarIMU() {

    #if defined(ESP_PLATFORM) || defined(ESP32)
        EEPROM.begin(0x80);
    #endif

    Serial.println("[SENSOR] - A calibração do Accel Gyro começará em 5 segundos");
    Serial.println("[SENSOR] - Por favor, deixe o dispositivo ainda no plano");
    mpu.verbose(true);
    delay(5000);
    mpu.calibrateAccelGyro();

    Serial.println("[SENSOR] - A calibração magnética começará em 5 segundos");
    Serial.println("[SENSOR] - Por favor, acene o dispositivo em uma figura oito até terminar");
    delay(5000);
    mpu.calibrateMag();

    ImprimirCalibracaoIMU();
    mpu.verbose(false);

    SalvarCalibracaoIMU();

    CarregarCalibracaoIMU();
}

void SalvarCalibracaoIMU() {
    Serial.println("[SENSOR] - Salvando calibração do sensor na EEPROM");
    saveCalibration();
}

void CarregarCalibracaoIMU() {
    Serial.println("[SENSOR] - Carregando calibração do sensor na EEPROM");
    loadCalibration();
}

void ImprimirCalibracaoIMU() {
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

String RetornaValoresIMU(int NumeroLeitura) {
    horaLeitura = timeClient.getFormattedTime();
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

    //------------LEITURA DO SENSOR-----------
    String Leitura = "{\"idSensor\":\"";
    Leitura += ID_SENSOR;
    Leitura += "\",\"numLeitura\":\"";
    Leitura += NumeroLeitura;
    Leitura += "\",\"horaLeitura\":\"";
    Leitura += horaLeitura;
    //--------------Acelerometro--------------
    Leitura += "\",\"AccelX_mss\":\"";
    Leitura += AccelX_mss;
    Leitura += "\",\"AccelY_mss\":\"";
    Leitura += AccelY_mss;
    Leitura += "\",\"AccelZ_mss\":\"";
    Leitura += AccelZ_mss;
    //--------------Acel. Liner---------------
    Leitura += "\",\"Acc_X\":\"";
    Leitura += AccelX_Lin;
    Leitura += "\",\"Acc_Y\":\"";
    Leitura += AccelY_Lin;
    Leitura += "\",\"Acc_Z\":\"";
    Leitura += AccelZ_Lin;
    //---------------Giroscopio---------------
    Leitura += "\",\"Gyr_X\":\"";
    Leitura += GyroX_rads;
    Leitura += "\",\"Gyr_Y\":\"";
    Leitura += GyroY_rads;
    Leitura += "\",\"Gyr_Z\":\"";
    Leitura += GyroZ_rads;
    //--------------Magnetometro--------------
    Leitura += "\",\"Mag_X\":\"";
    Leitura += MagX_uT;
    Leitura += "\",\"Mag_Y\":\"";
    Leitura += MagY_uT;
    Leitura += "\",\"Mag_Z\":\"";
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

void PararMedicao(){
    jsonBufferServer = "";
    numeroLeitura = 0;
}

void ReiniciarMedicao(){
    PararMedicao();
    cmdAtual = 1;
}

#endif //SENSOR_SENSOR_LOCAL_H
