/**
 * Array generation utilities
 */

/**
 * Generate a random array of given size
 * @param size - Number of elements
 * @param min - Minimum value (default: 5)
 * @param max - Maximum value (default: 100)
 * @returns Array of random numbers
 */
export function generateRandomArray(size: number, min: number = 5, max: number = 100): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

/**
 * Generate a nearly sorted array
 * @param size - Number of elements
 * @returns Array that is mostly sorted
 */
export function generateNearlySortedArray(size: number): number[] {
  const arr = generateRandomArray(size);
  arr.sort((a, b) => a - b);

  // Swap a few random elements
  const swaps = Math.max(1, Math.floor(size * 0.1));
  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  return arr;
}

/**
 * Generate a reversed array
 * @param size - Number of elements
 * @returns Reversed array
 */
export function generateReversedArray(size: number): number[] {
  const arr = generateRandomArray(size);
  return arr.sort((a, b) => b - a);
}

/**
 * Generate an array with duplicates
 * @param size - Number of elements
 * @param uniqueValues - Number of unique values
 * @returns Array with duplicates
 */
export function generateArrayWithDuplicates(size: number, uniqueValues: number = 10): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * uniqueValues) + 1);
  }
  return arr;
}

/**
 * Generate a custom array pattern
 * @param size - Number of elements
 * @param pattern - Pattern type
 * @returns Array following the pattern
 */
export function generatePatternedArray(size: number, pattern: 'random' | 'nearly-sorted' | 'reversed' | 'duplicates' = 'random'): number[] {
  switch (pattern) {
    case 'nearly-sorted':
      return generateNearlySortedArray(size);
    case 'reversed':
      return generateReversedArray(size);
    case 'duplicates':
      return generateArrayWithDuplicates(size);
    default:
      return generateRandomArray(size);
  }
}
