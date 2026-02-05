/**
 * ArrayBar Component
 * Renders a single bar in the visualization
 */

import type { BarColor } from '../types';
import { COLOR_MAP, getTextColorForBar } from '../utils/color';
import { t, type Language } from '../i18n';

interface ArrayBarProps {
  value: number;
  maxValue: number;
  color: BarColor;
  index: number;
  width: number;
  arrayLength: number;
  language: Language;
}

export function ArrayBar({ value, maxValue, color, index, width, arrayLength, language }: ArrayBarProps) {
  const height = (value / maxValue) * 100;
  const colorClass = COLOR_MAP[color] || COLOR_MAP.default;
  const textColor = getTextColorForBar(color);
  
  // Smart value display strategy
  const shouldShowValue = arrayLength <= 30;
  const valuePosition = arrayLength <= 30 ? 'inside' : 'above';
  const fontSize = Math.max(8, Math.min(12, 100 / arrayLength));

  return (
    <div
      className={`relative ${colorClass} transition-all duration-150 ease-in-out rounded-t-sm group`}
      style={{
        height: `${Math.max(height, 2)}%`,
        width: `${width}%`,
      }}
      title={`${t('index', language)}: ${index}\n${t('value', language)}: ${value}\n${t('state', language)}: ${t(color, language)}`}
    >
      {/* Value label - inside the bar (for small arrays) */}
      {shouldShowValue && valuePosition === 'inside' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className={`font-semibold drop-shadow-md ${textColor}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {value}
          </span>
        </div>
      )}

      {/* Value label - above the bar (for large arrays) */}
      {!shouldShowValue && valuePosition === 'above' && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span 
            className={`text-xs font-semibold ${textColor} bg-gray-900/80 px-1 rounded opacity-80 group-hover:opacity-100 transition-opacity`}
          >
            {value}
          </span>
        </div>
      )}

      {/* Enhanced tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          <div>{t('index', language)}: {index}</div>
          <div>{t('value', language)}: {value}</div>
          <div className="text-gray-400">{t(color, language)}</div>
        </div>
      </div>
    </div>
  );
}
