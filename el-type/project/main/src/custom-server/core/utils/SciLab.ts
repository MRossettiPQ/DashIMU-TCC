import { std } from 'mathjs';

export function getMean(array: number[]): number {
  console.log('[SCILAB] Mean Function');
  let total = 0;
  let count = 0;

  for (const row of array) {
    total += row;
    count++;
  }

  return total / count;
}

export function getMax(array: number[]): number {
  console.log('[SCILAB] Max Function');
  return Math.max(...array);
}

export function getMin(array: number[]): number {
  console.log('[SCILAB] Min Function');
  return Math.min(...array);
}

export function getIndexMinMax(array: number[], value: number): number {
  console.log('[SCILAB] Index Function');
  return array.indexOf(value);
}

export function getSqrt(value: number): number {
  console.log('[SCILAB] Sqrt Function');
  return Math.sqrt(value);
}

export function getColumn(array: [], column: string): any[] {
  console.log('[SCILAB] Get Column');
  type ColumnKey = keyof typeof array;

  return array.map(obj => {
    const optKey = column as ColumnKey;
    return obj[optKey];
  });
}

export function getArraySubtract(array: number[], subtractValue: number): number[] {
  console.log('[SCILAB] Array Subtract');
  return array.map(obj => obj - subtractValue);
}

export function getArrayDivision(array: number[], divisorValue: number): number[] {
  console.log('[SCILAB] Array Division');
  return array.map(obj => obj - divisorValue);
}

export function getArrayPow(array: number[], pow: number): number[] {
  console.log('[SCILAB] Array Pow');
  return array.map(obj => Math.pow(obj, pow));
}

export function getArraySqrt(array: number[]): number[] {
  console.log('[SCILAB] Array Sqrt');
  return array.map(obj => Math.sqrt(obj));
}

export function getStDeviation(array: number[]): number[] {
  console.log('[SCILAB] Standard Deviation');
  return std(array);
}
