import { useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { IChartApi, ISeriesApi, Time, createChart } from 'lightweight-charts'
import {
  STATIC_CHART_OPTIONS,
  STATIC_SERIES_OPTIONS,
  STATIC_SERIES_OPTIONS_MAP,
  TIME_SCALE_OPTIONS
} from '../constants'
import { MultiChartData } from '../types'

export const useStaticChartInit = (
  chartData: MultiChartData,
  chartContainerRef: React.MutableRefObject<HTMLDivElement | null>,
  isPercentScale: boolean,
  height = 500,
  isScalingEnabled = true
) => {
  /** to add series, clean the chart or rescale after updating */
  const chartInstanceRef = useRef<IChartApi | null>(null)
  /** to update the chart */
  const seriesInstanceRef = useRef<{
    [key: string]: ISeriesApi<'Area', Time>
  }>({})

  const percentPriceFormatter = (price: number) => {
    return price.toFixed(2) + '%'
  }

  // eslint-disable-next-line max-statements
  useEffect(() => {
    const isPricesNotExist = !chartData || Object.keys(chartData).length === 0
    const isChartAlreadyCreated = chartInstanceRef.current !== null
    const chartContainer = chartContainerRef?.current
    if (isChartAlreadyCreated || !chartContainer || isPricesNotExist) return

    chartInstanceRef.current = createChart(chartContainer, {
      ...STATIC_CHART_OPTIONS,
      height,
      timeScale: {
        ...TIME_SCALE_OPTIONS,
        tickMarkFormatter: (time: number) => format(time * 1000, 'dd MMM'),
        rightOffset: !isScalingEnabled ? 0 : TIME_SCALE_OPTIONS.rightOffset
      },
      localization: {
        priceFormatter: isPercentScale ? percentPriceFormatter : undefined
      },
      handleScale: {
        mouseWheel: isScalingEnabled,
        axisPressedMouseMove: isScalingEnabled,
        pinch: isScalingEnabled
      },
      handleScroll: {
        mouseWheel: isScalingEnabled,
        horzTouchDrag: isScalingEnabled,
        pressedMouseMove: isScalingEnabled,
        vertTouchDrag: isScalingEnabled
      }
    })

    Object.keys(chartData).forEach(seriesId => {
      const { data, color } = chartData[seriesId]
      const series = chartInstanceRef.current?.addAreaSeries(
        STATIC_SERIES_OPTIONS_MAP[color] || STATIC_SERIES_OPTIONS
      )

      if (!series) return

      series.setData(data)
      seriesInstanceRef.current[seriesId] = series
    })

    chartInstanceRef.current.timeScale().fitContent()

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove()
        chartInstanceRef.current = null
      }

      seriesInstanceRef.current = {}
    }
  }, [chartContainerRef, chartData, isPercentScale, isScalingEnabled, height])
}
