const {
  getColumn,
  getMean,
  getArraySubtract,
  getMax,
  getMin,
  getStDeviation,
  getArrayDivision,
  getArrayPow,
  getArraySqrt,
  getIndexMinMax,
  getArrayMultiply,
} = require('../../../core/utils/SciLab')
const math = require('mathjs')
const { Quaternion } = require('quaternion')

exports.calculationVariabilityCenter = (sensors) => {
  console.log('[Service] - /api/session/:id/scilab - calculationVariabilityCenter')
  let result = {}
  if (sensors?.length) {
    // TODO Sensor 1
    const sensor_1 = sensors.find((s) => s.position === 'ONE')?.gyro_measurements
    // TODO Sensor 2
    const sensor_2 = sensors.find((s) => s.position === 'TWO')?.gyro_measurements

    if (sensor_1 && sensor_2) {
      result = processData(sensor_1, sensor_2)
      result.angles = calculateAngles(sensor_1, sensor_2)
    }
  }
  return result
}

function processData(measurements_1, measurements_2) {
  // Roll
  let roll1 = getColumn(measurements_1, 'Roll')
  let roll2 = getColumn(measurements_2, 'Roll')

  let zerarroll1 = getMean(roll1.slice(9, 99))
  let roll1p = getArraySubtract(roll1, zerarroll1)

  let zerarroll2 = getMean(roll2.slice(9, 99))
  let roll2p = getArraySubtract(roll2, zerarroll2)

  // Pitch
  let pitch1 = getColumn(measurements_1, 'Pitch')
  let pitch2 = getColumn(measurements_2, 'Pitch')

  let zerarpitch1 = getMean(pitch1.slice(9, 99))
  let pitch1p = getArraySubtract(pitch1, zerarpitch1)

  let zerarpitch2 = getMean(pitch2.slice(9, 99))
  let pitch2p = getArraySubtract(pitch2, zerarpitch2)

  // Yaw
  let yaw1 = getColumn(measurements_1, 'Yaw')
  let yaw2 = getColumn(measurements_2, 'Yaw')

  yaw1 = getArrayMultiply(yaw1, -1)

  let zeraryaw1 = getMean(yaw1.slice(9, 99))
  let yaw1p = getArraySubtract(yaw1, zeraryaw1)

  let zeraryaw2 = getMean(yaw2.slice(9, 99))
  let yaw2p = getArraySubtract(yaw2, zeraryaw2)

  // X
  let x1 = getColumn(measurements_1, 'Acc_X')
  let zerarx1 = getMean(x1.slice(9, 99))
  let x1p = getArraySubtract(x1, zerarx1)

  // Y
  let y1 = getColumn(measurements_1, 'Acc_Y')
  let zerary1 = getMean(y1.slice(9, 99))
  let y1p = getArraySubtract(y1, zerary1)

  // Z
  let z1 = getColumn(measurements_1, 'Acc_Z')
  let zerarz1 = getMean(z1.slice(9, 99))
  let z1p = getArraySubtract(z1, zerarz1)

  let atorn = []
  let length = measurements_2.length
  if (measurements_1.length < measurements_2.length) {
    length = measurements_1.length
  }
  for (let i = 0; i < length; i++) {
    const calc = 90 - yaw1[i] - pitch2[i]
    atorn.push(calc)
  }

  // Values of Interest
  let limit9 = getMax(y1p)
  let yy1p = getArrayDivision(y1p, 2)
  yy1p = getArrayPow(yy1p, 4)

  // Finding the start value
  let inicioi = getIndexMinMax(yy1p, limit9)
  let inicio = inicioi - 734
  let iniciof = inicioi - 134

  // Crop
  let rpitch1p = pitch1p.slice(inicio, iniciof + 1)
  let ratorn = atorn.slice(inicio, iniciof + 1)

  let min_pitch = getMin(rpitch1p)
  let max_pitch = getMax(rpitch1p)
  let var_pitch = max_pitch - min_pitch

  let min_atorn = getMin(ratorn)
  let max_atorn = getMax(ratorn)
  let var_atorn = max_atorn - min_atorn

  let zatorn = getArraySubtract(ratorn, 90)
  let rmsratorn = getArraySqrt(getArrayPow(zatorn, 2))
  let rmsrpitch1p = getArraySqrt(getArrayPow(rpitch1p, 2))

  let mean_rms_r_atorn = getMean(rmsratorn)
  let sd_rms_r_atorn = getStDeviation(rmsratorn)

  let mean_rms_r_pitch_1p = getMean(rmsrpitch1p)
  let sd_rms_r_pitch_1p = getStDeviation(rmsrpitch1p)

  return {
    atorn,
    min_pitch,
    max_pitch,
    var_pitch,
    min_atorn,
    max_atorn,
    var_atorn,
    mean_rms_r_atorn,
    sd_rms_r_atorn,
    mean_rms_r_pitch_1p,
    sd_rms_r_pitch_1p,
  }
}

