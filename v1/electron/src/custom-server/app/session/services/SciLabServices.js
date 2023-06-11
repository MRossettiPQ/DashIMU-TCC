const { getColumn, getMean, getArraySubtract, getMax, getMin, getStDeviation, getArrayDivision, getArrayPow, getArraySqrt, getIndexMinMax, getArrayMultiply } = require('../../../core/utils/SciLab')

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
  for (let i = 0; i < measurements_1.length; i++) {
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
