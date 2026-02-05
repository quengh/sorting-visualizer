/**
 * ControlPanel Component
 * Controls for sorting visualization
 */

import type { SortingAlgorithm, SortStatus, ArrayType } from '../types';
import { getColorLegend } from '../utils/color';
import { t, type Language } from '../i18n';
import { calculateDelay } from '../utils/animation';

interface ControlPanelProps {
  algorithm: SortingAlgorithm;
  setAlgorithm: (algo: SortingAlgorithm) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  arrayType: ArrayType;
  setArrayType: (type: ArrayType) => void;
  status: SortStatus;
  onGenerate: () => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isDisabled: boolean;
  language: Language;
}

export function ControlPanel({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  arrayType,
  setArrayType,
  status,
  onGenerate,
  onStart,
  onPause,
  onReset,
  isDisabled,
  language,
}: ControlPanelProps) {
  const colorLegend = getColorLegend(language);

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      {/* Algorithm Selection */}
      <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">{t('algorithm', language)}</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as SortingAlgorithm)}
          disabled={status === 'running'}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="bubble">{t('bubble', language)}</option>
          <option value="selection">{t('selection', language)}</option>
          <option value="insertion">{t('insertion', language)}</option>
          <option value="quick">{t('quick', language)}</option>
          <option value="merge">{t('merge', language)}</option>
          <option value="heap">{t('heap', language)}</option>
        </select>
      </div>

      {/* Array Type Selection */}
      <div className="space-y-2">
        <label className="text-gray-400 text-sm font-medium">{t('arrayType', language)}</label>
        <select
          value={arrayType}
          onChange={(e) => setArrayType(e.target.value as ArrayType)}
          disabled={status === 'running'}
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="random">{t('random', language)}</option>
          <option value="nearly-sorted">{t('nearly-sorted', language)}</option>
          <option value="reversed">{t('reversed', language)}</option>
          <option value="duplicates">{t('duplicates', language)}</option>
        </select>
      </div>

      {/* Array Size Control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-gray-400 text-sm font-medium">{t('arraySize', language)}</label>
          <span className="text-white text-sm font-mono bg-gray-700 px-2 py-1 rounded">
            {arraySize}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
          disabled={status === 'running'}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>10</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-gray-400 text-sm font-medium">{t('speed', language)}</label>
          <span className="text-white text-sm font-mono bg-gray-700 px-2 py-1 rounded">
            {calculateDelay(50, speed)}ms
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          disabled={status === 'completed'}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>500ms</span>
          <span>5ms</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onGenerate}
          disabled={status === 'running'}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          {t('generateArray', language)}
        </button>
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          {t('reset', language)}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {status === 'running' ? (
          <button
            onClick={onPause}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors col-span-2 text-sm"
          >
            {t('pause', language)}
          </button>
        ) : (
          <button
            onClick={onStart}
            disabled={isDisabled}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors col-span-2 text-sm"
          >
            {status === 'paused' ? t('resume', language) : t('start', language)}
          </button>
        )}
      </div>

      {/* Color Legend */}
      <div className="border-t border-gray-700 pt-4">
        <div className="text-gray-400 text-sm font-medium mb-2">{t('colorLegend', language)}</div>
        <div className="grid grid-cols-2 gap-2">
          {colorLegend.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${item.color}`} />
              <span className="text-gray-300 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