function calculateAngles(sensor_1, sensor_2) {
  let result = {}
  let angles = []
  let values = []
  let length = sensor_2.length
  if (sensor_1.length < sensor_2.length) {
    length = sensor_1.length
  }
  for (let pos = 0; pos < length; pos++) {
    const measurement_1 = sensor_1[pos]
    const measurement_2 = sensor_2[pos]

    const quaternionAngle = calculateQuaternionAngle(measurement_1, measurement_2)
    const eulerAngle = calculateEulerAngle(measurement_1, measurement_2)
    const rollPitchYawAngle = calculateRollPitchYawAngle2(measurement_1, measurement_2)
    if (pos === 0) {
      console.log(quaternionAngle)
      console.log(eulerAngle)
      console.log(rollPitchYawAngle)
    }

    angles.push(quaternionAngle)
    values.push({
      quaternionAngle,
      eulerAngle,
      rollPitchYawAngle,
    })
  }

  if (angles.length) {
    let mean = getMean(angles)
    let min = getMin(angles)
    let max = getMax(angles)
    let std = getStDeviation(angles)

    result = {
      values,
      mean,
      min,
      max,
      std,
    }
  }
  return result
}

//
function calculateQuaternionAngle(gyro_measurement_1, gyro_measurement_2) {
  // Verifica se as medições possuem os valores do quaternion
  if (
    gyro_measurement_1.Quaternion_X == null ||
    gyro_measurement_1.Quaternion_Y == null ||
    gyro_measurement_1.Quaternion_Z == null ||
    gyro_measurement_1.Quaternion_W == null ||
    gyro_measurement_2.Quaternion_X == null ||
    gyro_measurement_2.Quaternion_Y == null ||
    gyro_measurement_2.Quaternion_Z == null ||
    gyro_measurement_2.Quaternion_W == null
  ) {
    return null
  }

  const q1 = {
    x: gyro_measurement_1.Quaternion_X,
    y: gyro_measurement_1.Quaternion_Y,
    z: gyro_measurement_1.Quaternion_Z,
    w: gyro_measurement_1.Quaternion_W,
  }

  const q2 = {
    x: gyro_measurement_2.Quaternion_X,
    y: gyro_measurement_2.Quaternion_Y,
    z: gyro_measurement_2.Quaternion_Z,
    w: gyro_measurement_2.Quaternion_W,
  }
  // Calcula o produto escalar entre os dois quaternions
  const dotProduct = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w

  // O ângulo entre os dois quaternions é o arco cosseno do produto escalar
  const angle = 2 * Math.acos(Math.min(Math.abs(dotProduct), 1))

  // Converte o ângulo para graus
  return angle * (180 / Math.PI)
}

//
function calculateRollPitchYawAngle2(gyro_measurement_1, gyro_measurement_2) {
  return 0
}

//
function calculateEulerAngle(gyro_measurement_1, gyro_measurement_2) {
  if (
    gyro_measurement_1.Euler_X == null ||
    gyro_measurement_1.Euler_Y == null ||
    gyro_measurement_1.Euler_Z == null ||
    gyro_measurement_2.Euler_X == null ||
    gyro_measurement_2.Euler_Y == null ||
    gyro_measurement_2.Euler_Z == null
  ) {
    return null // Verifica se as medições possuem os valores de Euler
  }

  const euler1 = {
    x: gyro_measurement_1.Euler_X,
    y: gyro_measurement_1.Euler_Y,
    z: gyro_measurement_1.Euler_Z,
  }

  const euler2 = {
    x: gyro_measurement_2.Euler_X,
    y: gyro_measurement_2.Euler_Y,
    z: gyro_measurement_2.Euler_Z,
  }

  // Calcula a diferença entre os ângulos de Euler
  const diffX = euler2.x - euler1.x
  const diffY = euler2.y - euler1.y
  const diffZ = euler2.z - euler1.z

  // Normaliza os ângulos para o intervalo entre -180 e 180 graus
  const normX = anglesNormalizer(diffX)
  const normY = anglesNormalizer(diffY)
  const normZ = anglesNormalizer(diffZ)

  // Calcula a magnitude do ângulo resultante
  return Math.sqrt(normX * normX + normY * normY + normZ * normZ)
}

// Função auxiliar para normalizar um ângulo para o intervalo entre -180 e 180 graus
function anglesNormalizer(angle) {
  while (angle > 180) {
    angle -= 360
  }
  while (angle < -180) {
    angle += 360
  }
  return angle
}
