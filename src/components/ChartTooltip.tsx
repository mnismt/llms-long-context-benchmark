import { ChartTooltipProps } from '../types';

export function ChartTooltip({
  active,
  payload,
  label,
  getModelDisplayName,
  formatWindow,
}: ChartTooltipProps) {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => {
      if (a.value === null || a.value === undefined) return 1;
      if (b.value === null || b.value === undefined) return -1;
      return b.value - a.value;
    });

    return (
      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-300 dark:border-gray-600 shadow-md rounded text-xs">
        <p className="font-bold mb-1 dark:text-white">{`Context: ${formatWindow(label)}`}</p>
        {sortedPayload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center mb-1">
            <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span style={{ color: entry.color }}>
              {getModelDisplayName(entry.name)}: {entry.value !== null && entry.value !== undefined ? `${entry.value.toFixed(1)}%` : "N/A"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}