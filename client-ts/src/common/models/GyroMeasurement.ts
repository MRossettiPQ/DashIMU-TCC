export interface GyroMeasurement {
  id?: number;
  sensorName?: string;
  numberMensuration?: number;
  hourMensuration?: string;
  //
  Acc_X?: number | null;
  Acc_Y?: number | null;
  Acc_Z?: number | null;
  //
  AccelX_mss?: number | null;
  AccelY_mss?: number | null;
  AccelZ_mss?: number | null;
  //
  Gyr_X?: number | null;
  Gyr_Y?: number | null;
  Gyr_Z?: number | null;
  //
  Mag_X?: number | null;
  Mag_Y?: number | null;
  Mag_Z?: number | null;
  //
  Roll?: number | null;
  Pitch?: number | null;
  Yaw?: number | null;
  //
  Euler_X?: number | null;
  Euler_Y?: number | null;
  Euler_Z?: number | null;
  //
  Quaternion_X?: number | null;
  Quaternion_Y?: number | null;
  Quaternion_Z?: number | null;
  Quaternion_W?: number | null;
}

export interface GyroMeasurementMetadata {
  uuid?: string;
}
