/**
 * Animation utilities
 */

/**
 * Sleep function for animation delays
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format time in milliseconds to human-readable format
 * @param ms - Time in milliseconds
 * @returns Formatted time string
 */
export function formatTime(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Get algorithm complexity badge color
 * @param complexity - Time complexity string
 * @returns Tailwind color class
 */
export function getComplexityColor(complexity: string): string {
  if (complexity.includes('O(n log n)')) {
    return 'bg-green-500/20 text-green-300';
  }
  if (complexity.includes('O(n²)')) {
    return 'bg-yellow-500/20 text-yellow-300';
  }
  if (complexity.includes('O(n)')) {
    return 'bg-blue-500/20 text-blue-300';
  }
  return 'bg-gray-500/20 text-gray-300';
}

/**
 * Calculate animation speed based on array size and user setting
 * @param arraySize - Size of the array
 * @param speedSetting - User speed setting (1-100)
 * @returns Delay in milliseconds
 */
export function calculateDelay(arraySize: number, speedSetting: number): number {
  // Higher speed setting = lower delay
  // Speed 1 (left) = 500ms (slow), Speed 100 (right) = 5ms (fast)
  const baseDelay = 500 - (speedSetting * 4.95); // 5ms to 500ms

  // Adjust for array size: larger arrays need faster animations
  const sizeFactor = Math.max(1, arraySize / 30);

  return Math.max(2, Math.floor(baseDelay / sizeFactor));
}

/**
 * Clamp a value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a unique ID for animation steps
 * @returns Unique string ID
 */
let stepCounter = 0;
export function generateStepId(): string {
  return `step-${Date.now()}-${stepCounter++}`;
}

/**
 * Check if two arrays are equal
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns True if arrays are equal
 */
export function arraysEqual(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
