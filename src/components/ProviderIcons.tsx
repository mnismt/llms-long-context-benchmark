import React from 'react'

// Import all icons (assuming default exports)
import AnthropicIcon from '../icons/anthropic'
import DeepSeekIcon from '../icons/deepseek'
import GoogleIcon from '../icons/google'
import MetaIcon from '../icons/meta'
import OpenAIIcon from '../icons/openai'
import QwenIcon from '../icons/qwen'
import { familyColors } from '../data/metadata'

interface ProviderIconProps {
  providerName: string
  className?: string
}

// Default icon size
const defaultClassName = 'w-4 h-4 inline-block mr-1 align-middle'

export function ProviderIcon({ providerName, className = defaultClassName }: ProviderIconProps) {
  const nameLower = providerName.toLowerCase()
  // Get the corresponding family color
  const color = familyColors[providerName as keyof typeof familyColors] || '#888888' // Default to gray

  // Choose icon based on provider name
  switch (nameLower) {
    case 'anthropic':
      return <AnthropicIcon className={className} style={{ fill: color }} />
    case 'deepseek':
      return <DeepSeekIcon className={className} style={{ fill: color }} />
    case 'google':
      return <GoogleIcon className={className} style={{ fill: color }} />
    case 'meta':
      return <MetaIcon className={className} style={{ fill: color }} />
    case 'openai':
      return <OpenAIIcon className={className} style={{ fill: color }} />
    case 'qwen':
      return <QwenIcon className={className} style={{ fill: color }} />
    // Add cases for other providers if icons exist
    case 'other': // Example for a generic icon or placeholder
    default:
      // Use the color for the placeholder too
      return <div />
  }
}
