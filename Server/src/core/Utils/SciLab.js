exports.getMean = (array) => {
  console.log('[SCILAB] Mean Function')
  let total = 0
  let count = 0

  for (const row in array) {
    total += row
    count++
  }

  return total / count
}

exports.getMax = (array) => {
  console.log('[SCILAB] Max Function')
  return Math.max(...array)
}

exports.getMin = (array) => {
  console.log('[SCILAB] Min Function')
  return Math.max(...array)
}

exports.getSqrt = (value) => {
  console.log('[SCILAB] Sqrt Function')
  return Math.sqrt()
}

exports.getColumn = (array, column) => {
  console.log('[SCILAB] Sqrt Function')
  return array.map((obj) => obj[`${column}`])
}

exports.getArraySubtract = (array, subtractValue) => {
  console.log('[SCILAB] Sqrt Function')
  return array.map((obj) => obj - subtractValue)
}

exports.getStDeviation = (array) => {
  console.log('[SCILAB] Sqrt Function')
  return Math.pow()
}
