const { Medicao, Usuario } = require('../../../core/DataBase')
const UserContext = require('../../../core/Utils/UserContext')
const RequestUtil = require('../../../core/Utils/RequestUtil')
const {
  getMax,
  getMin,
  getMean,
  getArraySubtract,
  getSqrt,
  getStDeviation,
  getColumn,
} = require('../../../core/Utils/SciLab')

exports.getCalculationVariabilityCenter = async (req, res) => {
  console.log('[POST] - /api/scilab/scilab')
  const idUserContext = await UserContext.getUserContextId(req, res)
  const { id: idPaciente } = req.params

  RequestUtil.throwError({
    cond: idUserContext === null,
    message: 'Necessario estar logado',
    res,
  })
  RequestUtil.throwError({
    cond: idPaciente === null,
    message: 'Falta a id do paciente',
    res,
  })

  Medicao.create(req.body)
    .then((medicao) => {
      res.status(200).send({ message: 'Paciente registrado com sucesso!' })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.postCentralVariabilidadeSalto = async (req, res) => {
  try {
    console.log('[POST] - /api/scilab/centralvariabilidadesalto')
    const idUsuario = UserContext.getUserContextId(req, res)
    /*
        const {id: idPaciente} = req.params;

        RequestUtil.throwError({
            cond: idUsuario === null,
            message: "Necessario estar logado",
            res
        })
        RequestUtil.throwError({
            cond: idPaciente === null,
            message: "Falta a id do paciente",
            res
        })
        */

    const sensores = req.body
    if (sensores.length) {
      // Sensor 1
      const sensor_1 = sensores[0]
      const tamanho = sensor_1.length

      const pitch_1 = getColumn(sensor_1, 'Pitch')
      let yaw_1 = getColumn(sensor_1, 'Yaw')
      const roll_1 = getColumn(sensor_1, 'Roll')

      yaw_1 = yaw_1.map((yaw) => yaw * -1)

      const x_1 = getColumn(sensor_1, 'Acc_X')
      const y_1 = getColumn(sensor_1, 'Acc_Y')
      const z_1 = getColumn(sensor_1, 'Acc_Z')

      // Sensor 2
      const sensor_2 = sensores[1]

      const pitch_2 = getColumn(sensor_2, 'Pitch')
      let yaw_2 = getColumn(sensor_2, 'Yaw')
      const roll_2 = getColumn(sensor_2, 'Roll')

      yaw_2 = yaw_2.map((yaw) => yaw * -1)

      const x_2 = getColumn(sensor_2, 'Acc_X')
      const y_2 = getColumn(sensor_2, 'Acc_Y')
      const z_2 = getColumn(sensor_2, 'Acc_Z')

      // Frequencia das leituras no sensor
      const f_1 = tamanho / 120
      const tempo = 0.0083333 / f_1

      //
      const zerar_roll_1 = getMean(roll_1.slice(9, 99))
      const roll_1p = getArraySubtract(roll_1, zerar_roll_1)

      const zerar_roll_2 = getMean(roll_2.slice(9, 99))
      const roll_2p = getArraySubtract(roll_2, zerar_roll_2)

      const zerar_pitch_1 = getMean(pitch_1.slice(9, 99))
      const pitch_1p = getArraySubtract(pitch_1, zerar_pitch_1)

      const zerar_pitch_2 = getMean(pitch_2.slice(9, 99))
      const pitch_2p = getArraySubtract(pitch_2, zerar_pitch_2)

      const zerar_yaw_1 = getMean(yaw_1.slice(9, 99))
      const yaw_1p = getArraySubtract(yaw_1, zerar_yaw_1)

      const zerar_yaw_2 = getMean(yaw_2.slice(9, 99))
      const yaw_2p = yaw_2 - zerar_yaw_2

      const zerar_x_1 = getMean(x_1.slice(9, 99))
      const x_1p = x_1 - zerar_x_1

      const zerar_y_1 = getMean(y_1.slice(9, 99))
      const y_1p = y_1 - zerar_y_1

      const zerar_z_1 = getMean(z_1.slice(9, 99))
      const z_1p = z_1 - zerar_z_1

      //
      const atorn = []
      for (const index in tamanho) {
        atorn.push(90 - yaw_1[index] - pitch_2[index])
      }

      //
      const limit_9 = getMax(y_1p)
      let y_y1p = y_1p / 2
      y_y1p ^= 4

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

      const [min_pitch, iminpitch] = getMin(r_pitch_1p)
      const [max_pitch, imaxpitch] = getMax(r_pitch_1p)
      const var_pitch = max_pitch - min_pitch

      const [min_atorn, iminatorn] = getMin(r_atorn)
      const [max_atorn, imaxatorn] = getMax(r_atorn)
      const var_atorn = max_atorn - min_atorn

      const z_atorn = getArraySubtract(r_atorn, 90)
      const rms_r_atorn = getSqrt(z_atorn ^ 2)
      const rms_r_pitch_1p = getSqrt(r_pitch_1p ^ 2)

      const mean_rms_r_atorn = getMean(rms_r_atorn)
      const sd_rms_r_atorn = getStDeviation(rms_r_atorn)

      const mean_rms_r_pitch_1p = getMean(rms_r_pitch_1p)
      const sd_rms_r_pitch_1p = getStDeviation(rms_r_pitch_1p)

      // Tempos
      const tvv = []
      tvv.push(min_pitch)
      tvv.push(max_pitch)
      tvv.push(var_pitch)
      tvv.push(min_atorn)
      tvv.push(max_atorn)
      tvv.push(var_atorn)
      tvv.push(mean_rms_r_atorn)
      tvv.push(sd_rms_r_atorn)
      tvv.push(mean_rms_r_pitch_1p)
      tvv.push(sd_rms_r_pitch_1p)

      RequestUtil.throwSucess({
        content: {
          atorn,
          valor: tvv,
        },
        message: 'Requisitado com sucesso!',
        res,
      })
    }

    RequestUtil.throwSucess({
      message: 'Não possui dados suficientes!',
      res,
    })
  } catch (e) {
    console.log(e)
    RequestUtil.throwError({
      cond: true,
      message: `Error${e}`,
      res,
    })
  }
}
