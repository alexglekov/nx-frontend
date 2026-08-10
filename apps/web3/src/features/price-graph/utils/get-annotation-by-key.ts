import { SeriesMarkerShape } from 'lightweight-charts'
import {
  COLOR_GREEN_DARK,
  COLOR_BLUE_LIGHT,
  COLOR_PINK_DARK,
  COLOR_YELLOW
} from 'shared/constants'
import { AnnotationLabel, AnnotationType } from '../types'

export function getAnnotationColorByKey(key: AnnotationType) {
  const colors: Record<AnnotationType, string> = {
    entryPoint: COLOR_BLUE_LIGHT,
    takeProfit: COLOR_GREEN_DARK,
    stopLoss: COLOR_PINK_DARK,
    bullsEyePredict: COLOR_YELLOW,
    upDownPredict: COLOR_BLUE_LIGHT,
    ownPredict: COLOR_GREEN_DARK,
    opponentPredict: COLOR_PINK_DARK,
    '▶️ start game': COLOR_BLUE_LIGHT,
    '⏹️ end game': COLOR_PINK_DARK,
    '⏸️ stop predicts': COLOR_YELLOW,
    oneVsOneStart: COLOR_BLUE_LIGHT,
    oneVsOneEnd: COLOR_PINK_DARK,
    oneVsOneEndVertical: COLOR_PINK_DARK
  }

  return colors?.[key] || 'white'
}

export function getAnnotationNameByKey(key: AnnotationType) {
  const colors: Record<AnnotationType, AnnotationLabel> = {
    entryPoint: 'EP',
    stopLoss: 'SL',
    takeProfit: 'TP',
    bullsEyePredict: '🎯',
    upDownPredict: '↕️',
    ownPredict: '🎯 OWN',
    opponentPredict: '🎯 OPPONENT',
    '▶️ start game': '▶️',
    '⏹️ end game': '⏹️',
    '⏸️ stop predicts': '⏸️',
    oneVsOneStart: '▶️',
    oneVsOneEnd: '⏹️',
    oneVsOneEndVertical: '⏹️'
  }

  return colors?.[key] || 'unknown'
}

export function getMarkerShapeByKey(
  key: string
): import('lightweight-charts').SeriesMarkerShape {
  const shapes: Record<string, SeriesMarkerShape> = {
    start: 'circle',
    stop: 'square'
  }

  return shapes?.[key] || 'arrowUp'
}
