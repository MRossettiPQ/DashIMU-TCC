import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import {
  GyroMeasurement,
  GyroMeasurementMetadata,
} from 'src/common/models/GyroMeasurement';

class GyroMeasurementUtil implements GyroMeasurement, GyroMeasurementMetadata {
  uuid?: string;

  constructor(measurement: GyroMeasurement) {
    if (!_.isNil(measurement)) {
      this.setData(measurement);
      this.uuid = uuid();
    }
  }

  get valid() {
    return false;
  }

  setData(measurement: GyroMeasurement) {
    this.sensorName = measurement.sensorName;
    this.numberMensuration = measurement.numberMensuration;
    this.hourMensuration = measurement.hourMensuration;
    this.Acc_X = measurement.Acc_X;
    this.Acc_Y = measurement.Acc_Y;
    this.Acc_Z = measurement.Acc_Z;
    this.AccelX_mss = measurement.AccelX_mss;
    this.AccelY_mss = measurement.AccelY_mss;
    this.AccelZ_mss = measurement.AccelZ_mss;
    this.Gyr_X = measurement.Gyr_X;
    this.Gyr_Y = measurement.Gyr_Y;
    this.Gyr_Z = measurement.Gyr_Z;
    this.Mag_X = measurement.Mag_X;
    this.Mag_Y = measurement.Mag_Y;
    this.Mag_Z = measurement.Mag_Z;
    this.Roll = measurement.Roll;
    this.Pitch = measurement.Pitch;
    this.Yaw = measurement.Yaw;
    this.Euler_X = measurement.Euler_X;
    this.Euler_Y = measurement.Euler_Y;
    this.Euler_Z = measurement.Euler_Z;
    this.Quaternion_X = measurement.Quaternion_X;
    this.Quaternion_Y = measurement.Quaternion_Y;
    this.Quaternion_Z = measurement.Quaternion_Z;
    this.Quaternion_W = measurement.Quaternion_W;
  }

  sensorName?: string;
  numberMensuration?: number;
  hourMensuration?: string;
  //
  Acc_X?: number | null | undefined;
  Acc_Y?: number | null | undefined;
  Acc_Z?: number | null | undefined;
  //
  AccelX_mss?: number | null | undefined;
  AccelY_mss?: number | null | undefined;
  AccelZ_mss?: number | null | undefined;
  //
  Gyr_X?: number | null | undefined;
  Gyr_Y?: number | null | undefined;
  Gyr_Z?: number | null | undefined;
  //
  Mag_X?: number | null | undefined;
  Mag_Y?: number | null | undefined;
  Mag_Z?: number | null | undefined;
  //
  Roll?: number | null | undefined;
  Pitch?: number | null | undefined;
  Yaw?: number | null | undefined;
  //
  Euler_X?: number | null | undefined;
  Euler_Y?: number | null | undefined;
  Euler_Z?: number | null | undefined;
  //
  Quaternion_X?: number | null | undefined;
  Quaternion_Y?: number | null | undefined;
  Quaternion_Z?: number | null | undefined;
  Quaternion_W?: number | null | undefined;
}

export { GyroMeasurementUtil };
