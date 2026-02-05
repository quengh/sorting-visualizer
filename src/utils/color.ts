/**
 * Color utilities for visualization
 */

import type { ColorMapping, BarColor } from '../types';

/**
 * Color mapping for different bar states
 * Note: These classes are explicitly used to ensure Tailwind includes them
 */
export const COLOR_MAP: ColorMapping = {
  default: 'bg-blue-500',      // Blue - default state
  comparing: 'bg-yellow-400',  // Yellow - comparing
  swapping: 'bg-red-500',      // Red - swapping
  sorted: 'bg-green-500',      // Green - sorted
  pivot: 'bg-purple-500',      // Purple - pivot element
  min: 'bg-orange-400',        // Orange - current minimum
  max: 'bg-orange-400',        // Orange - current maximum
};

/**
 * Get color state for a bar based on its state
 * @param index - Index of the bar
 * @param state - Current sort state
 * @returns BarColor state key
 */
export function getBarColor(
  index: number,
  state: {
    highlightedIndices: number[];
    sortedIndices: number[];
    pivotIndex?: number;
    currentMinIndex?: number;
    isSwapping: boolean;
  }
): BarColor {
  const { highlightedIndices, sortedIndices, pivotIndex, currentMinIndex, isSwapping } = state;

  // Check if sorted (highest priority for completed bars)
  if (sortedIndices.includes(index)) {
    return 'sorted';
  }

  // Check if swapping
  if (isSwapping && highlightedIndices.includes(index)) {
    return 'swapping';
  }

  // Check if pivot
  if (pivotIndex === index) {
    return 'pivot';
  }

  // Check if current minimum
  if (currentMinIndex === index) {
    return 'min';
  }

  // Check if highlighted (comparing)
  if (highlightedIndices.includes(index)) {
    return 'comparing';
  }

  // Default color
  return 'default';
}

/**
 * Get color description for legend
 * @param language - Language code ('zh' or 'en')
 * @returns Array of color descriptions
 */
export function getColorLegend(language: 'zh' | 'en' = 'en') {
  const labels: Record<string, { zh: string; en: string }> = {
    default: { zh: '正常', en: 'Default' },
    comparing: { zh: '比较中', en: 'Comparing' },
    swapping: { zh: '交换中', en: 'Swapping' },
    sorted: { zh: '已排序', en: 'Sorted' },
    pivot: { zh: '基准值', en: 'Pivot' },
    min: { zh: '当前最小/最大', en: 'Current Min/Max' },
  };
  
  return [
    { color: COLOR_MAP.default, label: labels.default[language] },
    { color: COLOR_MAP.comparing, label: labels.comparing[language] },
    { color: COLOR_MAP.swapping, label: labels.swapping[language] },
    { color: COLOR_MAP.sorted, label: labels.sorted[language] },
    { color: COLOR_MAP.pivot, label: labels.pivot[language] },
    { color: COLOR_MAP.min, label: labels.min[language] },
  ];
}

/**
 * Get RGB color value for a bar
 * @param colorState - Color state key
 * @returns RGB string
 */
export function getColorValue(colorState: BarColor): string {
  const colorMap: Record<BarColor, string> = {
    default: 'rgb(59, 130, 246)',
    comparing: 'rgb(250, 204, 21)',
    swapping: 'rgb(239, 68, 68)',
    sorted: 'rgb(34, 197, 94)',
    pivot: 'rgb(168, 85, 247)',
    min: 'rgb(251, 146, 60)',
    max: 'rgb(251, 146, 60)',
  };
  return colorMap[colorState] || 'rgb(59, 130, 246)';
}

/**
 * Get appropriate text color for bar background
 * @param colorState - Color state key
 * @returns Tailwind text color class
 */
export function getTextColorForBar(colorState: BarColor): string {
  // Dark backgrounds → white text
  // Light backgrounds → black text
  const textMap: Record<BarColor, string> = {
    default: 'text-white',
    swapping: 'text-white',
    pivot: 'text-white',
    comparing: 'text-black',
    sorted: 'text-white',
    min: 'text-black',
    max: 'text-black',
  };
  return textMap[colorState] || 'text-white';
}

/**
 * Get status description for display
 * @param status - Current sort status
 * @returns Human-readable status description
 */
export function getStatusDescription(status: string): string {
  const descriptions: Record<string, string> = {
    idle: '点击开始排序',
    running: '正在执行算法...',
    paused: '已暂停',
    completed: '排序完成！',
  };
  return descriptions[status] || '就绪';
}

/**
 * Get algorithm display name with icon
 * @param algorithm - Algorithm name
 * @returns Display name with icon
 */
export function getAlgorithmDisplayName(algorithm: string): string {
  const icons: Record<string, string> = {
    bubble: '🫧',
    selection: '🎯',
    insertion: '📌',
    quick: '⚡',
    merge: '🔀',
    heap: '🏔️',
  };
  const names: Record<string, string> = {
    bubble: '冒泡排序',
    selection: '选择排序',
    insertion: '插入排序',
    quick: '快速排序',
    merge: '归并排序',
    heap: '堆排序',
  };
  return `${icons[algorithm] || '📊'} ${names[algorithm] || algorithm}`;
}
