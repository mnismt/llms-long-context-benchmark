import { DataPoint } from '../types'
import { modelFamilies } from '../data/metadata'

/**
 * Formats a context window size number into a readable string
 */
export const formatWindow = (window: number): string => {
  if (window === 0) return '0'
  if (window < 1000) return window.toString()
  return `${window / 1000}k`
}

/**
 * Converts a model ID to a user-friendly display name
 */
export const getModelDisplayName = (model: string): string => {
  let name = model.replace(':free', '').replace('-exp', '')
  name = name.replace('-latest', '')
  name = name.replace('-thinking', '(thinking)')
  
  // Special cases for specific models
  if (name === 'gemini-2.5-pro-03-25') return 'gemini-2.5-pro-03-25'
  if (name === 'gemini-2.0-flash(thinking)') return 'gemini-2.0-flash(thinking)'
  if (name === 'gemini-2.0-pro-02-05') return 'gemini-2.0-pro-02-05'
  if (name === 'chatgpt-4o') return 'chatgpt-4o'
  
  return name
}

/**
 * Sort models by their performance in the latest data point
 */
export const sortModelsByPerformance = (
  modelsToSort: string[],
  lastDataPoint?: DataPoint
): string[] => {
  if (!lastDataPoint) return modelsToSort

  return [...modelsToSort].sort((a, b) => {
    // Safely access scores using optional chaining and nullish coalescing
    const aValue = lastDataPoint[a] ?? -1
    const bValue = lastDataPoint[b] ?? -1
    
    if (aValue === -1 && bValue === -1) return 0
    if (aValue === -1) return 1
    if (bValue === -1) return -1
    
    return bValue - aValue // Higher scores first
  })
}

/**
 * Function to get the family (provider) of a model
 */
export function getModelFamily(model: string): string {
  for (const [family, models] of Object.entries(modelFamilies)) {
    if (models.includes(model)) {
      return family;
    }
  }
  return 'Other'; // Default or fallback family name
}