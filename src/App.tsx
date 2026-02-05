import { useState, useEffect, useRef } from 'react';
import { Visualizer } from './components/Visualizer';
import { ControlPanel } from './components/ControlPanel';
import { StatsPanel } from './components/StatsPanel';
import { AlgorithmInfo } from './components/AlgorithmInfo';
import { ToastContainer } from './components/ToastContainer';
import { useSorting } from './hooks/useSorting';
import { useToast } from './hooks/useToast';
import { useLanguage } from './hooks/useLanguage';
import type { SortingAlgorithm, ArrayType } from './types';
import { t } from './i18n';

function App() {
  const {
    state,
    generateArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetSorting,
    setAlgorithm,
    setSpeed,
    isSorting,
  } = useSorting();

  const { toasts, showToast, hideToast } = useToast();
  const { language, toggleLanguage } = useLanguage();

  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeedState] = useState(50);
  const [arrayType, setArrayType] = useState<ArrayType>('random');
  
  const speedChangeTimeoutRef = useRef<number | null>(null);

  // Update page title based on language
  useEffect(() => {
    document.title = t('title', language);
  }, [language]);

  // Update speed in state when user changes it
  useEffect(() => {
    setSpeed(speed);
  }, [speed, setSpeed]);

  // Generate initial array on mount
  useEffect(() => {
    generateArray(arraySize, arrayType);
  }, [generateArray, arraySize, arrayType]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (speedChangeTimeoutRef.current) {
        clearTimeout(speedChangeTimeoutRef.current);
      }
    };
  }, []);

  const handleGenerate = () => {
    generateArray(arraySize, arrayType);
    showToast(t('generatedArray', language, { size: arraySize.toString(), type: t(arrayType, language) }), 'success');
  };

  const handleStart = async () => {
    if (state.array.length === 0) {
      showToast(t('pleaseGenerateArray', language), 'error');
      return;
    }
    
    try {
      // If paused, just resume instead of restarting
      if (state.status === 'paused') {
        resumeSorting();
        showToast(t('resumedSort', language, { algo: t(state.algorithm, language) }), 'info');
      } else {
        await startSorting();
        showToast(t('startedSort', language, { algo: t(state.algorithm, language) }), 'info');
      }
    } catch (error) {
      showToast(t('sortingFailed', language) + (error as Error).message, 'error');
    }
  };

  const handlePause = () => {
    pauseSorting();
    showToast(t('sortingPaused', language), 'warning');
  };

  const handleReset = () => {
    resetSorting();
    showToast(t('resetCompleted', language), 'info');
  };

  const handleAlgorithmChange = (algo: SortingAlgorithm) => {
    if (!isSorting) {
      setAlgorithm(algo);
      showToast(t('switchedAlgorithm', language, { algo: t(algo, language) }), 'info');
    } else {
      showToast(t('cannotChangeWhileSorting', language), 'warning');
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeedState(newSpeed);
    
    // Clear previous timeout
    if (speedChangeTimeoutRef.current) {
      clearTimeout(speedChangeTimeoutRef.current);
    }
    
    // Set new timeout to show message after user stops dragging
    speedChangeTimeoutRef.current = window.setTimeout(() => {
      showToast(t('speedSet', language, { speed: newSpeed.toString() }), 'info', 1000);
    }, 500);
  };

  const handleArrayTypeChange = (newType: ArrayType) => {
    setArrayType(newType);
    if (!isSorting) {
      generateArray(arraySize, newType);
      showToast(t('arrayTypeChanged', language, { type: t(newType, language) }), 'info');
    } else {
      showToast(t('cannotChangeWhileSorting', language), 'warning');
    }
  };

  // Calculate max value for visualization scaling
  const maxValue = Math.max(...state.array, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t('title', language)}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {t('subtitle', language)}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>{t('statusReady', language)}</span>
              </div>
              <div className="ml-4 flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => language !== 'zh' && toggleLanguage()}
                  className={`px-3 py-1 rounded-md transition-colors ${language === 'zh' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  中文
                </button>
                <button
                  onClick={() => language !== 'en' && toggleLanguage()}
                  className={`px-3 py-1 rounded-md transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Control Panel */}
          <div className="lg:col-span-1 space-y-4">
            <ControlPanel
              algorithm={state.algorithm}
              setAlgorithm={handleAlgorithmChange}
              arraySize={arraySize}
              setArraySize={setArraySize}
              speed={speed}
              setSpeed={handleSpeedChange}
              arrayType={arrayType}
              setArrayType={handleArrayTypeChange}
              status={state.status}
              onGenerate={handleGenerate}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              isDisabled={state.array.length === 0}
              language={language}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Visualization */}
            <Visualizer
              array={state.array}
              highlightedIndices={state.highlightedIndices}
              sortedIndices={state.sortedIndices}
              pivotIndex={state.pivotIndex}
              currentMinIndex={state.currentMinIndex}
              isSwapping={state.isSwapping ?? false}
              maxValue={maxValue}
              algorithm={state.algorithm}
              status={state.status}
              progress={state.sortedIndices.length > 0 ? Math.round((state.sortedIndices.length / state.array.length) * 100) : 0}
              language={language}
            />

            {/* Stats Panel */}
            <StatsPanel state={state} language={language} />

            {/* Algorithm Info */}
            <AlgorithmInfo algorithm={state.algorithm} language={language} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          <p>
            {t('title', language)} • {t('builtWith', language)}
          </p>
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onHideToast={hideToast} />
    </div>
  );
}

export default App;
