import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartTooltip } from './ChartTooltip'
import { ChartLegend } from './ChartLegend'
import { modelFamilies, topModels } from '../data/metadata'
import { PerformanceChartProps, TooltipPayloadItem } from '../types'
import { data } from '../data/benchmark'
import { getModelFamily } from '../utils/chart-utils'

export function PerformanceChart({
  isMobile,
  showAllModels,
  selectedModels,
  getModelDisplayName,
  getModelColor,
  formatWindow,
  sortModelsByPerformance,
  hoveredFamily,
}: PerformanceChartProps) {
  const [hoveredLegendItem, setHoveredLegendItem] = useState<string | null>(null)
  const modelsToRenderLines = showAllModels ? Object.values(modelFamilies).flat() : selectedModels

  const isModelHighlighted = (model: string): boolean => {
    if (hoveredFamily) {
      return getModelFamily(model) === hoveredFamily
    }
    if (hoveredLegendItem) {
      return model === hoveredLegendItem
    }
    return true // Highlight if nothing is specifically hovered
  }

  return (
    <div className="flex flex-col w-full">
      <div
        className={`w-full ${isMobile ? 'h-[40vh]' : 'h-96'}`}
        aria-label="Chart showing LLM performance across different context window sizes"
        role="figure"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={
              isMobile ? { top: 5, right: 20, left: 20, bottom: 5 } : { top: 5, right: 120, left: 20, bottom: 25 }
            }
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="window"
              tickFormatter={formatWindow}
              label={isMobile ? undefined : { value: 'Context Window Size', position: 'insideBottom', offset: -15 }}
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
            />
            <YAxis
              domain={[0, 100]}
              label={isMobile ? undefined : { value: 'Accuracy (%)', angle: -90, position: 'insideLeft', offset: -5 }}
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              axisLine={{ stroke: '#4B5563' }}
              tickLine={{ stroke: '#4B5563' }}
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <ChartTooltip
                  active={active}
                  payload={payload as unknown as TooltipPayloadItem[]}
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
                    hoveredLegendItem={hoveredLegendItem}
                    setHoveredLegendItem={setHoveredLegendItem}
                    hoveredFamily={hoveredFamily}
                    getModelFamily={getModelFamily}
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
                strokeOpacity={isModelHighlighted(model) ? 1 : 0.3}
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
            payload={modelsToRenderLines.map((model) => ({
              dataKey: model,
              color: getModelColor(model),
            }))}
            isMobile={isMobile}
            showAllModels={showAllModels}
            selectedModels={selectedModels}
            getModelDisplayName={getModelDisplayName}
            getModelColor={getModelColor}
            sortModelsByPerformance={sortModelsByPerformance}
            topModels={topModels}
            hoveredLegendItem={hoveredLegendItem}
            setHoveredLegendItem={setHoveredLegendItem}
            hoveredFamily={hoveredFamily}
            getModelFamily={getModelFamily}
          />
        </div>
      )}
    </div>
  )
}
