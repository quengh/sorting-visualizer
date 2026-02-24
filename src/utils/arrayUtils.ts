/**
 * Array utilities for sorting algorithms
 */

/**
 * Create a shallow copy of an array (optimized for performance)
 * @param arr - Array to copy
 * @returns Shallow copy of the array
 */
export function shallowCopyArray(arr: number[]): number[] {
  return arr.slice();
}

/**
 * Create a deep copy of an array (for when immutability is required)
 * @param arr - Array to copy
 * @returns Deep copy of the array
 */
export function deepCopyArray(arr: number[]): number[] {
  return [...arr];
}

/**
 * Batch array updates to reduce memory allocations
 * @param baseArray - Base array
 * @param updates - Array of [index, value] pairs
 * @returns New array with updates applied
 */
export function batchArrayUpdates(
  baseArray: number[],
  updates: Array<[number, number]>
): number[] {
  const result = baseArray.slice();
  for (const [index, value] of updates) {
    result[index] = value;
  }
  return result;
}