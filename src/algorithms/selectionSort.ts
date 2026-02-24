/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²) average, worst, and best case
 * Space Complexity: O(1)
 * Stable: No
 * In-place: Yes
 */

import type { SortStep } from '../types';

/**
 * Selection Sort - yields sorting steps for visualization (optimized to reduce array copying)
 * @param arr - Array to sort (will be modified)
 * @returns Async generator of sort steps
 */
export async function* selectionSort(arr: number[]): AsyncGenerator<SortStep> {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  // Outer loop for each position
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Yield initial minimum (no array copy)
    yield {
      type: 'highlight',
      indices: [i],
      comparisons,
      swaps,
      description: `Finding minimum from position ${i}`,
    };

    // Inner loop to find minimum
    for (let j = i + 1; j < n; j++) {
      // Yield comparison step (no array copy)
      yield {
        type: 'compare',
        indices: [minIndex, j],
        comparisons: ++comparisons,
        swaps,
        description: `Comparing ${arr[minIndex]} with ${arr[j]}`,
      };

      // Update minimum if found
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        yield {
          type: 'highlight',
          indices: [minIndex],
          comparisons,
          swaps,
          description: `New minimum found: ${arr[minIndex]} at position ${minIndex}`,
        };
      }
    }

    // Swap minimum with current position
    if (minIndex !== i) {
      yield {
        type: 'swap',
        indices: [i, minIndex],
        comparisons,
        swaps: ++swaps,
        description: `Swapping ${arr[i]} with minimum ${arr[minIndex]}`,
      };

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      // Yield after swap with array copy
      yield {
        type: 'swap',
        indices: [i, minIndex],
        array: [...arr],
        comparisons,
        swaps,
        description: `After swap: ${arr[i]} is now in position ${i}`,
      };
    }

    // Mark position i as sorted (with array copy)
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      comparisons,
      swaps,
      description: `Position ${i} is now sorted with value ${arr[i]}`,
    };
  }

  // Mark the last element as sorted (with array copy)
  yield {
    type: 'sorted',
    indices: [n - 1],
    array: [...arr],
    comparisons,
    swaps,
    description: `Last element ${arr[n - 1]} is now sorted`,
  };
}
