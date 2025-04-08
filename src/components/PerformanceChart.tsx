import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { ChartLegend } from "./ChartLegend";
import { data, modelFamilies, topModels } from '../data';

interface PerformanceChartProps {
  isMobile: boolean;
  showAllModels: boolean;
  selectedModels: string[];
  getModelDisplayName: (model: string) => string;
  getModelColor: (model: string) => string;
  formatWindow: (window: number) => string;
  sortModelsByPerformance: (models: string[]) => string[];
}

export function PerformanceChart({
  isMobile,
  showAllModels,
  selectedModels,
  getModelDisplayName,
  getModelColor,
  formatWindow,
  sortModelsByPerformance,
}: PerformanceChartProps) {
  const modelsToRenderLines = showAllModels ? Object.values(modelFamilies).flat() : selectedModels;

  return (
    <div className="flex flex-col w-full">
      <div className={`w-full ${isMobile ? 'h-[40vh]' : 'h-96'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data} 
            margin={isMobile ? 
              { top: 5, right: 20, left: 20, bottom: 5 } : 
              { top: 5, right: 120, left: 20, bottom: 25 }
            }
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="window"
              tickFormatter={formatWindow}
              label={isMobile ? undefined : { value: "Context Window Size", position: "insideBottom", offset: -15 }}
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              axisLine={{ stroke: "#4B5563" }}
              tickLine={{ stroke: "#4B5563" }}
            />
            <YAxis
              domain={[0, 100]}
              label={isMobile ? undefined : { value: "Accuracy (%)", angle: -90, position: "insideLeft", offset: -5 }}
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              axisLine={{ stroke: "#4B5563" }}
              tickLine={{ stroke: "#4B5563" }}
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <ChartTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  getModelDisplayName={getModelDisplayName}
                  formatWindow={formatWindow}
                />
              )}
              cursor={{ strokeDasharray: '3 3' }}
            />
            {!isMobile && (
              <Legend
                content={(props) => (
                  <ChartLegend
                    {...props}
                    isMobile={isMobile}
                    showAllModels={showAllModels}
                    selectedModels={selectedModels}
                    getModelDisplayName={getModelDisplayName}
                    getModelColor={getModelColor}
                    sortModelsByPerformance={sortModelsByPerformance}
                    topModels={topModels}
                  />
                )}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  position: 'absolute',
                  top: '40px',
                  right: '-10px',
                  bottom: 'auto',
                  left: 'auto',
                  maxHeight: 'calc(100% - 80px)',
                  overflowY: 'auto',
                }}
              />
            )}

            {modelsToRenderLines.map((model) => (
              <Line
                key={model}
                type="monotone"
                dataKey={model}
                name={model}
                stroke={getModelColor(model)}
                strokeWidth={selectedModels.includes(model) ? 2.5 : 1.5}
                dot={{ r: selectedModels.includes(model) ? 4 : 3, strokeWidth: 1, fill: getModelColor(model) }}
                activeDot={{ r: 5 }}
                connectNulls={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {isMobile && (
        <div className="mt-4 px-2">
          <ChartLegend
            payload={modelsToRenderLines.map(model => ({
              dataKey: model,
              color: getModelColor(model)
            }))}
            isMobile={isMobile}
            showAllModels={showAllModels}
            selectedModels={selectedModels}
            getModelDisplayName={getModelDisplayName}
            getModelColor={getModelColor}
            sortModelsByPerformance={sortModelsByPerformance}
            topModels={topModels}
          />
        </div>
      )}
    </div>
  );
}