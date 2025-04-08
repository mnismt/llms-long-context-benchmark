import { useState, useEffect, useCallback, useMemo } from 'react'
import { ModelSelector } from './components/ModelSelector'
import { PerformanceChart } from './components/PerformanceChart'
import { HeatmapTable } from './components/HeatmapTable'
import { modelFamilies, familyColors, topModels } from './data/metadata'
import { data } from './data/benchmark'
import { DataPoint } from './types'
import { formatWindow, getModelDisplayName, sortModelsByPerformance as sortModels, getModelFamily } from './utils/chart-utils'

export default function LLMContextChart() {
  const [selectedModels, setSelectedModels] = useState([...topModels])
  const [showAllModels, setShowAllModels] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Memoize the last data point to avoid recalculation
  const lastDataPoint: DataPoint | undefined = useMemo(() => {
    return data.length > 0 ? data[data.length - 1] : undefined
  }, [])

  // Memoize the model color function
  const getModelColor = useCallback((model: string) => {
    type Family = keyof typeof familyColors;
    for (const [family, models] of Object.entries(modelFamilies)) {
      if (models.includes(model)) {
        return familyColors[family as Family];
      }
    }
    return '#888888'
  }, [])

  // Memoize the sorting function that uses the last data point
  const sortModelsByPerformance = useCallback((modelsToSort: string[]) => {
    return sortModels(modelsToSort, lastDataPoint)
  }, [lastDataPoint])

  // Memoize the toggle model function
  const toggleModel = useCallback((model: string) => {
    setSelectedModels((prevSelected) =>
      prevSelected.includes(model) ? prevSelected.filter((m) => m !== model) : [...prevSelected, model]
    )
  }, [])

  // Handle error states
  const hasData = data && data.length > 0;
  const hasSelectedModels = selectedModels && selectedModels.length > 0;

  return (
    <div
      className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200"
      role="region"
      aria-label="LLMs Long Context Benchmark"
    >
      <h1 className="text-2xl font-bold mb-1 dark:text-white">LLMs Long Context Benchmark</h1>
      <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">
        Fiction.LiveBench for Long Context Deep Comprehension
      </h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Accuracy (%) across different context window sizes
      </p>

      <ModelSelector
        showAllModels={showAllModels}
        setShowAllModels={setShowAllModels}
        selectedModels={selectedModels}
        toggleModel={toggleModel}
        getModelDisplayName={getModelDisplayName}
        sortModelsByPerformance={sortModelsByPerformance}
      />

      {(!hasData || !hasSelectedModels) && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          {!hasData ?
            "No benchmark data available." :
            "Please select at least one model to display."
          }
        </div>
      )}

      {hasData && hasSelectedModels && (
        <>
          <PerformanceChart
            isMobile={isMobile}
            showAllModels={showAllModels}
            selectedModels={selectedModels}
            getModelDisplayName={getModelDisplayName}
            getModelColor={getModelColor}
            formatWindow={formatWindow}
            sortModelsByPerformance={sortModelsByPerformance}
          />
          <HeatmapTable
            data={data}
            modelsToDisplay={sortModelsByPerformance(showAllModels ? Object.values(modelFamilies).flat() : selectedModels)}
            getModelDisplayName={getModelDisplayName}
            formatWindow={formatWindow}
            getModelFamily={getModelFamily}
          />
        </>
      )}

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>
          Data source:{' '}
          <a
            href="https://fiction.live/stories/Fiction-liveBench-April-6-2025/oQdzQvKHw8JyXbN87"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Fiction.LiveBench
          </a>{' '}
          for Long Context Deep Comprehension (April 6, 2025)
        </p>
        <p className="mt-1">
          Made by{' '}
          <a
            href="https://x.com/leodoan_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            @leodoan_
          </a>
        </p>
      </div>
    </div>
  )
}