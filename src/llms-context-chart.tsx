import { useState, useEffect } from "react";
import { ModelSelector } from "./components/ModelSelector";
import { PerformanceChart } from "./components/PerformanceChart";
import { data, modelFamilies, familyColors, topModels } from './data';

export default function LLMContextChart() {
  const [selectedModels, setSelectedModels] = useState([...topModels]);
  const [showAllModels, setShowAllModels] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatWindow = (window) => {
    if (window === 0) return "0";
    if (window < 1000) return window.toString();
    return `${window / 1000}k`;
  };

  const toggleModel = (model) => {
    setSelectedModels((prevSelected) =>
      prevSelected.includes(model)
        ? prevSelected.filter((m) => m !== model)
        : [...prevSelected, model]
    );
  };

  const getModelDisplayName = (model) => {
    let name = model.replace(":free", "").replace("-exp", "");
    name = name.replace("-latest", "");
    name = name.replace("-thinking", "(thinking)");
    if (name === "gemini-2.5-pro-03-25") return "gemini-2.5-pro-03-25";
    if (name === "gemini-2.0-flash(thinking)") return "gemini-2.0-flash(thinking)";
    if (name === "gemini-2.0-pro-02-05") return "gemini-2.0-pro-02-05";
    if (name === "chatgpt-4o") return "chatgpt-4o";
    return name;
  };

  const getModelColor = (model) => {
    for (const [family, models] of Object.entries(modelFamilies)) {
      if (models.includes(model)) {
        return familyColors[family];
      }
    }
    return "#888888";
  };

  const lastDataPoint = data.length > 0 ? data[data.length - 1] : {};

  const sortModelsByPerformance = (modelsToSort) => {
    return [...modelsToSort].sort((a, b) => {
      const aValue = lastDataPoint[a] === null || lastDataPoint[a] === undefined ? -1 : lastDataPoint[a];
      const bValue = lastDataPoint[b] === null || lastDataPoint[b] === undefined ? -1 : lastDataPoint[b];
      if (aValue === -1 && bValue === -1) return 0;
      if (aValue === -1) return 1;
      if (bValue === -1) return -1;
      return bValue - aValue;
    });
  };

  const sortModelsForButtons = (modelsToSort) => {
    return [...modelsToSort].sort((a, b) => {
      const aValue = lastDataPoint[a] === null || lastDataPoint[a] === undefined ? -1 : lastDataPoint[a];
      const bValue = lastDataPoint[b] === null || lastDataPoint[b] === undefined ? -1 : lastDataPoint[b];
      if (aValue === -1 && bValue === -1) return 0;
      if (aValue === -1) return 1;
      if (bValue === -1) return -1;
      return bValue - aValue;
    });
  };

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <h1 className="text-2xl font-bold mb-1 dark:text-white">LLMs Long Context Benchmark</h1>
      <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">Fiction.LiveBench for Long Context Deep Comprehension</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Accuracy (%) across different context window sizes</p>

      <ModelSelector
        showAllModels={showAllModels}
        setShowAllModels={setShowAllModels}
        selectedModels={selectedModels}
        toggleModel={toggleModel}
        getModelDisplayName={getModelDisplayName}
        sortModelsForButtons={sortModelsForButtons}
      />

      <PerformanceChart
        isMobile={isMobile}
        showAllModels={showAllModels}
        selectedModels={selectedModels}
        getModelDisplayName={getModelDisplayName}
        getModelColor={getModelColor}
        formatWindow={formatWindow}
        sortModelsByPerformance={sortModelsByPerformance}
      />

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Data source: <a
            href="https://fiction.live/stories/Fiction-liveBench-April-6-2025/oQdzQvKHw8JyXbN87"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >Fiction.LiveBench</a> for Long Context Deep Comprehension (April 6, 2025)</p>
        <p className="mt-1">
          Made by{" "}
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
  );
}