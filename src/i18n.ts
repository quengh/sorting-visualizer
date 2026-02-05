/**
 * Internationalization configuration
 */

export type Language = 'zh' | 'en';

export interface Translations {
  [key: string]: {
    zh: string;
    en: string;
  };
}

export const translations: Translations = {
  // Header
  title: {
    zh: '排序算法可视化',
    en: 'Sorting Algorithm Visualizer',
  },
  subtitle: {
    zh: '排序算法的交互式可视化',
    en: 'Interactive visualization of sorting algorithms',
  },
  statusReady: {
    zh: '就绪',
    en: 'Ready',
  },

  // Control Panel
  algorithm: {
    zh: '算法',
    en: 'Algorithm',
  },
  arrayType: {
    zh: '数组类型',
    en: 'Array Type',
  },
  arraySize: {
    zh: '数组大小',
    en: 'Array Size',
  },
  speed: {
    zh: '速度',
    en: 'Speed',
  },
  generateArray: {
    zh: '生成数组',
    en: 'Generate Array',
  },
  reset: {
    zh: '重置',
    en: 'Reset',
  },
  pause: {
    zh: '暂停',
    en: 'Pause',
  },
  start: {
    zh: '开始排序',
    en: 'Start Sorting',
  },
  resume: {
    zh: '继续',
    en: 'Resume',
  },
  colorLegend: {
    zh: '颜色图例',
    en: 'Color Legend',
  },

  // Algorithm names
  bubble: {
    zh: '冒泡排序',
    en: 'Bubble Sort',
  },
  bubbleDesc: {
    zh: '冒泡排序重复遍历列表，比较相邻元素并在顺序错误时交换它们。重复遍历列表直到列表有序。',
    en: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  },
  selection: {
    zh: '选择排序',
    en: 'Selection Sort',
  },
  selectionDesc: {
    zh: '选择排序将输入分为已排序和未排序区域。它重复从未排序区域选择最小元素并将其移动到已排序区域的末尾。',
    en: 'Selection Sort divides the input into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.',
  },
  insertion: {
    zh: '插入排序',
    en: 'Insertion Sort',
  },
  insertionDesc: {
    zh: '插入排序逐个构建排序数组。它从输入中取出每个元素并将其插入到已排序部分的正确位置。',
    en: 'Insertion Sort builds the sorted array one element at a time. It takes each element from the input and inserts it into its correct position in the sorted portion.',
  },
  quick: {
    zh: '快速排序',
    en: 'Quick Sort',
  },
  quickDesc: {
    zh: '快速排序是一种分治算法。它选择一个基准元素，围绕基准分区数组，然后递归地对子数组进行排序。',
    en: 'Quick Sort is a divide-and-conquer algorithm. It picks a pivot element, partitions the array around the pivot, and recursively sorts the sub-arrays.',
  },
  merge: {
    zh: '归并排序',
    en: 'Merge Sort',
  },
  mergeDesc: {
    zh: '归并排序是一种分治算法。它递归地将数组分成两半，对每半进行排序，然后将排序后的两半合并回一起。',
    en: 'Merge Sort is a divide-and-conquer algorithm. It recursively splits the array into halves, sorts each half, and then merges the sorted halves back together.',
  },
  heap: {
    zh: '堆排序',
    en: 'Heap Sort',
  },
  heapDesc: {
    zh: '堆排序使用二叉堆数据结构。它首先从输入构建最大堆，然后重复提取最大元素并重建堆。',
    en: 'Heap Sort uses a binary heap data structure. It first builds a max heap from the input, then repeatedly extracts the maximum element and rebuilds the heap.',
  },

  // Array types
  random: {
    zh: '随机',
    en: 'Random',
  },
  'nearly-sorted': {
    zh: '近乎有序',
    en: 'Nearly Sorted',
  },
  reversed: {
    zh: '逆序',
    en: 'Reversed',
  },
  duplicates: {
    zh: '含重复',
    en: 'With Duplicates',
  },

  // Algorithm info - Use Cases
  bubbleUseCases: {
    zh: '教育目的、小数据集、近乎有序的数据、当简单性优于效率时',
    en: 'Educational purposes, Small datasets, Nearly sorted data, When simplicity is preferred over efficiency',
  },
  selectionUseCases: {
    zh: '小数据集、当内存写入昂贵时、当需要保证 O(n²) 性能时',
    en: 'Small datasets, When memory writes are expensive, When you need guaranteed O(n²) performance',
  },
  insertionUseCases: {
    zh: '小数据集、近乎有序的数据、在线排序（流式数据）、当需要稳定性时',
    en: 'Small datasets, Nearly sorted data, Online sorting (streaming data), When stability is required',
  },
  quickUseCases: {
    zh: '通用排序、大数据集、当平均性能重要时、内存排序',
    en: 'General-purpose sorting, Large datasets, When average performance matters, In-memory sorting',
  },
  mergeUseCases: {
    zh: '大数据集、当需要稳定排序时、外部排序（基于磁盘）、链表',
    en: 'Large datasets, When stable sorting is required, External sorting (disk-based), Linked lists',
  },
  heapUseCases: {
    zh: '当需要最坏情况 O(n log n) 时、实时系统、嵌入式系统、当需要保证性能时',
    en: 'When worst-case O(n log n) is required, Real-time systems, Embedded systems with limited memory, When you need guaranteed performance',
  },

  // Algorithm info - Advantages
  bubbleAdvantages: {
    zh: '简单易懂和实现、稳定排序算法、原地排序（无额外内存）、能在 O(n) 时间内检测已排序数组',
    en: 'Simple to understand and implement, Stable sorting algorithm, In-place sorting (no extra memory), Detects already sorted arrays in O(n) time',
  },
  selectionAdvantages: {
    zh: '简单实现、最少交换（最多 n-1 次交换）、原地排序、性能与输入数据无关',
    en: 'Simple implementation, Minimal swaps (at most n-1 swaps), In-place sorting, Performance independent of input data',
  },
  insertionAdvantages: {
    zh: '简单实现、对小数据集高效、稳定且原地、自适应 - 对近乎有序数据 O(n)、在线算法 - 可在数据到达时排序',
    en: 'Simple implementation, Efficient for small datasets, Stable and in-place, Adaptive - O(n) for nearly sorted data, Online algorithm - can sort as data arrives',
  },
  quickAdvantages: {
    zh: '实践中非常快、原地排序、缓存友好、广泛用于标准库',
    en: 'Very fast in practice, In-place sorting, Cache-friendly, Widely used in standard libraries',
  },
  mergeAdvantages: {
    zh: '一致的 O(n log n) 性能、稳定排序、可预测性能、适合外部排序',
    en: 'Consistent O(n log n) performance, Stable sorting, Predictable performance, Good for external sorting',
  },
  heapAdvantages: {
    zh: '保证 O(n log n) 性能、原地排序、没有快速排序的最坏情况、适合嵌入式系统',
    en: 'Guaranteed O(n log n) performance, In-place sorting, No worst-case scenario like quick sort, Good for embedded systems',
  },

  // Algorithm info - Disadvantages
  bubbleDisadvantages: {
    zh: '对大数据集非常低效、需要大量交换、不适合实际应用',
    en: 'Very inefficient for large datasets, Many swaps required, Not suitable for real-world applications',
  },
  selectionDisadvantages: {
    zh: '对大数据集低效、不稳定、即使对已排序数据也是 O(n²)',
    en: 'Inefficient for large datasets, Not stable, Always O(n²) even for sorted data',
  },
  insertionDisadvantages: {
    zh: '对大数据集低效、需要大量移动、不适合大数组',
    en: 'Inefficient for large datasets, Many shifts required, Not suitable for large arrays',
  },
  quickDisadvantages: {
    zh: '不稳定、最坏情况 O(n²)（坏基准）、递归 - 使用栈空间、不适合链表',
    en: 'Not stable, Worst case O(n²) with bad pivots, Recursive - uses stack space, Not suitable for linked lists',
  },
  mergeDisadvantages: {
    zh: '需要 O(n) 额外空间、非原地、对小数组比快速排序慢、实现更复杂',
    en: 'Requires O(n) extra space, Not in-place, Slower than quick sort for small arrays, More complex implementation',
  },
  heapDisadvantages: {
    zh: '不稳定、实践中比快速排序慢、缓存性能差、非自适应',
    en: 'Not stable, Slower than quick sort in practice, Poor cache performance, Not adaptive',
  },

  // Visualizer
  clickGenerateArray: {
    zh: '点击"生成数组"开始',
    en: 'Click "Generate Array" to start',
  },

  // Footer
  builtWith: {
    zh: '使用 Vite + React + TypeScript + Tailwind CSS 构建',
    en: 'Built with Vite + React + TypeScript + Tailwind CSS',
  },

  // ArrayBar tooltip
  index: {
    zh: '索引',
    en: 'Index',
  },
  value: {
    zh: '值',
    en: 'Value',
  },
  state: {
    zh: '状态',
    en: 'State',
  },
  status: {
    zh: '状态',
    en: 'Status',
  },

  // SortStatus values
  running: {
    zh: '运行中',
    en: 'Running',
  },
  paused: {
    zh: '已暂停',
    en: 'Paused',
  },
  completed: {
    zh: '已完成',
    en: 'Completed',
  },
  idle: {
    zh: '空闲',
    en: 'Idle',
  },

  // Toast messages
  generatedArray: {
    zh: '已生成 {size} 个元素的 {type} 数组',
    en: 'Generated {size} {type} array',
  },
  pleaseGenerateArray: {
    zh: '请先生成数组',
    en: 'Please generate an array first',
  },
  resumedSort: {
    zh: '继续 {algo} 排序',
    en: 'Resumed {algo} sort',
  },
  startedSort: {
    zh: '开始 {algo} 排序',
    en: 'Started {algo} sort',
  },
  sortingFailed: {
    zh: '排序失败：',
    en: 'Sorting failed: ',
  },
  sortingPaused: {
    zh: '排序已暂停',
    en: 'Sorting paused',
  },
  resetCompleted: {
    zh: '重置完成',
    en: 'Reset completed',
  },
  switchedAlgorithm: {
    zh: '已切换到 {algo} 排序',
    en: 'Switched to {algo} sort',
  },
  cannotChangeWhileSorting: {
    zh: '排序中无法更改',
    en: 'Cannot change while sorting',
  },
  speedSet: {
    zh: '速度设置为 {speed}ms',
    en: 'Speed set to {speed}ms',
  },
  arrayTypeChanged: {
    zh: '数组类型已改为 {type}',
    en: 'Array type changed to {type}',
  },

  // Stats Panel
  stats: {
    zh: '统计信息',
    en: 'Statistics',
  },
  comparisons: {
    zh: '比较次数',
    en: 'Comparisons',
  },
  swaps: {
    zh: '交换次数',
    en: 'Swaps',
  },
  elapsedTime: {
    zh: '耗时',
    en: 'Elapsed Time',
  },
  progress: {
    zh: '进度',
    en: 'Progress',
  },

  // Algorithm Info
  timeComplexity: {
    zh: '时间复杂度',
    en: 'Time Complexity',
  },
  spaceComplexity: {
    zh: '空间复杂度',
    en: 'Space Complexity',
  },
  properties: {
    zh: '特性',
    en: 'Properties',
  },
  stable: {
    zh: '稳定',
    en: 'Stable',
  },
  unstable: {
    zh: '不稳定',
    en: 'Unstable',
  },
  inPlace: {
    zh: '原地',
    en: 'In-place',
  },
  notInPlace: {
    zh: '非原地',
    en: 'Not in-place',
  },
  best: {
    zh: '最佳',
    en: 'Best',
  },
  average: {
    zh: '平均',
    en: 'Average',
  },
  worst: {
    zh: '最差',
    en: 'Worst',
  },
};

export function t(key: string, lang: Language, params?: Record<string, string>): string {
  const translation = translations[key];
  if (!translation) {
    return key;
  }
  
  let text = translation[lang] || key;
  
  // Replace placeholders
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      text = text.replace(`{${key}}`, value);
    });
  }
  
  return text;
}
