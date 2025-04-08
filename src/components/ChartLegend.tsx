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
  hoveredLegendItem,
  setHoveredLegendItem,
  hoveredFamily,
  getModelFamily,
}: ChartLegendProps) {
  const currentPayload = payload || [];

  if (currentPayload.length === 0) {
    return null;
  }

  const payloadMap = currentPayload.reduce((acc: { [key: string]: { color: string } }, entry) => {
    const key = entry.dataKey || entry.value || (entry.payload?.dataKey);
    if (key && typeof key === 'string') {
      acc[key] = { color: entry.color || getModelColor(key) };
    }
    return acc;
  }, {});

  let modelsToDisplayInLegend: string[] = [];

  if (showAllModels) {
    const activeModelKeysFromPayload = Object.keys(payloadMap);
    modelsToDisplayInLegend = sortModelsByPerformance(activeModelKeysFromPayload);
  } else {
    const topModelOrder = topModels.reduce((acc: { [key: string]: number }, model, index) => {
      acc[model] = index;
      return acc;
    }, {});

    const relevantSelectedModels = selectedModels.filter(model => Object.prototype.hasOwnProperty.call(payloadMap, model));
    modelsToDisplayInLegend = relevantSelectedModels.sort((a, b) => {
      const orderA = Object.prototype.hasOwnProperty.call(topModelOrder, a) ? topModelOrder[a] : Infinity;
      const orderB = Object.prototype.hasOwnProperty.call(topModelOrder, b) ? topModelOrder[b] : Infinity;
      return orderA - orderB;
    });
  }

  return (
    <div className={isMobile ? 'w-full' : ''}>
      <ul className={`list-none p-0 m-0 text-left ${isMobile ? 'grid grid-cols-2 gap-2' : ''}`}>
        {modelsToDisplayInLegend.map((modelName) => {
          const modelData = payloadMap[modelName];
          const color = modelData?.color || getModelColor(modelName);
          const family = getModelFamily ? getModelFamily(modelName) : 'Unknown';
          const isHovered = hoveredLegendItem === modelName;
          const isFamilyHovered = hoveredFamily === family;
          const isDimmed =
            (hoveredFamily !== null && !isFamilyHovered && hoveredLegendItem === null) ||
            (hoveredLegendItem !== null && !isHovered);
          return (
            <li
              key={modelName}
              className={`mb-1 flex items-center cursor-default transition-opacity ${isMobile ? 'text-[11px]' : ''} ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredLegendItem(modelName)}
              onMouseLeave={() => setHoveredLegendItem(null)}
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