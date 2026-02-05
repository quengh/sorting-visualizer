/**
 * Sorting Algorithm Types
 */

export type SortingAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quick' | 'merge' | 'heap';

export type ArrayType = 'random' | 'nearly-sorted' | 'reversed' | 'duplicates';

export type SortStatus = 'idle' | 'running' | 'paused' | 'completed';

export type StepType = 'compare' | 'swap' | 'pivot' | 'sorted' | 'highlight';

/**
 * Step in the sorting process
 */
export interface SortStep {
  type: StepType;
  indices: number[];
  array: number[];
  comparisons?: number;
  swaps?: number;
  description?: string;
}

/**
 * Algorithm information
 */
export interface AlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
  useCases: string[];
  advantages: string[];
  disadvantages: string[];
}

/**
 * Sorting state
 */
export interface SortState {
  array: number[];
  algorithm: SortingAlgorithm;
  status: SortStatus;
  speed: number; // Animation delay in ms
  stats: {
    comparisons: number;
    swaps: number;
    startTime?: number;
    endTime?: number;
    elapsedTime?: number;
  };
  highlightedIndices: number[];
  sortedIndices: number[];
  pivotIndex?: number;
  currentMinIndex?: number;
  isSwapping: boolean;
}

/**
 * Color mapping for visualization
 */
export type BarColor =
  | 'default'      // Blue - default state
  | 'comparing'    // Yellow - comparing
  | 'swapping'     // Red - swapping
  | 'sorted'       // Green - sorted
  | 'pivot'        // Purple - pivot element
  | 'min'          // Orange - current minimum
  | 'max';         // Orange - current maximum

export interface ColorMapping {
  default: string;
  comparing: string;
  swapping: string;
  sorted: string;
  pivot: string;
  min: string;
  max: string;
}
