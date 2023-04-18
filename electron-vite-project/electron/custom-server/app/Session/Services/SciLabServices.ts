import { getColumn, getMean, getArraySubtract, getMax, getMin, getStDeviation, getArrayDivision, getArrayPow, getArraySqrt } from "../../../core/utils/SciLab";
import { MovementModel } from "../Models/Movement";
import { SensorModel } from "../Models/Sensor";
import { SessionModel } from "../Models/Session";

interface CalculateValues {
  min_pitch?: number;
  max_pitch?: number;
  var_pitch?: number;
  min_atorn?: number;
  max_atorn?: number;
  var_atorn?: number;
  mean_rms_r_atorn?: number;
  sd_rms_r_atorn?: number[];
  mean_rms_r_pitch_1p?: number;
  sd_rms_r_pitch_1p?: number[];
}

interface CalculationVariabilityCenter {
  movement: MovementModel;
  chartOption: any;
  atorn: number[];
  values: CalculateValues;
}

export default new (class SciLabServices {
  async getAllCalc(movements: MovementModel[], newSession: SessionModel) {
    const result = [];
    for (const movement of movements) {
      if (movement.sensors) {
        const calc = await this.calculationVariabilityCenter(movement.sensors, newSession, "eChart", movement);
        if (calc) {
          result.push(calc);
        }
      }
    }
    return result;
  }

  async calculationVariabilityCenter(sensors: SensorModel[], session: SessionModel, chartType = "eChart", movement: MovementModel): Promise<CalculationVariabilityCenter | null> {
    console.log("[Service] - /api/session/:id/scilab");
    if (sensors?.length) {
      // Sensor 1
      const measurements_sensor_1 = sensors.find((s) => s.position === "ONE")?.gyro_measurements;
      // Sensor 2
      const measurements_sensor_2 = sensors.find((s) => s.position === "TWO")?.gyro_measurements;

      if (measurements_sensor_1 && measurements_sensor_2) {
        const length: number = measurements_sensor_1.length;

        const pitch_1 = getColumn(measurements_sensor_1, "Pitch");
        let yaw_1 = getColumn(measurements_sensor_1, "Yaw");
        const roll_1 = getColumn(measurements_sensor_1, "Roll");

        yaw_1 = yaw_1.map((yaw) => yaw * -1);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const x_1 = getColumn(measurements_sensor_1, "Acc_X");
        const y_1 = getColumn(measurements_sensor_1, "Acc_Y");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const z_1 = getColumn(measurements_sensor_1, "Acc_Z");

        const pitch_2 = getColumn(measurements_sensor_2, "Pitch");
        let yaw_2 = getColumn(measurements_sensor_2, "Yaw");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const roll_2 = getColumn(measurements_sensor_2, "Roll");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        yaw_2 = yaw_2.map((yaw) => yaw * -1);

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

        const zerar_pitch_1 = getMean(pitch_1.slice(9, 99));
        const pitch_1p = getArraySubtract(pitch_1, zerar_pitch_1);

        // const zerar_pitch_2 = getMean(pitch_2.slice(9, 99))
        // const pitch_2p = getArraySubtract(pitch_2, zerar_pitch_2)

        // const zerar_yaw_1 = getMean(yaw_1.slice(9, 99))
        // const yaw_1p = getArraySubtract(yaw_1, zerar_yaw_1)

        // const zerar_yaw_2 = getMean(yaw_2.slice(9, 99))
        // const yaw_2p = getArraySubtract(yaw_2, zerar_yaw_2)

        // const zerar_x_1 = getMean(x_1.slice(9, 99))
        // const x_1p = getArraySubtract(x_1, zerar_x_1)

        const zerar_y_1 = getMean(y_1.slice(9, 99));
        const y_1p = getArraySubtract(y_1, zerar_y_1);

        // const zerar_z_1 = getMean(z_1.slice(9, 99))
        // const z_1p = getArraySubtract(z_1, zerar_z_1)

        //
        const atorn = [];
        for (let index = 0; index < length; index++) {
          atorn.push(90 - yaw_1[index] - pitch_2[index]);
        }

        //
        const limit_9 = getMax(y_1p);
        let y_y1p = getArrayDivision(y_1p, 2);
        y_y1p = getArrayPow(y_y1p, 4);

        let inicio = 0;
        let inicio_i = 0;
        let inicio_f = y_y1p.length;
        await y_y1p.forEach((temp, index) => {
          if (temp > limit_9) {
            inicio_i = index;
          }
        });

        inicio = inicio_i - 735;
        inicio_f = inicio_i - 135;

        const r_pitch_1p = pitch_1p.slice(inicio, inicio_f);
        const r_atorn = atorn.slice(inicio, inicio_f);

        const min_pitch = getMin(r_pitch_1p);
        // const iminpitch = getIndexMinMax(r_pitch_1p, min_pitch)
        const max_pitch = getMax(r_pitch_1p);
        // const imaxpitch = getIndexMinMax(r_pitch_1p, max_pitch)
        const var_pitch = max_pitch - min_pitch;

        const min_atorn = getMin(r_atorn);
        // const iminatorn = getIndexMinMax(r_atorn, min_atorn)
        const max_atorn = getMax(r_atorn);
        // const imaxatorn = getIndexMinMax(r_atorn, max_atorn)

        const var_atorn = max_atorn - min_atorn;

        const z_atorn = getArraySubtract(r_atorn, 90);
        const rms_r_atorn = getArraySqrt(getArrayPow(z_atorn, 2));

        const t = getArrayPow(r_pitch_1p, 2);
        const t2 = getArraySqrt(t);
        const rms_r_pitch_1p = getArraySqrt(t2);

        const mean_rms_r_atorn = getMean(rms_r_atorn);
        const sd_rms_r_atorn = getStDeviation(rms_r_atorn);

        const mean_rms_r_pitch_1p = getMean(rms_r_pitch_1p);
        const sd_rms_r_pitch_1p = getStDeviation(rms_r_pitch_1p);

        let chartOption = null;
        switch (chartType) {
          case "eChart":
            chartOption = await this.getEChartOptions(session, max_atorn);
            break;
          default:
            console.log("[SERVICE] Chart not supported");
            break;
        }
        // Tempos
        return {
          movement,
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
        };
      }
    }
    return null;
  }

  async getEChartOptions(session: SessionModel, max_atorn: number) {
    // reference -> https://echarts.apache.org/
    return {
      yAxis: {
        boundaryGap: [0, "100%"],
        type: "value",
        max: max_atorn + 0.1 * max_atorn,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisLine: { onZero: true },
      },
    };
  }
})();
