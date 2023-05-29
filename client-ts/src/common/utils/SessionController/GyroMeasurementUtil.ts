import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import {
  GyroMeasurement,
  GyroMeasurementMetadata,
} from 'src/common/models/GyroMeasurement';

class GyroMeasurementUtil implements GyroMeasurement, GyroMeasurementMetadata {
  uuid?: string;

  constructor(measurement: GyroMeasurementUtil) {
    if (!_.isNil(measurement)) {
      this.setData(measurement);
      this.uuid = uuid();
    }
  }

  get valid() {
    return false;
  }

  setData(measurement: GyroMeasurementUtil) {
    this.sensorName = measurement.sensorName;
    this.numberMensuration = measurement.numberMensuration;
    this.hourMensuration = measurement.hourMensuration;
  }

  sensorName?: string;
  numberMensuration?: number;
  hourMensuration?: string;
  //
  Acc_X?: number;
  Acc_Y?: number;
  Acc_Z?: number;
  //
  AccelX_mss?: number;
  AccelY_mss?: number;
  AccelZ_mss?: number;
  //
  Gyr_X?: number;
  Gyr_Y?: number;
  Gyr_Z?: number;
  //
  Mag_X?: number;
  Mag_Y?: number;
  Mag_Z?: number;
  //
  Roll?: number;
  Pitch?: number;
  Yaw?: number;
  //
  Euler_X?: number;
  Euler_Y?: number;
  Euler_Z?: number;
  //
  Quaternion_X?: number;
  Quaternion_Y?: number;
  Quaternion_Z?: number;
  Quaternion_W?: number;
}

export { GyroMeasurementUtil };
