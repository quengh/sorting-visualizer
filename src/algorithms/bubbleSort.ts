/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²) average and worst case, O(n) best case (already sorted)
 * Space Complexity: O(1)
 * Stable: Yes
 * In-place: Yes
 */

import type { SortStep } from '../types';

/**
 * Bubble Sort - yields sorting steps for visualization (optimized to reduce array copying)
 * @param arr - Array to sort (will be modified)
 * @returns Async generator of sort steps
 */
export async function* bubbleSort(arr: number[]): AsyncGenerator<SortStep> {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  // Outer loop for each pass
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Inner loop for comparisons
    for (let j = 0; j < n - i - 1; j++) {
      // Yield comparison step (no array copy)
      yield {
        type: 'compare',
        indices: [j, j + 1],
        comparisons: ++comparisons,
        swaps,
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      };

      // Compare and swap if needed
      if (arr[j] > arr[j + 1]) {
        // Yield swap step before swap (no array copy)
        yield {
          type: 'swap',
          indices: [j, j + 1],
          comparisons,
          swaps: ++swaps,
          description: `Swapping ${arr[j]} and ${arr[j + 1]}`,
        };

        // Perform swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        // Yield swap step after swap (with array copy for visual update)
        yield {
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          comparisons,
          swaps,
          description: `After swap: ${arr[j]} and ${arr[j + 1]}`,
        };
      }
    }

    // Mark the last element as sorted (with array copy)
    yield {
      type: 'sorted',
      indices: [n - i - 1],
      array: [...arr],
      comparisons,
      swaps,
      description: `Element at position ${n - i - 1} is now sorted`,
    };

    // If no swaps in this pass, array is sorted
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < n - i; k++) {
        yield {
          type: 'sorted',
          indices: [k],
          comparisons,
          swaps,
          description: `Element at position ${k} is now sorted`,
        };
      }
      break;
    }
  }

  // Mark the first element as sorted (with array copy)
  yield {
    type: 'sorted',
    indices: [0],
    array: [...arr],
    comparisons,
    swaps,
    description: 'First element is now sorted',
  };
}
