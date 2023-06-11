const math = require('mathjs')

exports.getMean = (array) => {
  // console.log('[SCILAB] Mean Function')
  return math.mean(array)
}

exports.getMax = (array) => {
  // console.log('[SCILAB] Max Function')
  return math.max(array)
}

exports.getMin = (array) => {
  // console.log('[SCILAB] Min Function')
  return math.min(array)
}

exports.getIndexMinMax = (array, value) => {
  // console.log('[SCILAB] Index Function')
  return array.indexOf(value)
}

exports.getSqrt = (value) => {
  // console.log('[SCILAB] Sqrt Function')
  return math.sqrt(value)
}

exports.getColumn = (array, column) => {
  // console.log('[SCILAB] Get Column')
  return array.map((obj) => obj[`${column}`])
}

exports.getArraySubtract = (array, subtractValue) => {
  // console.log('[SCILAB] Array Subtract')
  return array.map((obj) => math.subtract(obj, subtractValue))
}

exports.getArrayDivision = (array, divisorValue) => {
  // console.log('[SCILAB] Array Division')
  return array.map((obj) => math.divide(obj, divisorValue))
}

exports.getArrayMultiply = (array, multiplyValue) => {
  // console.log('[SCILAB] Array Division')
  return array.map((obj) => math.multiply(obj, multiplyValue))
}

exports.getArrayPow = (array, pow) => {
  // console.log('[SCILAB] Array Pow')
  return array.map((obj) => math.pow(obj, pow))
}

exports.getArraySqrt = (array) => {
  // console.log('[SCILAB] Array Sqrt')
  return array.map((obj) => math.sqrt(obj))
}

exports.getStDeviation = (array) => {
  // console.log('[SCILAB] Standard Deviation')
  return math.std(array)
}
