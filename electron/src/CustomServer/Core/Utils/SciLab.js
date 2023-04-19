const math = require("mathjs");

function getMean(array) {
  console.log("[SCILAB] Mean Function");
  let total = 0;
  let count = 0;

  for (const row of array) {
    total += row;
    count++;
  }

  return total / count;
}

function getMax(array) {
  console.log("[SCILAB] Max Function");
  return Math.max(...array);
}

function getMin(array) {
  console.log("[SCILAB] Min Function");
  return Math.min(...array);
}

function getIndexMinMax(array, value) {
  console.log("[SCILAB] Index Function");
  return array.indexOf(value);
}

function getSqrt(value) {
  console.log("[SCILAB] Sqrt Function");
  return Math.sqrt(value);
}

function getColumn(array, column) {
  console.log("[SCILAB] Get Column");
  return array.map((obj) => obj[`${column}`]);
}

function getArraySubtract(array, subtractValue) {
  console.log("[SCILAB] Array Subtract");
  return array.map((obj) => obj - subtractValue);
}

function getArrayDivision(array, divisorValue) {
  console.log("[SCILAB] Array Division");
  return array.map((obj) => obj - divisorValue);
}

function getArrayPow(array, pow) {
  console.log("[SCILAB] Array Pow");
  return array.map((obj) => Math.pow(obj, pow));
}

function getArraySqrt(array) {
  console.log("[SCILAB] Array Sqrt");
  return array.map((obj) => Math.sqrt(obj));
}

function getStDeviation(array) {
  console.log("[SCILAB] Standard Deviation");
  return math.std(array);
}

module.exports = { getColumn, getArraySqrt, getArrayPow, getSqrt, getStDeviation, getArraySubtract, getArrayDivision, getIndexMinMax, getMax, getMean, getMin };
