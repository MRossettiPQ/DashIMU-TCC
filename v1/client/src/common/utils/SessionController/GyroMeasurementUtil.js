import _ from "lodash";
import { v4 as uuid } from "uuid";

class GyroMeasurement {
  uuid = "";

  constructor(measurement = null) {
    if (!_.isNil(measurement)) {
      this.setData(measurement);
      this.uuid = uuid(null, null, null);
    }
  }

  get valid() {
    return false;
  }

  setData(measurement) {
    this.sensorName = measurement.sensorName;
    this.numberMensuration = measurement.numberMensuration;
    this.hourMensuration = measurement.hourMensuration;
  }

  sensorName = null;
  numberMensuration = null;
  hourMensuration = null;
  //
  Acc_X = null;
  Acc_Y = null;
  Acc_Z = null;
  //
  AccelX_mss = null;
  AccelY_mss = null;
  AccelZ_mss = null;
  //
  Gyr_X = null;
  Gyr_Y = null;
  Gyr_Z = null;
  //
  Mag_X = null;
  Mag_Y = null;
  Mag_Z = null;
  //
  Roll = null;
  Pitch = null;
  Yaw = null;
  //
  Euler_X = null;
  Euler_Y = null;
  Euler_Z = null;
  //
  Quaternion_X = null;
  Quaternion_Y = null;
  Quaternion_Z = null;
  Quaternion_W = null;
}

export { GyroMeasurement };
