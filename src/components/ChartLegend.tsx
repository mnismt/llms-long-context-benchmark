import { ChartLegendProps } from '../types';

export function ChartLegend({
  payload,
  isMobile,
  showAllModels,
  selectedModels,
  getModelDisplayName,
  getModelColor,
  sortModelsByPerformance,
  topModels,
}: ChartLegendProps) {
  if (!payload || payload.length === 0) {
    return null;
  }

  const payloadMap = payload.reduce((acc, entry) => {
    const key = entry.payload?.dataKey || entry.dataKey || entry.value;
    if (key) {
      acc[key] = { color: entry.color };
    }
    return acc;
  }, {});

  let modelsToDisplayInLegend = [];

  if (showAllModels) {
    const activeModelKeysFromPayload = Object.keys(payloadMap);
    modelsToDisplayInLegend = sortModelsByPerformance(activeModelKeysFromPayload);
  } else {
    const topModelOrder = topModels.reduce((acc, model, index) => {
      acc[model] = index;
      return acc;
    }, {});

    const relevantSelectedModels = selectedModels.filter(model => payloadMap.hasOwnProperty(model));
    modelsToDisplayInLegend = relevantSelectedModels.sort((a, b) => {
      const orderA = topModelOrder.hasOwnProperty(a) ? topModelOrder[a] : Infinity;
      const orderB = topModelOrder.hasOwnProperty(b) ? topModelOrder[b] : Infinity;
      return orderA - orderB;
    });
  }

  return (
    <div className={isMobile ? 'w-full' : ''}>
      <ul className={`list-none p-0 m-0 text-left ${isMobile ? 'grid grid-cols-2 gap-2' : ''}`}>
        {modelsToDisplayInLegend.map((modelName) => {
          const color = payloadMap[modelName]?.color || getModelColor(modelName);
          return (
            <li
              key={modelName}
              className={`mb-1 flex items-center cursor-default ${isMobile ? 'text-[11px]' : ''}`}
            >
              <div className="w-2.5 h-2.5 mr-2 flex-shrink-0" style={{ backgroundColor: color }}></div>
              <span className="text-xs dark:text-gray-200 truncate" style={{ color }}>
                {getModelDisplayName(modelName)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}