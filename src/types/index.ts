// Define the structure for data points
export interface DataPoint {
  window: number;
  [modelName: string]: number | null | undefined; // Index signature for model scores
}

// Define the structure for model families
export interface ModelFamilies {
  [familyName: string]: string[];
}

// Define the structure for family colors
export interface FamilyColors {
  [familyName: string]: string;
}

// Specific payload item types for Recharts components
export interface LegendPayloadItem {
  color?: string;
  dataKey?: string;
  payload?: { 
    dataKey?: string;
  }
  value?: string; // model name can also be here apparently
}

export interface TooltipPayloadItem {
  color?: string;
  name?: string;
  value: number | null;
  payload?: unknown; // Use unknown instead of any
  dataKey?: string;
}

// Props for ChartLegend component
export interface ChartLegendProps {
  payload?: LegendPayloadItem[]; // Use specific type
  isMobile: boolean;
  showAllModels: boolean;
  selectedModels: string[];
  getModelDisplayName: (model: string) => string;
  getModelColor: (model: string) => string;
  sortModelsByPerformance: (models: string[]) => string[];
  topModels: string[];
  hoveredLegendItem: string | null;
  setHoveredLegendItem: React.Dispatch<React.SetStateAction<string | null>>;
  hoveredFamily: string | null;
  getModelFamily: (model: string) => string;
}

// Props for ModelSelector component
export interface ModelSelectorProps {
  showAllModels: boolean;
  setShowAllModels: (show: boolean) => void;
  selectedModels: string[];
  toggleModel: (model: string) => void;
  getModelDisplayName: (model: string) => string;
  sortModelsByPerformance: (models: string[]) => string[];
  hoveredFamily: string | null;
  setHoveredFamily: React.Dispatch<React.SetStateAction<string | null>>;
}

// Props for PerformanceChart component
export interface PerformanceChartProps {
  isMobile: boolean;
  showAllModels: boolean;
  selectedModels: string[];
  getModelDisplayName: (model: string) => string;
  getModelColor: (model: string) => string;
  formatWindow: (window: number) => string;
  sortModelsByPerformance: (models: string[]) => string[];
  hoveredFamily: string | null;
}

// Props for ChartTooltip component
export interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[]; // Use specific type
  label?: string | number; // Label can be number (window size) before formatting
  getModelDisplayName: (model: string) => string;
  formatWindow: (window: number) => string;
}