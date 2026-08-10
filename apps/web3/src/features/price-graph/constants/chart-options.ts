import {
  ChartOptions,
  ColorType,
  DeepPartial,
  AreaSeriesPartialOptions,
  LastPriceAnimationMode,
  Time,
  BaselineSeriesPartialOptions
} from 'lightweight-charts'
import {
  COLOR_GRAY,
  COLOR_GRAY_70,
  COLOR_GREEN,
  COLOR_BLUE_LIGHT,
  COLOR_RED,
  COLOR_PINK_LIGHT,
  COLOR_GREEN_LIGHT
} from 'shared/constants'
import { roundPriceWithRelativePrecision } from '../utils/round-price-with-relative-precision'

export const MIN_HEIGHT = 300
export const COLORS = {
  greenStart: COLOR_GREEN,
  redStart: COLOR_RED,
  text: COLOR_GRAY,
  background: 'transparent',
  end: 'transparent'
}

export const TIME_SCALE_OPTIONS: DeepPartial<ChartOptions['timeScale']> = {
  borderVisible: false,
  visible: true,
  rightOffset: 100
}

export const CHART_OPTIONS: DeepPartial<ChartOptions> = {
  layout: {
    background: { type: ColorType.Solid, color: COLORS.background },
    textColor: COLORS.text,
    fontFamily: 'poppins'
  },
  crosshair: {
    mode: 0,
    horzLine: {
      style: 2
    },
    vertLine: {
      style: 2
    }
  },
  grid: {
    vertLines: {
      visible: false
    },
    horzLines: {
      color: COLOR_GRAY_70,
      style: 3
    }
  },
  rightPriceScale: {
    borderVisible: false,
    entireTextOnly: true,
    ticksVisible: false
  },
  timeScale: TIME_SCALE_OPTIONS,
  localization: {
    priceFormatter: roundPriceWithRelativePrecision
  },
  autoSize: true,
  handleScale: true,
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
    horzTouchDrag: false,
    vertTouchDrag: false
  }
}

export const BASELINE_SERIES_OPTIONS: BaselineSeriesPartialOptions = {
  topFillColor1: COLOR_GREEN_LIGHT,
  topFillColor2: COLORS.end,
  topLineColor: COLOR_GREEN_LIGHT,
  bottomLineColor: COLOR_PINK_LIGHT,
  bottomFillColor1: COLORS.end,
  bottomFillColor2: COLOR_PINK_LIGHT,
  baseValue: { type: 'price', price: undefined }
}

export const DYNAMIC_SERIES_OPTIONS: AreaSeriesPartialOptions = {
  baseLineStyle: 1,
  lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  lineType: 0,
  topColor: COLOR_GREEN,
  bottomColor: COLORS.end,
  baseLineColor: COLOR_GRAY,
  priceLineColor: COLOR_GREEN,
  lineColor: COLOR_GREEN,
  priceFormat: {
    minMove: 0.00001
  }
}

export const STATIC_SERIES_OPTIONS = {
  baseLineStyle: 1,
  lineType: 0,
  bottomColor: 'transparent'
}

const STATIC_SERIES_PINK_OPTIONS = {
  ...STATIC_SERIES_OPTIONS,
  topColor: COLOR_PINK_LIGHT,
  baseLineColor: COLOR_PINK_LIGHT,
  lineColor: COLOR_PINK_LIGHT
}

const STATIC_SERIES_GREEN_OPTIONS = {
  ...STATIC_SERIES_OPTIONS,
  topColor: COLOR_GREEN_LIGHT,
  baseLineColor: COLOR_GREEN_LIGHT,
  lineColor: COLOR_GREEN_LIGHT
}

const STATIC_SERIES_BLUE_OPTIONS = {
  ...STATIC_SERIES_OPTIONS,
  topColor: COLOR_BLUE_LIGHT,
  baseLineColor: COLOR_BLUE_LIGHT,
  lineColor: COLOR_BLUE_LIGHT
}

export const STATIC_SERIES_OPTIONS_MAP = {
  pink: STATIC_SERIES_PINK_OPTIONS,
  green: STATIC_SERIES_GREEN_OPTIONS,
  blue: STATIC_SERIES_BLUE_OPTIONS
}

export const STATIC_CHART_OPTIONS = {
  ...CHART_OPTIONS,
  timeScale: TIME_SCALE_OPTIONS
}

export const DEFAULT_TIME = 0 as Time
export const RELATIVE_THRESHOLD = 0.0015 / 100
export const ABSOLUTE_THRESHOLD = 0.01
export const TIME_OFFSET = 3000
