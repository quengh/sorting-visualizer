/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²) average, worst, and best case
 * Space Complexity: O(1)
 * Stable: No
 * In-place: Yes
 */

import type { SortStep } from '../types';

/**
 * Selection Sort - yields sorting steps for visualization
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

    // Yield initial minimum
    yield {
      type: 'highlight',
      indices: [i],
      array: [...arr],
      comparisons,
      swaps,
      description: `Finding minimum from position ${i}`,
    };

    // Inner loop to find minimum
    for (let j = i + 1; j < n; j++) {
      // Yield comparison step
      yield {
        type: 'compare',
        indices: [minIndex, j],
        array: [...arr],
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
          array: [...arr],
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
        array: [...arr],
        comparisons,
        swaps: ++swaps,
        description: `Swapping ${arr[i]} with minimum ${arr[minIndex]}`,
      };

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      yield {
        type: 'swap',
        indices: [i, minIndex],
        array: [...arr],
        comparisons,
        swaps,
        description: `After swap: ${arr[i]} is now in position ${i}`,
      };
    }

    // Mark position i as sorted
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      comparisons,
      swaps,
      description: `Position ${i} is now sorted with value ${arr[i]}`,
    };
  }

  // Mark the last element as sorted
  yield {
    type: 'sorted',
    indices: [n - 1],
    array: [...arr],
    comparisons,
    swaps,
    description: `Last element ${arr[n - 1]} is now sorted`,
  };
}
