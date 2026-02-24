/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n) average, worst, and best case
 * Space Complexity: O(n) for auxiliary array
 * Stable: Yes
 * In-place: No
 */

import type { SortStep } from '../types';

/**
 * Merge Sort - yields sorting steps for visualization (optimized to reduce array copying)
 * @param arr - Array to sort (will be modified)
 * @returns Async generator of sort steps
 */
export async function* mergeSort(arr: number[]): AsyncGenerator<SortStep> {
  let comparisons = 0;
  let swaps = 0;

  // Helper function for recursive merge sort
  async function* mergeSortHelper(
    left: number,
    right: number
  ): AsyncGenerator<SortStep> {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      // Sort left half
      const leftGenerator = mergeSortHelper(left, mid);
      let leftResult = await leftGenerator.next();

      while (!leftResult.done) {
        yield leftResult.value;
        leftResult = await leftGenerator.next();
      }

      // Sort right half
      const rightGenerator = mergeSortHelper(mid + 1, right);
      let rightResult = await rightGenerator.next();

      while (!rightResult.done) {
        yield rightResult.value;
        rightResult = await rightGenerator.next();
      }

      // Merge sorted halves
      const mergeGenerator = merge(left, mid, right);
      let mergeResult = await mergeGenerator.next();

      while (!mergeResult.done) {
        yield mergeResult.value;
        mergeResult = await mergeGenerator.next();
      }
    }
  }

  // Merge function
  async function* merge(
    left: number,
    mid: number,
    right: number
  ): AsyncGenerator<SortStep> {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0; // Index for left array
    let j = 0; // Index for right array
    let k = left; // Index for merged array

    // Show merge range (with array copy for initial display)
    yield {
      type: 'highlight',
      indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      array: [...arr],
      comparisons,
      swaps,
      description: `Merging range [${left}, ${right}]`,
    };

    // Merge elements
    while (i < leftArr.length && j < rightArr.length) {
      // Compare elements (no array copy)
      yield {
        type: 'compare',
        indices: [left + i, mid + 1 + j],
        comparisons: ++comparisons,
        swaps,
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
      };

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        // Yield after placement (with array copy)
        yield {
          type: 'swap',
          indices: [k],
          array: [...arr],
          comparisons,
          swaps: ++swaps,
          description: `Placing ${leftArr[i]} at position ${k}`,
        };
        i++;
      } else {
        arr[k] = rightArr[j];
        // Yield after placement (with array copy)
        yield {
          type: 'swap',
          indices: [k],
          array: [...arr],
          comparisons,
          swaps: ++swaps,
          description: `Placing ${rightArr[j]} at position ${k}`,
        };
        j++;
      }
      k++;
    }

    // Copy remaining elements from left array
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      // Yield after placement (with array copy)
      yield {
        type: 'swap',
        indices: [k],
        array: [...arr],
        comparisons,
        swaps: ++swaps,
        description: `Placing ${leftArr[i]} at position ${k}`,
      };
      i++;
      k++;
    }

    // Copy remaining elements from right array
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      // Yield after placement (with array copy)
      yield {
        type: 'swap',
        indices: [k],
        array: [...arr],
        comparisons,
        swaps: ++swaps,
        description: `Placing ${rightArr[j]} at position ${k}`,
      };
      j++;
      k++;
    }

    // Mark merged range as sorted (with array copy)
    const sortedIndices: number[] = [];
    for (let idx = left; idx <= right; idx++) {
      sortedIndices.push(idx);
    }

    yield {
      type: 'sorted',
      indices: sortedIndices,
      array: [...arr],
      comparisons,
      swaps,
      description: `Range [${left}, ${right}] is now sorted`,
    };
  }

  // Start merge sort
  const mainGenerator = mergeSortHelper(0, arr.length - 1);
  let result = await mainGenerator.next();

  while (!result.done) {
    yield result.value;
    result = await mainGenerator.next();
  }
}
