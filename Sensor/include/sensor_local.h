#ifndef SENSOR_SENSOR_LOCAL_H
#define SENSOR_SENSOR_LOCAL_H

#include <config.h>

void ScannerI2C() {
    int nDevices = 0;
    do {
        byte error, address;
        Serial.println("Scanning...");
        for (address = 1; address < 127; address++) {
            Wire.beginTransmission(address);
            error = Wire.endTransmission();
            if (error == 0) {
                Serial.print("I2C device found at address 0x");
                if (address < 16) {
                    Serial.print("0");
                }
                Serial.println(address, HEX);
                nDevices++;
            } else if (error == 4) {
                Serial.print("Unknow error at address 0x");
                if (address < 16) {
                    Serial.print("0");
                }
                Serial.println(address, HEX);
            }
        }
        if (nDevices == 0) {
            Serial.println("No I2C devices found\n");
        } else {
            Serial.println("done\n");
        }
        delay(5000);
    } while (nDevices == 0);
}

void InitIMU() {
    // IMU initialization
    do {
        Wire.begin(SDA_PIN, SCL_PIN);
        delay(2000);
        if (!mpu.setup(ADDRESS_SENSOR)) {
            Serial.println("[SENSOR] - It has not been initialized, Check the connection between the IMU and the ESP32 and restart the device");
            Serial.println(&"[SENSOR] - Status: "[status]);
        } else {
            Serial.println("[SENSOR] - IMU Initialized");
        }
        delay(500);
    } while (!mpu.available());
    //digitalWrite(LED_SENSOR_INITIALIZED, HIGH);
}

void CalibrateIMU() {

    #if defined(ESP_PLATFORM) || defined(ESP32)
        EEPROM.begin(0x80);
    #endif

    Serial.println("[SENSOR] - Accel Gyro calibration will start in 5 seconds");
    Serial.println("[SENSOR] - Please leave the device still on the plan");
    mpu.verbose(true);
    delay(5000);
    //digitalWrite(LED_SENSOR_CALIBRATION_PLAN, HIGH);
    mpu.calibrateAccelGyro();
    //digitalWrite(LED_SENSOR_CALIBRATION_PLAN, LOW);

    Serial.println("[SENSOR] - Magnetic calibration will start in 5 seconds");
    Serial.println("[SENSOR] - Please wave the device in a figure eight until finished");
    delay(5000);;
    //digitalWrite(LED_SENSOR_CALIBRATION_EIGHT, HIGH);
    mpu.calibrateMag();
    //digitalWrite(LED_SENSOR_CALIBRATION_EIGHT, LOW);

    PrintIMUCalibration();
    mpu.verbose(false);

    SaveIMUCalibration();

    LoadIMUCalibration();
}

void SaveIMUCalibration() {
    Serial.println("[SENSOR] - Saving sensor operation in EEPROM");
    saveCalibration();
}

void LoadIMUCalibration() {
    Serial.println("[SENSOR] - Loading sensor calibration into EEPROM");
    loadCalibration();
}

void PrintIMUCalibration() {
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

String ReturnsJSONFromMeasurement(int MeasurementNumber) {
    horaLeitura = timeClient.getFormattedTime();
    // Accelerometer
    double AccelX_mss = mpu.getAccBiasX() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY;
    double AccelY_mss = mpu.getAccBiasY() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY;
    double AccelZ_mss = mpu.getAccBiasZ() * 1000.f / (float) MPU9250::CALIB_ACCEL_SENSITIVITY;
    // Accelerometer Linear
    double AccelX_Lin = mpu.getLinearAccX();
    double AccelY_Lin = mpu.getLinearAccY();
    double AccelZ_Lin = mpu.getLinearAccZ();
    // Gyroscope
    double GyroX_rads = mpu.getGyroBiasX() / (float) MPU9250::CALIB_GYRO_SENSITIVITY;
    double GyroY_rads = mpu.getGyroBiasY() / (float) MPU9250::CALIB_GYRO_SENSITIVITY;
    double GyroZ_rads = mpu.getGyroBiasZ() / (float) MPU9250::CALIB_GYRO_SENSITIVITY;
    // Magnetometer
    double MagX_uT = mpu.getMagBiasX();
    double MagY_uT = mpu.getMagBiasY();
    double MagZ_uT = mpu.getMagBiasZ();
    // Roll, Pitch e Yaw
    double Roll = mpu.getRoll();
    double Pitch = mpu.getPitch();
    double Yaw = mpu.getYaw();

    //-----------------Sensor----------------
    String Leitura = "{\"sensorName\":\"";
    Leitura += nameSensor;
    Leitura += "\",\"numberMensuration\":\"";
    Leitura += MeasurementNumber;
    Leitura += "\",\"hourMensuration\":\"";
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

void StopMeasurement() {
    jsonBufferServer = "";
    cmdActual = 7;
}

void RestartMeasurement() {
    StopMeasurement();
    numberMeasurement = 0;
}

#endif //SENSOR_SENSOR_LOCAL_H
