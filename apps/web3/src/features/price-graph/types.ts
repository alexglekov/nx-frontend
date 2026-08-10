import { SingleValueData, UTCTimestamp } from 'lightweight-charts'
import { Milliseconds } from 'shared/types'

export type ChartType = 'baseline' | 'candlestick'
export type ChartPoint = SingleValueData<UTCTimestamp>

export interface SeriesData {
  color: 'green' | 'pink' | 'blue'
  data: ChartPoint[]
}

export interface MultiChartData {
  [seriesId: string]: SeriesData
}

export type RAFCallback = (timeProps: TimeProps) => void
export interface TimeProps {
  timestamp: Milliseconds
  delta: Milliseconds
}

export type AnnotationType =
  | 'entryPoint'
  | 'stopLoss'
  | 'takeProfit'
  | 'bullsEyePredict'
  | 'upDownPredict'
  | 'ownPredict'
  | 'opponentPredict'
  | '▶️ start game'
  | '⏹️ end game'
  | '⏸️ stop predicts'
  | 'oneVsOneStart'
  | 'oneVsOneEnd'
  | 'oneVsOneEndVertical'
export type AnnotationLabel =
  | 'EP'
  | 'SL'
  | 'TP'
  | '🎯'
  | '↕️'
  | '▶️'
  | '⏸️'
  | '⏹️'
  | '🎯 OWN'
  | '🎯 OPPONENT'
export type ModeChartAnnotations = {
  name: AnnotationType
  value: number
  timestamp?: number
}

export interface ChartAnnotations {
  horizontal?: ModeChartAnnotations[]
  vertical?: ModeChartAnnotations[]
}
