/* eslint-disable max-statements */

import { MutableRefObject, useEffect, useRef } from 'react'
import { ChartAnnotations } from 'features/price-graph/types'
import { COLOR_GRAY } from 'shared/constants'
import { Maybe } from 'shared/types'
import {
  getAnnotationColorByKey,
  getAnnotationNameByKey
} from '../../price-graph/utils/get-annotation-by-key'
import { EntityId, IChartingLibraryWidget } from '../tradingview'
import { VerticalLineConfig } from '../types'
import { setOneVsOneVisibleRange } from '../utils/one-vs-one-visible-range'
import { useChartLines } from './use-chart-lines'

export const useChartAnnotations = (
  chartInstance: MutableRefObject<IChartingLibraryWidget | null>,
  chartAnnotations?: Maybe<ChartAnnotations>
) => {
  const { createPriceLine, createVerticalLine, removeLine } =
    useChartLines(chartInstance)

  const currentPriceLinesRef = useRef<Maybe<EntityId[]>>([])
  const verticalLinesRef = useRef<Maybe<EntityId[]>>([])

  const clearHorizontalAnnotations = () => {
    // NOTE: cleaning of the previous horizontal annotations
    const currentPriceLines = currentPriceLinesRef?.current
    if (currentPriceLines?.length) {
      currentPriceLines?.forEach(priceLine => {
        removeLine(priceLine)
      })

      currentPriceLinesRef.current = []
    }
  }

  const clearVerticalAnnotations = () => {
    // NOTE: cleaning of the previous vertical annotations
    const verticalLines = verticalLinesRef?.current
    if (verticalLines?.length) {
      verticalLines?.forEach(vLine => {
        removeLine(vLine)
      })
      verticalLinesRef.current = []
    }
  }

  useEffect(() => {
    if (chartAnnotations) return

    clearHorizontalAnnotations()
    clearVerticalAnnotations()
  }, [chartAnnotations])

  // NOTE: Adding new horizontal annotations
  useEffect(() => {
    if (!chartInstance?.current || !chartAnnotations?.horizontal?.length) return

    clearHorizontalAnnotations()

    const { horizontal } = chartAnnotations

    horizontal.forEach(({ name: key, value: price }) => {
      if (!key || price == null) return

      const priceLine = createPriceLine({
        price: Number(price),
        color: getAnnotationColorByKey(key),
        text: getAnnotationNameByKey(key),
        lineStyle: 2
      })

      priceLine && currentPriceLinesRef?.current?.push(priceLine)
    })
  }, [chartAnnotations?.horizontal, chartInstance.current])

  // NOTE: Adding new vertical annotations
  useEffect(() => {
    if (!chartInstance?.current || !chartAnnotations?.vertical?.length) return

    clearVerticalAnnotations()

    const { vertical } = chartAnnotations

    const startEndRange = vertical.filter(
      ({ name }) => name === 'oneVsOneEndVertical' || name === 'oneVsOneStart'
    )

    // NOTE: Adding vertical lines for the start and end of the range for 1vs1
    if (startEndRange.length === 2) {
      const [
        { timestamp: startTime, value: firstPredict },
        { timestamp: endTime, value: secondPredict }
      ] = startEndRange

      if (firstPredict && secondPredict) {
        setOneVsOneVisibleRange({
          startTimestamp: startTime,
          endTimestamp: endTime,
          firstPrice: firstPredict,
          secondPrice: secondPredict,
          chartInstance
        })
      }
    }

    vertical.forEach(({ name, timestamp }) => {
      if (!chartInstance?.current || !timestamp) return

      const verticalAnnotation: VerticalLineConfig = {
        text: getAnnotationNameByKey(name),
        lineWidth: 1,
        color: COLOR_GRAY,
        timestamp
      }

      const verticalLineId = createVerticalLine(verticalAnnotation)

      verticalLineId && verticalLinesRef.current?.push(verticalLineId)
    })
  }, [chartAnnotations?.vertical, chartInstance.current])
}
