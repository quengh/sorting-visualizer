/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) for recursion stack
 * Stable: No
 * In-place: Yes
 */

import type { SortStep } from '../types';

/**
 * Quick Sort - yields sorting steps for visualization (optimized to reduce array copying)
 * @param arr - Array to sort (will be modified)
 * @returns Async generator of sort steps
 */
export async function* quickSort(arr: number[]): AsyncGenerator<SortStep> {
  let comparisons = 0;
  let swaps = 0;

  // Helper function for recursive quick sort
  async function* quickSortHelper(
    low: number,
    high: number
  ): AsyncGenerator<SortStep> {
    if (low < high) {
      // Partition and get pivot index
      const pivotGenerator = partition(low, high);
      let pivotResult = await pivotGenerator.next();

      while (!pivotResult.done) {
        yield pivotResult.value;
        pivotResult = await pivotGenerator.next();
      }

      const pivotIndex = pivotResult.value;

      // Recursively sort left and right partitions
      const leftGenerator = quickSortHelper(low, pivotIndex - 1);
      let leftResult = await leftGenerator.next();

      while (!leftResult.done) {
        yield leftResult.value;
        leftResult = await leftGenerator.next();
      }

      const rightGenerator = quickSortHelper(pivotIndex + 1, high);
      let rightResult = await rightGenerator.next();

      while (!rightResult.done) {
        yield rightResult.value;
        rightResult = await rightGenerator.next();
      }
    }
  }

  // Partition function
  async function* partition(low: number, high: number): AsyncGenerator<SortStep, number> {
    const pivot = arr[high];
    let i = low - 1;

    // Mark pivot (with array copy for initial display)
    yield {
      type: 'pivot',
      indices: [high],
      array: [...arr],
      comparisons,
      swaps,
      description: `Pivot selected: ${pivot} at position ${high}`,
    };

    // Compare elements with pivot
    for (let j = low; j < high; j++) {
      // Yield comparison (no array copy)
      yield {
        type: 'compare',
        indices: [j, high],
        comparisons: ++comparisons,
        swaps,
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
      };

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          // Yield before swap (no array copy)
          yield {
            type: 'swap',
            indices: [i, j],
            comparisons,
            swaps: ++swaps,
            description: `Swapping ${arr[i]} and ${arr[j]}`,
          };

          [arr[i], arr[j]] = [arr[j], arr[i]];

          // Yield after swap (with array copy)
          yield {
            type: 'swap',
            indices: [i, j],
            array: [...arr],
            comparisons,
            swaps,
            description: `After swap: ${arr[i]} and ${arr[j]} swapped`,
          };
        }
      }
    }

    // Place pivot in correct position
    yield {
      type: 'swap',
      indices: [i + 1, high],
      comparisons,
      swaps: ++swaps,
      description: `Placing pivot ${pivot} at position ${i + 1}`,
    };

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    // Yield after pivot placement (with array copy)
    yield {
      type: 'swap',
      indices: [i + 1, high],
      array: [...arr],
      comparisons,
      swaps,
      description: `Pivot ${pivot} now at position ${i + 1}`,
    };

    // Mark pivot as sorted (with array copy)
    yield {
      type: 'sorted',
      indices: [i + 1],
      array: [...arr],
      comparisons,
      swaps,
      description: `Pivot ${arr[i + 1]} is now in correct position`,
    };

    return i + 1;
  }

  // Start quick sort
  const mainGenerator = quickSortHelper(0, arr.length - 1);
  let result = await mainGenerator.next();

  while (!result.done) {
    yield result.value;
    result = await mainGenerator.next();
  }

  // Mark all elements as sorted (with array copy)
  yield {
    type: 'sorted',
    indices: Array.from({ length: arr.length }, (_, i) => i),
    array: [...arr],
    comparisons,
    swaps,
    description: 'Array is fully sorted',
  };
}
