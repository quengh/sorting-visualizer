/**
 * Heap Sort Algorithm
 * Time Complexity: O(n log n) average, worst, and best case
 * Space Complexity: O(1)
 * Stable: No
 * In-place: Yes
 */

import type { SortStep } from '../types';

/**
 * Heap Sort - yields sorting steps for visualization
 * @param arr - Array to sort (will be modified)
 * @returns Async generator of sort steps
 */
export async function* heapSort(arr: number[]): AsyncGenerator<SortStep> {
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  // Helper function to heapify a subtree
  async function* heapify(
    size: number,
    root: number
  ): AsyncGenerator<SortStep> {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    // Compare with left child
    if (left < size) {
      yield {
        type: 'compare',
        indices: [largest, left],
        array: [...arr],
        comparisons: ++comparisons,
        swaps,
        description: `Comparing ${arr[largest]} with left child ${arr[left]}`,
      };

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < size) {
      yield {
        type: 'compare',
        indices: [largest, right],
        array: [...arr],
        comparisons: ++comparisons,
        swaps,
        description: `Comparing ${arr[largest]} with right child ${arr[right]}`,
      };

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    // If largest is not root, swap and heapify
    if (largest !== root) {
      yield {
        type: 'swap',
        indices: [root, largest],
        array: [...arr],
        comparisons,
        swaps: ++swaps,
        description: `Swapping ${arr[root]} with larger child ${arr[largest]}`,
      };

      [arr[root], arr[largest]] = [arr[largest], arr[root]];

      yield {
        type: 'swap',
        indices: [root, largest],
        array: [...arr],
        comparisons,
        swaps,
        description: `After swap: ${arr[root]} at position ${root}`,
      };

      // Recursively heapify the affected subtree
      const heapifyGenerator = heapify(size, largest);
      let result = await heapifyGenerator.next();

      while (!result.done) {
        yield result.value;
        result = await heapifyGenerator.next();
      }
    }
  }

  // Build max heap
  yield {
    type: 'highlight',
    indices: Array.from({ length: n }, (_, i) => i),
    array: [...arr],
    comparisons,
    swaps,
    description: 'Building max heap...',
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    const heapifyGenerator = heapify(n, i);
    let result = await heapifyGenerator.next();

    while (!result.done) {
      yield result.value;
      result = await heapifyGenerator.next();
    }
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    yield {
      type: 'swap',
      indices: [0, i],
      array: [...arr],
      comparisons,
      swaps: ++swaps,
      description: `Moving root ${arr[0]} to position ${i}`,
    };

    [arr[0], arr[i]] = [arr[i], arr[0]];

    yield {
      type: 'swap',
      indices: [0, i],
      array: [...arr],
      comparisons,
      swaps,
      description: `After swap: ${arr[i]} is now at sorted position`,
    };

    // Mark as sorted
    yield {
      type: 'sorted',
      indices: [i],
      array: [...arr],
      comparisons,
      swaps,
      description: `Element ${arr[i]} at position ${i} is now sorted`,
    };

    // Heapify the reduced heap
    const heapifyGenerator = heapify(i, 0);
    let result = await heapifyGenerator.next();

    while (!result.done) {
      yield result.value;
      result = await heapifyGenerator.next();
    }
  }

  // Mark first element as sorted
  yield {
    type: 'sorted',
    indices: [0],
    array: [...arr],
    comparisons,
    swaps,
    description: `First element ${arr[0]} is now sorted`,
  };

  // Mark all elements as sorted
  yield {
    type: 'sorted',
    indices: Array.from({ length: n }, (_, i) => i),
    array: [...arr],
    comparisons,
    swaps,
    description: 'Array is fully sorted',
  };
}
