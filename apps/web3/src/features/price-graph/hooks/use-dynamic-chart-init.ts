import { useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { ChartData } from 'features/mode-up-down/types'
import { IChartApi, ISeriesApi, Time, createChart } from 'lightweight-charts'
import {
  BASELINE_SERIES_OPTIONS,
  CHART_OPTIONS,
  DYNAMIC_SERIES_OPTIONS,
  TIME_SCALE_OPTIONS
} from '../constants'
import { ChartPoint } from '../types'
import { transformChartPointsToSmoothCurve } from '../utils/transform-chart-data-to-curve'

// TODO: refactor this hook to reduce complexity
// eslint-disable-next-line max-statements
export const useDynamicChartInit = (
  chartData: ChartData,
  chartContainerRef: React.MutableRefObject<HTMLDivElement | null>,
  seriesInstanceRef: React.MutableRefObject<ISeriesApi<
    'Area' | 'Baseline',
    Time
  > | null>,
  lastPriceRef: React.MutableRefObject<ChartPoint | null>,
  withBaseLine = false
) => {
  /** to clean the chart or rescale after updating */
  const chartInstanceRef = useRef<IChartApi | null>(null)

  // eslint-disable-next-line max-statements
  useEffect(() => {
    const isChartAlreadyCreated =
      chartInstanceRef.current !== null && seriesInstanceRef.current !== null
    const chartContainer = chartContainerRef?.current
    const isPriceHistoryExist = chartData && chartData?.prices?.length > 0

    if (isChartAlreadyCreated || !chartContainer || !isPriceHistoryExist) return

    const besierCurveCoords = transformChartPointsToSmoothCurve(
      chartData.prices
    )

    chartInstanceRef.current = createChart(chartContainer, {
      ...CHART_OPTIONS,
      timeScale: {
        ...TIME_SCALE_OPTIONS,
        tickMarkFormatter: (time: number) => format(time * 1000, 'HH:mm:ss')
      }
    })

    if (withBaseLine) {
      seriesInstanceRef.current = chartInstanceRef.current.addBaselineSeries({
        ...BASELINE_SERIES_OPTIONS
      })
    } else {
      seriesInstanceRef.current = chartInstanceRef.current.addAreaSeries(
        DYNAMIC_SERIES_OPTIONS
      )
    }

    chartInstanceRef.current.timeScale().fitContent()

    lastPriceRef.current = besierCurveCoords.at(-1) as ChartPoint // NOTE: save last point (price) as react ref

    seriesInstanceRef?.current?.setData(besierCurveCoords.slice(0, -1)) // NOTE: set data without last element
  }, [chartData, lastPriceRef, chartContainerRef, seriesInstanceRef])

  return {
    chartContainerRef,
    chartInstanceRef,
    seriesInstanceRef
  }
}
