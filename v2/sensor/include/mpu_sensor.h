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
        // mpu.setFilterIterations(10);

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
    // socketIO.sendEVENT("sensor-calibrating");
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
    // digitalWrite(LED_SENSOR_CALIBRATION_PLAN, HIGH);
    mpu.calibrateAccelGyro();
    // digitalWrite(LED_SENSOR_CALIBRATION_PLAN, LOW);

    Serial.println("[SENSOR] - Magnetic calibration will start in 5 seconds");
    Serial.println("[SENSOR] - Please wave the device in a figure eight until finished");
    // delay(5000);
    vTaskDelay(5000 / portTICK_PERIOD_MS);
    // digitalWrite(LED_SENSOR_CALIBRATION_EIGHT, HIGH);
    mpu.calibrateMag();

    // digitalWrite(LED_SENSOR_CALIBRATION_EIGHT, LOW);

    PrintIMUCalibration();
    mpu.verbose(false);

    SaveIMUCalibration();

    LoadIMUCalibration();
    calibrating = false;

    // socketIO.sendEVENT("sensor-calibrated");
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
    Serial.print(mpu.getAccBiasX() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY);
    Serial.print("\", ");
    Serial.print(mpu.getAccBiasY() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY);
    Serial.print("\", ");
    Serial.print(mpu.getAccBiasZ() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY);
    Serial.println();
    Serial.println("gyro bias [deg/s]: ");
    Serial.print(mpu.getGyroBiasX() / (float)MPU9250::CALIB_GYRO_SENSITIVITY);
    Serial.print("\", ");
    Serial.print(mpu.getGyroBiasY() / (float)MPU9250::CALIB_GYRO_SENSITIVITY);
    Serial.print("\", ");
    Serial.print(mpu.getGyroBiasZ() / (float)MPU9250::CALIB_GYRO_SENSITIVITY);
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

void StopMeasurement() {
    /*
    if(!measurementArray.isEmpty() && confServerSocket.availableForWriteAll()) {
        String content = R"({"type":"MEASUREMENT_LIST","message":[)" + measurementArray + "null]}";
        confServerSocket.textAll(content);
    }
    */
    cmdActual = 0;
}

void RestartMeasurement() {
    StopMeasurement();
    numberMeasurement = 0;
    lastDispatch = 0;
}

JsonObject CreateJsonObjectFromMeasurement(int MeasurementNumber) {
    JsonObject param = measurement.to<JsonObject>();
    //-----------------Sensor----------------
    param["sensorName"] = nameSensor;
    param["numberMensuration"] = MeasurementNumber;
    param["hourMensuration"] = timeClient.getFormattedTime();
    //--------------Acelerometro--------------
    param["AccelX_mss"] = mpu.getAccBiasX() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
    param["AccelY_mss"] = mpu.getAccBiasY() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
    param["AccelZ_mss"] = mpu.getAccBiasZ() * 1000.f / (float)MPU9250::CALIB_ACCEL_SENSITIVITY;
    //--------------Acel. Liner---------------
    param["Acc_X"] = mpu.getLinearAccX();
    param["Acc_Y"] = mpu.getLinearAccY();
    param["Acc_Z"] = mpu.getLinearAccZ();
    //---------------Giroscópio---------------
    param["Gyr_X"] = mpu.getGyroBiasX() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
    param["Gyr_Y"] = mpu.getGyroBiasY() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
    param["Gyr_Z"] = mpu.getGyroBiasZ() / (float)MPU9250::CALIB_GYRO_SENSITIVITY;
    //--------------Magnetometro--------------
    param["Mag_X"] = mpu.getMagBiasX();
    param["Mag_Y"] = mpu.getMagBiasY();
    param["Mag_Z"] = mpu.getMagBiasZ();
    //----------Roll, Pitch e Yaw-------------
    param["Roll"] = mpu.getRoll();
    param["Pitch"] = mpu.getPitch();
    param["Yaw"] = mpu.getYaw();
    //----------Euler_X, Euler_Y e Euler_Z-------------
    param["Euler_X"] = mpu.getEulerX();
    param["Euler_Y"] = mpu.getEulerY();
    param["Euler_Z"] = mpu.getEulerZ();
    // QuaternionX, QuaternionY, QuaternionZ e QuaternionW
    param["Quaternion_X"] = mpu.getQuaternionX();
    param["Quaternion_Y"] = mpu.getQuaternionY();
    param["Quaternion_Z"] = mpu.getQuaternionZ();
    param["Quaternion_W"] = mpu.getQuaternionW();

    return param;
}

String CreateJsonFromMeasurement(int MeasurementNumber) {
    //-----------------Sensor----------------
    String message = R"({"sensorName":")";
    message += nameSensor;
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

void MountBufferToSend() {
    numberMeasurement = numberMeasurement + 1;
    JsonObject item = measurements.createNestedObject();
    item.set(CreateJsonObjectFromMeasurement(numberMeasurement));

    // Serial.printf("\n%d - %d\n", numberMeasurement, lastDispatch + BUFFER_LENGTH);
    // Buffer de 320 medições = BUFFER_LENGTH / default BUFFER_LENGTH = 320 / 2,56 segundos = 125Hz,
    if (numberMeasurement == (lastDispatch + BUFFER_LENGTH)) {
        //Serial.println("[SENSOR] - Send buffer");
        
        DynamicJsonDocument event(capacity + 128);
        JsonArray array = event.to<JsonArray>();
        array.add("measurements");

        JsonObject param = array.createNestedObject();
        param["origin"] = "SENSOR";
        param["type"] = "MEASUREMENT_LIST";
        param["data"] = buffer;
        
        Serial.print("Memória livre: ");
        Serial.print(esp_get_free_heap_size());
        Serial.println(" bytes");
        Serial.print(capacity);
        Serial.println(" bytes");
        Serial.print(event.capacity());
        Serial.println(" bytes");

        // Transforma o json em String
        String content;
        serializeJson(event, content);
        socketIO.sendEVENT(content);
        
        event.clear();
        measurements.clear();
        measurements = buffer.to<JsonArray>();

        lastDispatch = numberMeasurement;
        numberSended = numberSended + 1;
    }
}

#endif  // MPU_SOCKET_SERVER_MPU_SENSOR_H
