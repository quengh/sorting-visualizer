/**
 * useSorting Hook
 * Manages sorting state and execution
 */

import { useState, useCallback, useRef } from 'react';
import type { SortState, SortStep, SortingAlgorithm, ArrayType } from '../types';
import { getSortFunction } from '../algorithms';
import { calculateDelay } from '../utils/animation';
import { generateRandomArray, generateNearlySortedArray, generateReversedArray, generateArrayWithDuplicates } from '../utils/generator';

interface UseSortingReturn {
  state: SortState;
  generateArray: (size: number, arrayType?: ArrayType) => void;
  startSorting: () => Promise<void>;
  pauseSorting: () => void;
  resumeSorting: () => void;
  resetSorting: () => void;
  setAlgorithm: (algorithm: SortingAlgorithm) => void;
  setSpeed: (speed: number) => void;
  isSorting: boolean;
}

export function useSorting(): UseSortingReturn {
  const [state, setState] = useState<SortState>({
    array: [],
    algorithm: 'bubble',
    status: 'idle',
    speed: 50,
    stats: {
      comparisons: 0,
      swaps: 0,
    },
    highlightedIndices: [],
    sortedIndices: [],
    isSwapping: false,
  });

  const [isSorting, setIsSorting] = useState(false);
  const abortRef = useRef<boolean>(false);
  const pauseRef = useRef<boolean>(false);
  const speedRef = useRef<number>(50);
  const arrayRef = useRef<number[]>([]);
  const algorithmRef = useRef<SortingAlgorithm>('bubble');

  // Process a single sorting step (defined before startSorting to avoid hoisting issues)
  const processStep = useCallback(async (step: SortStep) => {
    const delay = calculateDelay(arrayRef.current.length, speedRef.current);

    setState((prev) => {
      const updates: Partial<SortState> = {
        array: step.array,
        stats: {
          comparisons: step.comparisons ?? prev.stats.comparisons,
          swaps: step.swaps ?? prev.stats.swaps,
          startTime: prev.stats.startTime,
        },
      };

      // Handle different step types
      switch (step.type) {
        case 'compare':
          updates.highlightedIndices = step.indices;
          updates.isSwapping = false;
          break;

        case 'swap':
          updates.highlightedIndices = step.indices;
          updates.isSwapping = true;
          break;

        case 'pivot':
          updates.pivotIndex = step.indices[0];
          updates.highlightedIndices = step.indices;
          break;

        case 'highlight':
          updates.highlightedIndices = step.indices;
          updates.currentMinIndex = step.indices[0];
          break;

        case 'sorted':
          updates.sortedIndices = Array.from(
            new Set([...prev.sortedIndices, ...step.indices])
          );
          updates.highlightedIndices = [];
          updates.pivotIndex = undefined;
          updates.currentMinIndex = undefined;
          updates.isSwapping = false;
          break;
      }

      return { ...prev, ...updates };
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
  }, []);

  // Generate array based on type
  const generateArray = useCallback((size: number, arrayType: ArrayType = 'random') => {
    if (size < 1) {
      throw new Error('Array size must be at least 1');
    }

    if (size > 100) {
      throw new Error('Array size cannot exceed 100');
    }

    let arr: number[] = [];
    
    switch (arrayType) {
      case 'nearly-sorted':
        arr = generateNearlySortedArray(size);
        break;
      case 'reversed':
        arr = generateReversedArray(size);
        break;
      case 'duplicates':
        arr = generateArrayWithDuplicates(size);
        break;
      default:
        arr = generateRandomArray(size);
    }

    setState((prev) => ({
      ...prev,
      array: arr,
      status: 'idle',
      stats: {
        comparisons: 0,
        swaps: 0,
      },
      highlightedIndices: [],
      sortedIndices: [],
      pivotIndex: undefined,
      currentMinIndex: undefined,
    }));
  }, []);

  // Start sorting
  const startSorting = useCallback(async () => {
    if (state.array.length === 0) {
      throw new Error('Array is empty. Please generate an array first.');
    }

    if (state.array.length === 1) {
      throw new Error('Array has only one element. Already sorted.');
    }

    // If already paused, just resume
    if (pauseRef.current) {
      pauseRef.current = false;
      setState((prev) => ({
        ...prev,
        status: 'running',
      }));
      return;
    }

    // Initialize refs for this sorting session
    arrayRef.current = [...state.array];
    algorithmRef.current = state.algorithm;
    speedRef.current = state.speed;
    abortRef.current = false;
    pauseRef.current = false;

    setState((prev) => ({
      ...prev,
      status: 'running',
      stats: {
        comparisons: 0,
        swaps: 0,
        startTime: Date.now(),
      },
      highlightedIndices: [],
      sortedIndices: [],
      pivotIndex: undefined,
      currentMinIndex: undefined,
    }));

    setIsSorting(true);

    try {
      const sortFunction = getSortFunction(algorithmRef.current);
      const generator = sortFunction(arrayRef.current);

      for await (const step of generator) {
        // Check if aborted
        if (abortRef.current) {
          break;
        }

        // Check if paused
        while (pauseRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          if (abortRef.current) break;
        }

        // Process step
        await processStep(step);
      }

      // Mark as completed if not aborted
      if (!abortRef.current) {
        setState((prev) => ({
          ...prev,
          status: 'completed',
          sortedIndices: Array.from({ length: arrayRef.current.length }, (_, i) => i),
          stats: {
            ...prev.stats,
            endTime: Date.now(),
            elapsedTime: prev.stats.startTime
              ? Date.now() - prev.stats.startTime
              : 0,
          },
        }));
      }
    } catch (error) {
      console.error('Sorting error:', error);
      setState((prev) => ({
        ...prev,
        status: 'idle',
      }));
      throw error; // Re-throw to allow caller to handle
    } finally {
      setIsSorting(false);
    }
  }, [state.array, state.algorithm, state.speed, processStep]);



  // Pause sorting
  const pauseSorting = useCallback(() => {
    pauseRef.current = true;
    setState((prev) => ({
      ...prev,
      status: 'paused',
    }));
  }, []);

  // Resume sorting (only works if already paused)
  const resumeSorting = useCallback(() => {
    if (pauseRef.current) {
      pauseRef.current = false;
      setState((prev) => ({
        ...prev,
        status: 'running',
      }));
    }
  }, []);

  // Reset sorting
  const resetSorting = useCallback(() => {
    abortRef.current = true;
    pauseRef.current = false;

    setState((prev) => ({
      ...prev,
      status: 'idle',
      stats: {
        comparisons: 0,
        swaps: 0,
      },
      highlightedIndices: [],
      sortedIndices: [],
      pivotIndex: undefined,
      currentMinIndex: undefined,
      isSwapping: false,
    }));

    setIsSorting(false);
  }, []);

  // Set algorithm
  const setAlgorithm = useCallback((algorithm: SortingAlgorithm) => {
    setState((prev) => ({
      ...prev,
      algorithm,
    }));
  }, []);

  // Set speed
  const setSpeed = useCallback((speed: number) => {
    speedRef.current = speed;
    setState((prev) => ({
      ...prev,
      speed,
    }));
  }, []);

  return {
    state,
    generateArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetSorting,
    setAlgorithm,
    setSpeed,
    isSorting,
  };
}
