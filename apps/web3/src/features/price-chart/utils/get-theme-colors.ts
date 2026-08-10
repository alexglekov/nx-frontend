/* eslint-disable max-statements */

import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GREEN_DARK,
  COLOR_PINK,
  COLOR_PINK_DARK,
  COLOR_RED,
  COLOR_WHITE,
  COLOR_YELLOW
} from 'shared/constants'
import { CustomThemeColors } from '../tradingview'

const DEFAULT_THEME_COLORS: Record<
  keyof Omit<CustomThemeColors, 'black' | 'white'>,
  string
> = {
  color1: COLOR_BLUE,
  color2: COLOR_BLACK,
  color3: COLOR_PINK_DARK,
  color4: COLOR_GREEN_DARK,
  color5: COLOR_RED,
  color6: COLOR_PINK,
  color7: COLOR_YELLOW
}

const rgbaFromHex = (value: string) => {
  const rgba = {
    r: parseInt(value.slice(1, 3), 16),
    g: parseInt(value.slice(3, 5), 16),
    b: parseInt(value.slice(5, 8), 16),
    a: 1
  }

  return rgba
}

const getColors = (fromHexString: string, toHexString: string) => {
  const fromRgba = rgbaFromHex(fromHexString)
  const toRgba = rgbaFromHex(toHexString)
  const numberOfSteps = 12
  const results = []
  const step = 1 / numberOfSteps

  for (let t = step; t < 1 - step; t += step) {
    const r = Math.round(fromRgba.r + (toRgba.r - fromRgba.r) * t)
      .toString(16)
      .padStart(2, '0')
    const g = Math.round(fromRgba.g + (toRgba.g - fromRgba.g) * t)
      .toString(16)
      .padStart(2, '0')
    const b = Math.round(fromRgba.b + (toRgba.b - fromRgba.b) * t)
      .toString(16)
      .padStart(2, '0')

    results.push('#' + r + g + b)
  }

  return results
}

export const getThemeColors = (): CustomThemeColors => {
  const colors = Object.entries(DEFAULT_THEME_COLORS)

  const themeColors: CustomThemeColors = colors.reduce((acc, [key, value]) => {
    const lighterColors = getColors(COLOR_WHITE, value)
    const darkerColors = getColors(value, COLOR_BLACK)

    const colors = [...lighterColors, value, ...darkerColors.slice(0, -1)]

    // @ts-expect-error - Cannot infer correct types.
    acc[key] = colors

    return acc
  }, {} as CustomThemeColors)

  return { ...themeColors, black: COLOR_BLACK, white: COLOR_WHITE }
}
