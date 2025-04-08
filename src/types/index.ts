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

// Props for ChartLegend component
export interface ChartLegendProps {
  payload: any[];
  isMobile: boolean;
  showAllModels: boolean;
  selectedModels: string[];
  getModelDisplayName: (model: string) => string;
  getModelColor: (model: string) => string;
  sortModelsByPerformance: (models: string[]) => string[];
  topModels: string[];
}

// Props for ModelSelector component
export interface ModelSelectorProps {
  showAllModels: boolean;
  setShowAllModels: (show: boolean) => void;
  selectedModels: string[];
  toggleModel: (model: string) => void;
  getModelDisplayName: (model: string) => string;
  sortModelsByPerformance: (models: string[]) => string[];
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
}

// Props for ChartTooltip component
export interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  getModelDisplayName: (model: string) => string;
  formatWindow: (window: number) => string;
}