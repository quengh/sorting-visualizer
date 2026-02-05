/**
 * StatsPanel Component
 * Displays sorting statistics and metrics
 */

import type { SortState } from '../types';
import { formatTime, calculateDelay } from '../utils/animation';
import { t, type Language } from '../i18n';

interface StatsPanelProps {
  state: SortState;
  language: Language;
}

export function StatsPanel({ state, language }: StatsPanelProps) {
  const { stats, status, array, algorithm } = state;

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">{t('status', language)}</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === 'running'
              ? 'bg-blue-500/20 text-blue-300'
              : status === 'paused'
              ? 'bg-yellow-500/20 text-yellow-300'
              : status === 'completed'
              ? 'bg-green-500/20 text-green-300'
              : 'bg-gray-500/20 text-gray-300'
          }`}
        >
          {t(status, language)}
        </span>
      </div>

      {/* Array Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700/50 rounded p-2">
          <div className="text-gray-400 text-xs">{t('arraySize', language)}</div>
          <div className="text-white text-lg font-semibold">{array.length}</div>
        </div>
        <div className="bg-gray-700/50 rounded p-2">
          <div className="text-gray-400 text-xs">{t('algorithm', language)}</div>
          <div className="text-white text-lg font-semibold">{t(algorithm, language)}</div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="space-y-2">
        <div className="text-gray-400 text-sm font-medium">{t('stats', language)}</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-700/50 rounded p-2">
            <div className="text-gray-400 text-xs">{t('comparisons', language)}</div>
            <div className="text-yellow-300 text-lg font-semibold">
              {stats.comparisons.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-700/50 rounded p-2">
            <div className="text-gray-400 text-xs">{t('swaps', language)}</div>
            <div className="text-red-300 text-lg font-semibold">
              {stats.swaps.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Time Stats */}
      {stats.startTime && (
        <div className="space-y-2">
          <div className="text-gray-400 text-sm font-medium">{t('elapsedTime', language)}</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-700/50 rounded p-2">
              <div className="text-gray-400 text-xs">{t('elapsedTime', language)}</div>
              <div className="text-green-300 text-lg font-semibold">
                {stats.elapsedTime ? formatTime(stats.elapsedTime) : '0ms'}
              </div>
            </div>
            <div className="bg-gray-700/50 rounded p-2">
              <div className="text-gray-400 text-xs">{t('speed', language)}</div>
              <div className="text-blue-300 text-lg font-semibold">
                {calculateDelay(array.length || 50, state.speed)}ms
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Array Preview (for small arrays) */}
      {array.length > 0 && array.length <= 20 && (
        <div className="space-y-2">
          <div className="text-gray-400 text-xs">{t('arraySize', language)}</div>
          <div className="bg-gray-700/50 rounded p-2 overflow-x-auto">
            <div className="flex gap-1 text-xs font-mono">
              {array.map((val, idx) => (
                <span
                  key={idx}
                  className={`px-1 py-0.5 rounded ${
                    state.sortedIndices.includes(idx)
                      ? 'bg-green-500/30 text-green-200'
                      : state.highlightedIndices.includes(idx)
                      ? 'bg-yellow-500/30 text-yellow-200'
                      : 'bg-gray-600/50 text-gray-300'
                  }`}
                >
                  {val}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
