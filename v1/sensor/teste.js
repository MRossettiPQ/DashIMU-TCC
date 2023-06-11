function calculateQuarterionAngle(gyro_measurement_1, gyro_measurement_2) {
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
    return null;
  }

  const q1 = {
    x: gyro_measurement_1.Quaternion_X,
    y: gyro_measurement_1.Quaternion_Y,
    z: gyro_measurement_1.Quaternion_Z,
    w: gyro_measurement_1.Quaternion_W,
  };

  const q2 = {
    x: gyro_measurement_2.Quaternion_X,
    y: gyro_measurement_2.Quaternion_Y,
    z: gyro_measurement_2.Quaternion_Z,
    w: gyro_measurement_2.Quaternion_W,
  };
  // Calcula o produto escalar entre os dois quaternions
  const dotProduct = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

  // O ângulo entre os dois quaternions é o arco cosseno do produto escalar
  const angle = 2 * Math.acos(Math.min(Math.abs(dotProduct), 1));

  // Converte o ângulo para graus
  return angle * (180 / Math.PI);
}

function calculateRollPitchYawAngle(gyro_measurement_1, gyro_measurement_2) {
    if (
      gyro_measurement_1.Roll == null ||
      gyro_measurement_1.Pitch == null ||
      gyro_measurement_1.Yaw == null ||
      gyro_measurement_2.Roll == null ||
      gyro_measurement_2.Pitch == null ||
      gyro_measurement_2.Yaw == null
    ) {
      return null // Verifica se as medições possuem os valores de roll, pitch e yaw
    }
  
    const roll1 = gyro_measurement_1.Roll
    const pitch1 = gyro_measurement_1.Pitch
    const yaw1 = gyro_measurement_1.Yaw
  
    const roll2 = gyro_measurement_2.Roll
    const pitch2 = gyro_measurement_2.Pitch
    const yaw2 = gyro_measurement_2.Yaw
  
    // Calcula a diferença entre os ângulos de roll, pitch e yaw
    const diffRoll = roll2 - roll1
    const diffPitch = pitch2 - pitch1
    const diffYaw = yaw2 - yaw1
  
    // Calcula a magnitude do ângulo resultante
    const angle = Math.sqrt(diffRoll * diffRoll + diffPitch * diffPitch + diffYaw * diffYaw)
    
    // Converte o ângulo para graus
    return angle * (180 / Math.PI);
  }

// Exemplo de uso:
const measurement1 = {
  Roll: 0.5,
  Pitch: 0.8,
  Yaw: 1.2,
  Euler_X: 0.5,
  Euler_Y: 0.8,
  Euler_Z: 1.2,
  Quaternion_X: 0.1,
  Quaternion_Y: 0.2,
  Quaternion_Z: 0.3,
  Quaternion_W: 0.4,
};

const measurement2 = {
  Roll: 0.7,
  Pitch: 0.9,
  Yaw: 1.5,
  Euler_X: 0.7,
  Euler_Y: 0.9,
  Euler_Z: 1.5,
  Quaternion_X: 0.5,
  Quaternion_Y: 0.6,
  Quaternion_Z: 0.7,
  Quaternion_W: 0.8,
};

const result = calculateQuarterionAngle(measurement1, measurement2);
const result1 = calculateRollPitchYawAngle(measurement1, measurement2);
console.log(`O ângulo formado entre os sensores é: ${result} graus.`);
console.log(`O ângulo formado entre os sensores é: ${result1} graus.`);
