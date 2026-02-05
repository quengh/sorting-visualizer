/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²) average and worst case, O(n) best case (already sorted)
 * Space Complexity: O(1)
 * Stable: Yes
 * In-place: Yes
 */

import type { SortStep } from '../types';

/**
 * Insertion Sort - yields sorting steps for visualization
 * @param arr - Array to sort (will be modified)
 * @returns Async generator of sort steps
 */
export async function* insertionSort(arr: number[]): AsyncGenerator<SortStep> {
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  // Mark first element as sorted
  yield {
    type: 'sorted',
    indices: [0],
    array: [...arr],
    comparisons,
    swaps,
    description: `First element ${arr[0]} is already sorted`,
  };

  // Start from second element
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Yield selection of key
    yield {
      type: 'highlight',
      indices: [i],
      array: [...arr],
      comparisons,
      swaps,
      description: `Selecting ${key} to insert into sorted portion`,
    };

    // Move elements that are greater than key
    while (j >= 0) {
      // Yield comparison
      yield {
        type: 'compare',
        indices: [j, j + 1],
        array: [...arr],
        comparisons: ++comparisons,
        swaps,
        description: `Comparing ${arr[j]} with ${key}`,
      };

      if (arr[j] > key) {
        // Yield shift
        yield {
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          comparisons,
          swaps: ++swaps,
          description: `Shifting ${arr[j]} to the right`,
        };

        arr[j + 1] = arr[j];

        yield {
          type: 'swap',
          indices: [j, j + 1],
          array: [...arr],
          comparisons,
          swaps,
          description: `After shift: ${arr[j + 1]} moved to position ${j + 1}`,
        };

        j--;
      } else {
        // Found correct position
        break;
      }
    }

    // Insert key at correct position
    arr[j + 1] = key;

    yield {
      type: 'swap',
      indices: [j + 1],
      array: [...arr],
      comparisons,
      swaps: ++swaps,
      description: `Inserted ${key} at position ${j + 1}`,
    };

    // Mark sorted portion
    const sortedIndices: number[] = [];
    for (let k = 0; k <= i; k++) {
      sortedIndices.push(k);
    }

    yield {
      type: 'sorted',
      indices: sortedIndices,
      array: [...arr],
      comparisons,
      swaps,
      description: `Elements 0 to ${i} are now sorted`,
    };
  }
}
