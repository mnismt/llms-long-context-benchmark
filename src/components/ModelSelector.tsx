import { modelFamilies, familyColors } from '../data/metadata';
import { ModelSelectorProps } from '../types';
import { ProviderIcon } from './ProviderIcons';

// Define a type for the family keys
type FamilyName = keyof typeof modelFamilies;

export function ModelSelector({
  showAllModels,
  setShowAllModels,
  selectedModels,
  toggleModel,
  getModelDisplayName,
  sortModelsByPerformance,
  hoveredFamily,
  setHoveredFamily,
}: ModelSelectorProps) {
  const getProviderSelectionState = (models: string[]) => {
    const selectedCount = models.filter(model => selectedModels.includes(model)).length;
    if (selectedCount === 0) return 'none';
    if (selectedCount === models.length) return 'all';
    return 'partial';
  };

  const toggleProvider = (providerModels: string[]) => {
    const selectionState = getProviderSelectionState(providerModels);
    if (selectionState === 'all') {
      // Deselect all models of this provider
      providerModels.forEach(model => {
        if (selectedModels.includes(model)) {
          toggleModel(model);
        }
      });
    } else {
      // Select all models of this provider
      providerModels.forEach(model => {
        if (!selectedModels.includes(model)) {
          toggleModel(model);
        }
      });
    }
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setShowAllModels(!showAllModels)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2 mb-2 transition-colors"
      >
        {showAllModels ? "Show Top Models" : "Show All Models"}
      </button>

      {!showAllModels && (
        <div className="mt-2 border rounded p-3 dark:border-gray-700">
          <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Select models to display:</p>
          <div className="flex flex-wrap gap-4">
            {(Object.entries(modelFamilies) as [FamilyName, string[]][]).map(([family, models]) => {
              const sortedFamilyModels = sortModelsByPerformance(models);
              const selectionState = getProviderSelectionState(models);
              
              return (
                <div 
                  key={family} 
                  className={`border rounded p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 transition-colors cursor-pointer
                    ${selectionState === 'all' ? 'ring-2 ring-blue-500' : ''}
                    ${selectionState === 'partial' ? 'ring-2 ring-blue-300' : ''}
                    ${hoveredFamily === family ? 'bg-gray-100 dark:bg-gray-600' : ''}
                    hover:bg-gray-100 dark:hover:bg-gray-600`}
                  onClick={() => toggleProvider(models)}
                  onMouseEnter={() => setHoveredFamily(family)}
                  onMouseLeave={() => setHoveredFamily(null)}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <div 
                      className="w-4 h-4 rounded border flex items-center justify-center transition-colors"
                      style={{ 
                        borderColor: familyColors[family],
                        backgroundColor: selectionState === 'all' ? familyColors[family] : 'transparent'
                      }}
                    >
                      {selectionState === 'all' && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                      )}
                      {selectionState === 'partial' && (
                        <div className="w-2 h-2 bg-current" style={{ color: familyColors[family] }}></div>
                      )}
                    </div>
                    <ProviderIcon providerName={family} className="w-4 h-4 inline-block ml-1" />
                    <div className="font-bold" style={{ color: familyColors[family] }}>
                      {family}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1" onClick={e => e.stopPropagation()}>
                    {sortedFamilyModels.map((model) => (
                      <button
                        key={model}
                        onClick={() => toggleModel(model)}
                        title={model}
                        aria-pressed={selectedModels.includes(model)}
                        className={`px-2 py-1 text-xs rounded border transition-colors ${
                          selectedModels.includes(model)
                            ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-800 dark:text-blue-200 font-medium"
                            : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        {getModelDisplayName(model)}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}