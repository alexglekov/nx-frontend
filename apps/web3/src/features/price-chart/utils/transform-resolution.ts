/* eslint-disable max-statements */

import { ResolutionString } from '../tradingview'

export const transformResolution = (seconds: number): ResolutionString => {
  const resolutionMap: { [key: number]: string } = {
    1: '1S',
    5: '5S',
    15: '15S',
    30: '30S',
    60: '1',
    300: '5',
    900: '15',
    1800: '30',
    3600: '60',
    7200: '120',
    14400: '240',
    28800: '480',
    86400: '1D'
  }

  if (resolutionMap[seconds]) {
    return resolutionMap[seconds] as ResolutionString
  } else {
    if (seconds < 60) {
      return `${seconds}T` as ResolutionString
    } else if (seconds < 3600) {
      return `${seconds / 60}M` as ResolutionString
    } else if (seconds < 86400) {
      return `${seconds / 3600}H` as ResolutionString
    } else if (seconds % 86400 === 0) {
      return `${seconds / 86400}D` as ResolutionString
    }
    return '1' as ResolutionString
  }
}

export const transformResolutions = (seconds: number[]): ResolutionString[] => {
  return seconds.map(transformResolution)
}

export const reverseTransformResolution = (
  resolution: ResolutionString
): number => {
  // Check for known resolution formats
  const resolutionPatterns: { [key: string]: number } = {
    '1T': 5,
    '1S': 1,
    '5S': 5,
    '15S': 15,
    '30S': 30,
    '1': 60,
    '5': 300,
    '15': 900,
    '30': 1800,
    '60': 3600,
    '120': 7200,
    '240': 14400,
    '480': 28800,
    '1D': 86400
  }

  if (resolutionPatterns[resolution]) {
    return resolutionPatterns[resolution]
  }

  const match = resolution.match(/^(\d+)([SMHD])$/)
  if (match) {
    const value = parseInt(match[1], 10)
    const unit = match[2]

    if (unit === 'M') {
      return value * 60
    } else if (unit === 'H') {
      return value * 3600
    } else if (unit === 'D') {
      return value * 86400
    }
  }

  return 60
}
