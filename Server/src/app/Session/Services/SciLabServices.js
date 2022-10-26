const {
  getColumn,
  getMean,
  getArraySubtract,
  getMax,
  getMin,
  getSqrt,
  getStDeviation,
  getArrayDivision,
  getArrayPow,
  getIndexMinMax,
  getArraySqrt,
} = require('../../../core/Utils/SciLab')
const dayjs = require('dayjs')

exports.calculationVariabilityCenter = async ({
  sensors,
  session,
  chartType = 'eChart',
  rangeStart,
  rangeEnd,
}) => {
  console.log('[Service] - /api/session/:id/scilab')
  if (sensors?.length) {
    // Sensor 1
    const sensor_1 = sensors[0].gyro_measurements
    const length = sensor_1?.length

    const pitch_1 = getColumn(sensor_1, 'Pitch')
    let yaw_1 = getColumn(sensor_1, 'Yaw')
    const roll_1 = getColumn(sensor_1, 'Roll')

    yaw_1 = yaw_1.map((yaw) => yaw * -1)

    const x_1 = getColumn(sensor_1, 'Acc_X')
    const y_1 = getColumn(sensor_1, 'Acc_Y')
    const z_1 = getColumn(sensor_1, 'Acc_Z')

    // Sensor 2
    const sensor_2 = sensors[1].gyro_measurements

    const pitch_2 = getColumn(sensor_2, 'Pitch')
    let yaw_2 = getColumn(sensor_2, 'Yaw')
    const roll_2 = getColumn(sensor_2, 'Roll')

    yaw_2 = yaw_2.map((yaw) => yaw * -1)

    // const x_2 = getColumn(sensor_2, 'Acc_X')
    // const y_2 = getColumn(sensor_2, 'Acc_Y')
    // const z_2 = getColumn(sensor_2, 'Acc_Z')

    // Frequency of sensor readings
    // const f_1 = tamanho / 120
    // const tempo = 0.0083333 / f_1

    //
    // const zerar_roll_1 = getMean(roll_1.slice(9, 99))
    // const roll_1p = getArraySubtract(roll_1, zerar_roll_1)

    // const zerar_roll_2 = getMean(roll_2.slice(9, 99))
    // const roll_2p = getArraySubtract(roll_2, zerar_roll_2)

    const zerar_pitch_1 = getMean(pitch_1.slice(9, 99))
    const pitch_1p = getArraySubtract(pitch_1, zerar_pitch_1)

    // const zerar_pitch_2 = getMean(pitch_2.slice(9, 99))
    // const pitch_2p = getArraySubtract(pitch_2, zerar_pitch_2)

    // const zerar_yaw_1 = getMean(yaw_1.slice(9, 99))
    // const yaw_1p = getArraySubtract(yaw_1, zerar_yaw_1)

    // const zerar_yaw_2 = getMean(yaw_2.slice(9, 99))
    // const yaw_2p = getArraySubtract(yaw_2, zerar_yaw_2)

    // const zerar_x_1 = getMean(x_1.slice(9, 99))
    // const x_1p = getArraySubtract(x_1, zerar_x_1)

    const zerar_y_1 = getMean(y_1.slice(9, 99))
    const y_1p = getArraySubtract(y_1, zerar_y_1)

    // const zerar_z_1 = getMean(z_1.slice(9, 99))
    // const z_1p = getArraySubtract(z_1, zerar_z_1)

    //
    const atorn = []
    for (let index = 0; index < length; index++) {
      atorn.push(90 - yaw_1[index] - pitch_2[index])
    }

    //
    const limit_9 = getMax(y_1p)
    let y_y1p = getArrayDivision(y_1p, 2)
    y_y1p = getArrayPow(y_y1p, 4)

    let inicio
    let inicio_i
    let inicio_f
    for (const [temp, index] in y_y1p) {
      if (temp > limit_9) {
        inicio_i = index
      }
    }

    inicio = inicio_i - 735
    inicio_f = inicio_i - 135

    const r_pitch_1p = pitch_1p.slice(inicio, inicio_f)
    const r_atorn = atorn.slice(inicio, inicio_f)

    const min_pitch = getMin(r_pitch_1p)
    // const iminpitch = getIndexMinMax(r_pitch_1p, min_pitch)
    const max_pitch = getMax(r_pitch_1p)
    // const imaxpitch = getIndexMinMax(r_pitch_1p, max_pitch)
    const var_pitch = max_pitch - min_pitch

    const min_atorn = getMin(r_atorn)
    // const iminatorn = getIndexMinMax(r_atorn, min_atorn)
    const max_atorn = getMax(r_atorn)
    // const imaxatorn = getIndexMinMax(r_atorn, max_atorn)

    const var_atorn = max_atorn - min_atorn

    let z_atorn = getArraySubtract(r_atorn, 90)
    const rms_r_atorn = getArraySqrt(getArrayPow(z_atorn, 2))
    const rms_r_pitch_1p = getSqrt(getArraySqrt(getArrayPow(r_pitch_1p, 2)))

    const mean_rms_r_atorn = getMean(rms_r_atorn)
    const sd_rms_r_atorn = getStDeviation(rms_r_atorn)

    const mean_rms_r_pitch_1p = getMean(rms_r_pitch_1p)
    const sd_rms_r_pitch_1p = getStDeviation(rms_r_pitch_1p)

    let chartOption = null
    switch (chartType) {
      case 'eChart':
        chartOption = await this.getEChartOptions({
          session,
          max_atorn,
        })
        break
      default:
        console.log('[SERVICE] Chart not supported')
        break
    }
    // Tempos
    return {
      chartOption,
      atorn,
      values: {
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
      },
    }
  }
}

exports.getEChartOptions = async ({ session, max_atorn }) => {
  // reference -> https://echarts.apache.org/

  return {
    title: {
      left: 'center',
      text: `Session ${session.idSession} - ${dayjs(session.date).format(
        'DD/MM/YYYY'
      )}`,
    },
    yAxis: {
      boundaryGap: [0, '100%'],
      type: 'value',
      max: max_atorn + 0.1 * max_atorn,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: { onZero: true },
    },
  }
}
