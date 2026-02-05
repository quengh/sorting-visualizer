/**
 * AlgorithmInfo Component
 * Displays information about the selected algorithm
 */

import type { SortingAlgorithm } from '../types';
import { ALGORITHM_INFO } from '../algorithms';
import { getComplexityColor } from '../utils/animation';
import { t, type Language } from '../i18n';

interface AlgorithmInfoProps {
  algorithm: SortingAlgorithm;
  language: Language;
}

export function AlgorithmInfo({ algorithm, language }: AlgorithmInfoProps) {
  const info = ALGORITHM_INFO[algorithm];

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{t(algorithm, language)}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{t(`${algorithm}Desc`, language)}</p>
      </div>

      {/* Complexity */}
      <div className="space-y-2">
        <div className="text-gray-400 text-sm font-medium">{t('timeComplexity', language)}</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-700/50 rounded p-2 text-center">
            <div className="text-gray-400 text-xs">{t('best', language)}</div>
            <span className={`inline-block px-2 py-1 rounded text-xs font-mono mt-1 ${getComplexityColor(info.timeComplexity.best)}`}>
              {info.timeComplexity.best}
            </span>
          </div>
          <div className="bg-gray-700/50 rounded p-2 text-center">
            <div className="text-gray-400 text-xs">{t('average', language)}</div>
            <span className={`inline-block px-2 py-1 rounded text-xs font-mono mt-1 ${getComplexityColor(info.timeComplexity.average)}`}>
              {info.timeComplexity.average}
            </span>
          </div>
          <div className="bg-gray-700/50 rounded p-2 text-center">
            <div className="text-gray-400 text-xs">{t('worst', language)}</div>
            <span className={`inline-block px-2 py-1 rounded text-xs font-mono mt-1 ${getComplexityColor(info.timeComplexity.worst)}`}>
              {info.timeComplexity.worst}
            </span>
          </div>
        </div>
      </div>

      {/* Space Complexity & Properties */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700/50 rounded p-2">
          <div className="text-gray-400 text-xs">{t('spaceComplexity', language)}</div>
          <div className="text-white font-mono text-sm">{info.spaceComplexity}</div>
        </div>
        <div className="bg-gray-700/50 rounded p-2">
          <div className="text-gray-400 text-xs">{t('properties', language)}</div>
          <div className="flex gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded text-xs ${
              info.stable ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}>
              {info.stable ? t('stable', language) : t('unstable', language)}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs ${
              info.inPlace ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
            }`}>
              {info.inPlace ? t('inPlace', language) : t('notInPlace', language)}
            </span>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="space-y-2">
        <div className="text-gray-400 text-sm font-medium">{t('useCases', language)}</div>
        <ul className="space-y-1">
          {t(`${algorithm}UseCases`, language).split('、').map((useCase, idx) => (
            <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              {useCase}
            </li>
          ))}
        </ul>
      </div>

      {/* Advantages & Disadvantages */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-green-400 text-sm font-medium">{t('advantages', language)}</div>
          <ul className="space-y-1">
            {t(`${algorithm}Advantages`, language).split('、').map((advantage, idx) => (
              <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-green-400 mt-1">+</span>
                {advantage}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <div className="text-red-400 text-sm font-medium">{t('disadvantages', language)}</div>
          <ul className="space-y-1">
            {t(`${algorithm}Disadvantages`, language).split('、').map((disadvantage, idx) => (
              <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-red-400 mt-1">−</span>
                {disadvantage}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
