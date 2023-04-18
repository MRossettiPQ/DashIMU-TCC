const math = require('mathjs')

exports.getMean = (array) => {
  console.log('[SCILAB] Mean Function')
  let total = 0
  let count = 0

  for (const row of array) {
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
  return Math.min(...array)
}

exports.getIndexMinMax = (array, value) => {
  console.log('[SCILAB] Index Function')
  return array.indexOf(value)
}

exports.getSqrt = (value) => {
  console.log('[SCILAB] Sqrt Function')
  return Math.sqrt(value)
}

exports.getColumn = (array, column) => {
  console.log('[SCILAB] Get Column')
  return array.map((obj) => obj[`${column}`])
}

exports.getArraySubtract = (array, subtractValue) => {
  console.log('[SCILAB] Array Subtract')
  return array.map((obj) => obj - subtractValue)
}

exports.getArrayDivision = (array, divisorValue) => {
  console.log('[SCILAB] Array Division')
  return array.map((obj) => obj - divisorValue)
}

exports.getArrayPow = (array, pow) => {
  console.log('[SCILAB] Array Pow')
  return array.map((obj) => Math.pow(obj, pow))
}

exports.getArraySqrt = (array) => {
  console.log('[SCILAB] Array Sqrt')
  return array.map((obj) => Math.sqrt(obj))
}

exports.getStDeviation = (array) => {
  console.log('[SCILAB] Standard Deviation')
  return math.std(array)
}
