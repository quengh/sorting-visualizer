/**
 * Export all sorting algorithms
 */

export { bubbleSort } from './bubbleSort';
export { selectionSort } from './selectionSort';
export { insertionSort } from './insertionSort';
export { quickSort } from './quickSort';
export { mergeSort } from './mergeSort';
export { heapSort } from './heapSort';

import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { quickSort } from './quickSort';
import { mergeSort } from './mergeSort';
import { heapSort } from './heapSort';
import type { AlgorithmInfo, SortingAlgorithm } from '../types';

/**
 * Algorithm information mapping
 */
export const ALGORITHM_INFO: Record<SortingAlgorithm, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    description: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    useCases: [
      'Educational purposes',
      'Small datasets',
      'Nearly sorted data',
      'When simplicity is preferred over efficiency',
    ],
    advantages: [
      'Simple to understand and implement',
      'Stable sorting algorithm',
      'In-place sorting (no extra memory)',
      'Detects already sorted arrays in O(n) time',
    ],
    disadvantages: [
      'Very inefficient for large datasets',
      'Many swaps required',
      'Not suitable for real-world applications',
    ],
  },
  selection: {
    name: 'Selection Sort',
    description: 'Selection Sort divides the input into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    useCases: [
      'Small datasets',
      'When memory writes are expensive',
      'When you need guaranteed O(n²) performance',
    ],
    advantages: [
      'Simple implementation',
      'Minimal swaps (at most n-1 swaps)',
      'In-place sorting',
      'Performance independent of input data',
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'Not stable',
      'Always O(n²) even for sorted data',
    ],
  },
  insertion: {
    name: 'Insertion Sort',
    description: 'Insertion Sort builds the sorted array one element at a time. It takes each element from the input and inserts it into its correct position in the sorted portion.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    useCases: [
      'Small datasets',
      'Nearly sorted data',
      'Online sorting (streaming data)',
      'When stability is required',
    ],
    advantages: [
      'Simple implementation',
      'Efficient for small datasets',
      'Stable and in-place',
      'Adaptive - O(n) for nearly sorted data',
      'Online algorithm - can sort as data arrives',
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'Many shifts required',
      'Not suitable for large arrays',
    ],
  },
  quick: {
    name: 'Quick Sort',
    description: 'Quick Sort is a divide-and-conquer algorithm. It picks a pivot element, partitions the array around the pivot, and recursively sorts the sub-arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    useCases: [
      'General-purpose sorting',
      'Large datasets',
      'When average performance matters',
      'In-memory sorting',
    ],
    advantages: [
      'Very fast in practice',
      'In-place sorting',
      'Cache-friendly',
      'Widely used in standard libraries',
    ],
    disadvantages: [
      'Not stable',
      'Worst case O(n²) with bad pivots',
      'Recursive - uses stack space',
      'Not suitable for linked lists',
    ],
  },
  merge: {
    name: 'Merge Sort',
    description: 'Merge Sort is a divide-and-conquer algorithm. It recursively splits the array into halves, sorts each half, and then merges the sorted halves back together.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    useCases: [
      'Large datasets',
      'When stable sorting is required',
      'External sorting (disk-based)',
      'Linked lists',
    ],
    advantages: [
      'Consistent O(n log n) performance',
      'Stable sorting',
      'Predictable performance',
      'Good for external sorting',
    ],
    disadvantages: [
      'Requires O(n) extra space',
      'Not in-place',
      'Slower than quick sort for small arrays',
      'More complex implementation',
    ],
  },
  heap: {
    name: 'Heap Sort',
    description: 'Heap Sort uses a binary heap data structure. It first builds a max heap from the input, then repeatedly extracts the maximum element and rebuilds the heap.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    useCases: [
      'When worst-case O(n log n) is required',
      'Real-time systems',
      'Embedded systems with limited memory',
      'When you need guaranteed performance',
    ],
    advantages: [
      'Guaranteed O(n log n) performance',
      'In-place sorting',
      'No worst-case scenario like quick sort',
      'Good for embedded systems',
    ],
    disadvantages: [
      'Not stable',
      'Slower than quick sort in practice',
      'Poor cache performance',
      'Not adaptive',
    ],
  },
};

/**
 * Get sorting function for algorithm
 */
export function getSortFunction(algorithm: SortingAlgorithm) {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort;
    case 'selection':
      return selectionSort;
    case 'insertion':
      return insertionSort;
    case 'quick':
      return quickSort;
    case 'merge':
      return mergeSort;
    case 'heap':
      return heapSort;
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`);
  }
}
