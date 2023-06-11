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

String CreateJsonFromMeasurement(int MeasurementNumber) {
    //-----------------Sensor----------------
    String message = R"({"sensorName":")";
    message += sensorName;
    message += R"(","numberMensuration":")";
    message += MeasurementNumber;
    message += R"(","hourMensuration":")";
    message += timeClient.getFormattedTime();
    //--------------Acelerometro--------------
    message += R"(","AccelX_mss":")";
    message += mpu.getAccBiasX() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
    message += R"(","AccelY_mss":")";
    message += mpu.getAccBiasY() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
    message += R"(","AccelZ_mss":")";
    message += mpu.getAccBiasZ() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
    //--------------Acel. Liner---------------
    message += R"(","Acc_X":")";
    message += mpu.getLinearAccX();
    message += R"(","Acc_Y":")";
    message += mpu.getLinearAccY();
    message += R"(","Acc_Z":")";
    message += mpu.getLinearAccZ();
    //---------------Giroscópio---------------
    message += R"(","Gyr_X":")";
    message += mpu.getGyroBiasX() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
    message += R"(","Gyr_Y":")";
    message += mpu.getGyroBiasY() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
    message += R"(","Gyr_Z":")";
    message += mpu.getGyroBiasZ() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
    //--------------Magnetometro--------------
    message += R"(","Mag_X":")";
    message += mpu.getMagBiasX();
    message += R"(","Mag_Y":")";
    message += mpu.getMagBiasY();
    message += R"(","Mag_Z":")";
    message += mpu.getMagBiasZ();
    //----------Roll, Pitch e Yaw-------------
    message += R"(","Roll":")";
    message += mpu.getRoll();
    message += R"(","Pitch":")";
    message += mpu.getPitch();
    message += R"(","Yaw":")";
    message += mpu.getYaw();
    //----------Euler_X, Euler_Y e Euler_Z-------------
    message += R"(","Euler_X":")";
    message += mpu.getEulerX();
    message += R"(","Euler_Y":")";
    message += mpu.getEulerY();
    message += R"(","Euler_Z":")";
    message += mpu.getEulerZ();
    // QuaternionX, QuaternionY, QuaternionZ e QuaternionW
    message += R"(","Quaternion_X":")";
    message += mpu.getQuaternionX();
    message += R"(","Quaternion_Y":")";
    message += mpu.getQuaternionY();
    message += R"(","Quaternion_Z":")";
    message += mpu.getQuaternionZ();
    message += R"(","Quaternion_W":")";
    message += mpu.getQuaternionW();
    message += "\"}";
    return message;
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
        numberMeasurement = numberMeasurement + 1;
        measurementArray += CreateJsonFromMeasurement(numberMeasurement);

        Serial.printf("\n%d - %d\n", numberMeasurement, lastDispatch + BUFFER_LENGTH);
        // Buffer de 320 Measurement = BUFFER_LENGTH /  = 120Hz, default BUFFER_LENGTH = 320
        if (numberMeasurement == (lastDispatch + BUFFER_LENGTH)) {
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
