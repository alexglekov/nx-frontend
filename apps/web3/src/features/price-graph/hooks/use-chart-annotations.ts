import { MutableRefObject, useEffect, useRef } from 'react'
import {
  AreaData,
  IChartApi,
  IPriceLine,
  ISeriesApi,
  Time
} from 'lightweight-charts'
import { COLOR_GRAY, COLOR_GRAY_70, MS_IN_SEC } from 'shared/constants'
import { Maybe } from 'shared/types'
import { VertLine } from '../components/vertical-line.class'
import {
  ABSOLUTE_THRESHOLD,
  DEFAULT_TIME,
  RELATIVE_THRESHOLD,
  TIME_OFFSET
} from '../constants'
import { ChartAnnotations } from '../types'
import {
  getAnnotationColorByKey,
  getAnnotationNameByKey
} from '../utils/get-annotation-by-key'

export const useChartAnnotations = (
  chartInstanceRef: MutableRefObject<IChartApi | null>,
  seriesInstanceRef: MutableRefObject<ISeriesApi<
    'Area' | 'Baseline',
    Time
  > | null>,
  chartAnnotations: Maybe<ChartAnnotations>
) => {
  const currentPriceLinesRef = useRef<Maybe<IPriceLine[]>>([])
  const verticalLinesRef = useRef<Maybe<VertLine[]>>([])

  const clearHorizontalAnnotations = () => {
    // NOTE: cleaning of the previous horizontal annotations
    const currentPriceLines = currentPriceLinesRef?.current
    if (currentPriceLines?.length) {
      currentPriceLines?.forEach(priceLine => {
        seriesInstanceRef.current?.removePriceLine(priceLine)
      })
      currentPriceLinesRef.current = []
    }
  }

  const clearVerticalAnnotations = () => {
    // NOTE: cleaning of the previous vertical annotations
    const verticalLines = verticalLinesRef?.current
    if (verticalLines?.length) {
      verticalLines?.forEach(vLine => {
        seriesInstanceRef.current?.detachPrimitive(vLine)
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
    if (!seriesInstanceRef?.current || !chartAnnotations?.horizontal?.length)
      return

    clearHorizontalAnnotations()

    const { horizontal } = chartAnnotations

    horizontal.forEach(({ name: key, value: price }) => {
      if (!key || price == null) return

      const priceLine = seriesInstanceRef.current?.createPriceLine({
        price: Number(price),
        color: getAnnotationColorByKey(key),
        title: getAnnotationNameByKey(key),
        lineStyle: 2
      })

      priceLine && currentPriceLinesRef?.current?.push(priceLine)
    })
  }, [chartAnnotations?.horizontal, seriesInstanceRef])

  // NOTE: Adding new vertical annotations
  useEffect(() => {
    if (
      !chartInstanceRef?.current ||
      !seriesInstanceRef?.current ||
      !chartAnnotations?.vertical?.length
    )
      return

    clearVerticalAnnotations()

    const { vertical } = chartAnnotations
    const seriesInstance = seriesInstanceRef.current
    const seriesData = seriesInstance.data()

    // eslint-disable-next-line complexity,max-statements
    vertical.forEach(({ name, value, timestamp }) => {
      if (!chartInstanceRef?.current) return

      let time = seriesInstance?.data().at(-1)?.time || DEFAULT_TIME
      if (value !== 0 && timestamp && timestamp !== 0) {
        const timestampInSec = timestamp / MS_IN_SEC
        const timestampWithOffset = timestampInSec - TIME_OFFSET

        for (let i = seriesData.length - 1; i >= 0; i--) {
          const item = seriesData[i] as AreaData

          if (item.time > (timestampInSec as Time)) {
            continue
          }

          if (item.time < (timestampWithOffset as Time)) {
            time = DEFAULT_TIME

            break
          }

          const relativeDeviation =
            Math.abs(item.value - value) / Math.abs(value)

          const absoluteDeviation = Math.abs(item.value - value)

          if (
            relativeDeviation < RELATIVE_THRESHOLD ||
            absoluteDeviation < ABSOLUTE_THRESHOLD
          ) {
            time = item.time

            break
          }
        }
      }

      const verticalAnnotation = new VertLine(
        chartInstanceRef.current,
        seriesInstance,
        time,
        {
          showLabel: true,
          labelText: name,
          width: 1,
          color: COLOR_GRAY,
          labelBackgroundColor: COLOR_GRAY_70
        }
      )
      seriesInstanceRef.current?.attachPrimitive(verticalAnnotation)
      verticalLinesRef.current?.push(verticalAnnotation)
    })
  }, [chartAnnotations?.vertical, chartInstanceRef, seriesInstanceRef])
}
