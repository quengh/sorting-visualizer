/**
 * Visualizer Component
 * Renders the array visualization area
 */

import { ArrayBar } from './ArrayBar';
import type { SortStatus, SortingAlgorithm } from '../types';
import { getBarColor } from '../utils/color';
import { t, type Language } from '../i18n';

interface VisualizerProps {
  array: number[];
  highlightedIndices: number[];
  sortedIndices: number[];
  pivotIndex?: number;
  currentMinIndex?: number;
  isSwapping: boolean;
  maxValue: number;
  algorithm: SortingAlgorithm;
  status: SortStatus;
  progress: number;
  language: Language;
}

export function Visualizer({
  array,
  highlightedIndices,
  sortedIndices,
  pivotIndex,
  currentMinIndex,
  isSwapping,
  maxValue,
  algorithm,
  status,
  progress,
  language,
}: VisualizerProps) {
  const barWidth = 100 / array.length;
  
  // Smart display settings
  const showGrid = array.length <= 30;
  const showValueLabels = array.length <= 30;
  const gap = array.length <= 20 ? 2 : array.length <= 50 ? 1 : 0;

  // Get status color
  const getStatusColor = (status: SortStatus) => {
    switch (status) {
      case 'running': return 'text-green-400';
      case 'paused': return 'text-yellow-400';
      case 'completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Title Bar */}
      <div className="bg-gray-800 rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="text-lg font-bold text-white">
            {t(algorithm, language)}
          </div>
          <div className="text-sm text-gray-400">
            {t('arraySize', language)}: <span className="text-white font-mono">{array.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-400">{t('status', language)}: </span>
            <span className={`font-medium ${getStatusColor(status)}`}>
              {t(status, language)}
            </span>
          </div>
          {status === 'running' && (
            <div className="text-sm">
              <span className="text-gray-400">{t('progress', language)}: </span>
              <span className="text-white font-mono">{progress}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="relative bg-gray-900/50 rounded-lg p-4">
        {/* Grid Lines (for small arrays) */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none">
            {[25, 50, 75].map((percent) => (
              <div
                key={percent}
                className="absolute w-full border-t border-dashed border-gray-700/50"
                style={{ bottom: `${percent}%` }}
              />
            ))}
          </div>
        )}

        {/* Main Chart */}
        <div 
          className="flex items-end justify-center overflow-hidden"
          style={{ gap: gap > 0 ? `${gap}px` : 0, height: '320px' }}
        >
          {array.length === 0 ? (
            <div className="text-gray-500 text-center w-full h-full flex items-center justify-center">
              <p>{t('clickGenerateArray', language)}</p>
            </div>
          ) : (
            array.map((value, index) => {
              const color = getBarColor(index, {
                highlightedIndices,
                sortedIndices,
                pivotIndex,
                currentMinIndex,
                isSwapping,
              });

              return (
                <ArrayBar
                  key={index}
                  value={value}
                  maxValue={maxValue}
                  color={color}
                  index={index}
                  width={barWidth}
                  arrayLength={array.length}
                  language={language}
                />
              );
            })
          )}
        </div>

        {/* Value Labels (for small arrays) */}
        {showValueLabels && array.length > 0 && (
          <div className="mt-2 flex justify-center gap-1 flex-wrap text-xs text-gray-400">
            {array.slice(0, 10).map((value, idx) => (
              <span key={idx} className="font-mono">
                {value}{idx < Math.min(9, array.length - 1) ? ',' : array.length > 10 ? '...' : ''}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
