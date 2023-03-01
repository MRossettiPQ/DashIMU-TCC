#ifndef MPU_SOCKET_SERVER_MPU_SENSOR_H
#define MPU_SOCKET_SERVER_MPU_SENSOR_H

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
        Wire.setClock(400000);
        // delay(50);
        vTaskDelay(50 / portTICK_PERIOD_MS);

        MPU9250Setting setting;
        setting.accel_fs_sel = ACCEL_FS_SEL::A16G;
        setting.gyro_fs_sel = GYRO_FS_SEL::G2000DPS;
        setting.mag_output_bits = MAG_OUTPUT_BITS::M16BITS;
        setting.fifo_sample_rate = FIFO_SAMPLE_RATE::SMPL_1000HZ;
        setting.gyro_fchoice = 0x03;
        setting.gyro_dlpf_cfg = GYRO_DLPF_CFG::DLPF_184HZ;
        setting.accel_fchoice = 0x01;
        setting.accel_dlpf_cfg = ACCEL_DLPF_CFG::DLPF_218HZ_0;
        mpu.selectFilter(QuatFilterSel::MAHONY);
        //mpu.setFilterIterations(10);

        if (!mpu.setup(ADDRESS_SENSOR, setting)) {
            Serial.println("[SENSOR] - It has not been initialized, Check the connection between the IMU and the ESP32 and restart the device");
            Serial.println(&"[SENSOR] - Status: "[status]);
        } else {
            Serial.println("[SENSOR] - IMU Initialized");
        }
        // delay(500);
        vTaskDelay(500 / portTICK_PERIOD_MS);
    } while (!mpu.available());
}

void CalibrateIMU() {
    #if defined(ESP_PLATFORM) || defined(ESP32)
        EEPROM.begin(0x80);
    #endif
    calibrating = true;
    setupEEPROM();

    Serial.println("[SENSOR] - Accel Gyro calibration will start in 5 seconds");
    Serial.println("[SENSOR] - Please leave the device still on the plan");
    mpu.verbose(true);

    // delay(5000);
    vTaskDelay(5000 / portTICK_PERIOD_MS);
    //digitalWrite(LED_SENSOR_CALIBRATION_PLAN, HIGH);
    mpu.calibrateAccelGyro();
    //digitalWrite(LED_SENSOR_CALIBRATION_PLAN, LOW);

    Serial.println("[SENSOR] - Magnetic calibration will start in 5 seconds");
    Serial.println("[SENSOR] - Please wave the device in a figure eight until finished");
    // delay(5000);
    vTaskDelay(5000 / portTICK_PERIOD_MS);
    //digitalWrite(LED_SENSOR_CALIBRATION_EIGHT, HIGH);
    mpu.calibrateMag();

    //digitalWrite(LED_SENSOR_CALIBRATION_EIGHT, LOW);

    PrintIMUCalibration();
    mpu.verbose(false);

    SaveIMUCalibration();

    LoadIMUCalibration();
    calibrating = false;
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
    // EulerX, EulerY e EulerZ
    double Euler_X = mpu.getEulerX();
    double Euler_Y = mpu.getEulerY();
    double Euler_Z = mpu.getEulerZ();
    // EulerX, EulerY e EulerZ
    double Quaternion_X = mpu.getQuaternionX();
    double Quaternion_Y = mpu.getQuaternionY();
    double Quaternion_Z = mpu.getQuaternionZ();
    double Quaternion_W = mpu.getQuaternionW();

    //-----------------Sensor----------------
    String Leitura = R"({"sensorName":")";
    Leitura += nameSensor;
    Leitura += R"(","numberMensuration":")";
    Leitura += MeasurementNumber;
    Leitura += R"(","hourMensuration":")";
    Leitura += horaLeitura;
    //--------------Acelerometro--------------
    Leitura += R"(","AccelX_mss":")";
    Leitura += AccelX_mss;
    Leitura += R"(","AccelY_mss":")";
    Leitura += AccelY_mss;
    Leitura += R"(","AccelZ_mss":")";
    Leitura += AccelZ_mss;
    //--------------Acel. Liner---------------
    Leitura += R"(","Acc_X":")";
    Leitura += AccelX_Lin;
    Leitura += R"(","Acc_Y":")";
    Leitura += AccelY_Lin;
    Leitura += R"(","Acc_Z":")";
    Leitura += AccelZ_Lin;
    //---------------Giroscópio---------------
    Leitura += R"(","Gyr_X":")";
    Leitura += GyroX_rads;
    Leitura += R"(","Gyr_Y":")";
    Leitura += GyroY_rads;
    Leitura += R"(","Gyr_Z":")";
    Leitura += GyroZ_rads;
    //--------------Magnetometro--------------
    Leitura += R"(","Mag_X":")";
    Leitura += MagX_uT;
    Leitura += R"(","Mag_Y":")";
    Leitura += MagY_uT;
    Leitura += R"(","Mag_Z":")";
    Leitura += MagZ_uT;
    //----------Roll, Pitch e Yaw-------------
    Leitura += R"(","Roll":")";
    Leitura += Roll;
    Leitura += R"(","Pitch":")";
    Leitura += Pitch;
    Leitura += R"(","Yaw":")";
    Leitura += Yaw;
    //----------Euler_X, Euler_Y e Euler_Z-------------
    Leitura += R"(","Euler_X":")";
    Leitura += Euler_X;
    Leitura += R"(","Euler_Y":")";
    Leitura += Euler_Y;
    Leitura += R"(","Euler_Z":")";
    Leitura += Euler_Z;
    //----------Euler_X, Euler_Y e Euler_Z-------------
    Leitura += R"(","Quaternion_X":")";
    Leitura += Quaternion_X;
    Leitura += R"(","Quaternion_Y":")";
    Leitura += Quaternion_Y;
    Leitura += R"(","Quaternion_Z":")";
    Leitura += Quaternion_Z;
    Leitura += R"(","Quaternion_W":")";
    Leitura += Quaternion_W;
    Leitura += "\"}";

    return Leitura;
}

void StopMeasurement() {
    if(!measurementArray.isEmpty() && confServerSocket.availableForWriteAll()) {
        String content = R"({"type":"MEASUREMENT_LIST","message":[)" + measurementArray + "null]}";
        confServerSocket.textAll(content);
    }
    cmdActual = 0;
    measurementArray = "";
}

void RestartMeasurement() {
    StopMeasurement();
    numberMeasurement = 0;
    lastDispatch = 0;
}

void MountBufferToSend() {
        measurementArray += ReturnsJSONFromMeasurement(numberMeasurement);

        Serial.println("\n");
        Serial.print(numberMeasurement);
        Serial.print(" - ");
        Serial.print(lastDispatch + BUFFER_LENGTH);
        numberMeasurement = numberMeasurement + 1;
        // Buffer de 320 Measurement = BUFFER_LENGTH /  = 120Hz, default BUFFER_LENGTH = 320
        if (numberMeasurement >= (lastDispatch + BUFFER_LENGTH)) {
            Serial.println("[SENSOR] - Send buffer");

            String content = R"({"origin":"SENSOR","type":"MEASUREMENT_LIST","message":[)" + measurementArray + "]}";
            confServerSocket.textAll(content);
            lastDispatch = numberMeasurement;
            numberSended = numberSended + 1;
            measurementArray = "";
        } else {
            // For new element in array
            measurementArray += ",";
        }
}

#endif //MPU_SOCKET_SERVER_MPU_SENSOR_H
