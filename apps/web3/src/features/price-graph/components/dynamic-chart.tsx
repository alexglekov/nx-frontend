import { useRef } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Maybe } from '__generated__/graphql'
import { ChartData } from 'features/mode-up-down/types'
import { ISeriesApi, Time } from 'lightweight-charts'
import { assetLastPriceVar } from 'shared/store/price-graph-store'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { useAnimationFrame } from '../hooks/use-animation-frame'
import { useChartAnnotations } from '../hooks/use-chart-annotations'
import { useChartBasePrice } from '../hooks/use-chart-base-price'
import { useChartHistoricalData } from '../hooks/use-chart-historical-data'
import { useChartUpdating } from '../hooks/use-chart-updating'
import { useDynamicChartInit } from '../hooks/use-dynamic-chart-init'
import { ChartAnnotations, ChartPoint, RAFCallback } from '../types'
import styles from '../price-graph.module.scss'

interface Props {
  annotations: Maybe<ChartAnnotations>
  chartData: ChartData
  basePrice: number | null
}
// eslint-disable-next-line max-statements
export const DynamicChart: React.FC<Props> = ({
  chartData,
  annotations = null,
  basePrice = null
}) => {
  /** to create and define width and height of the chart */
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  /** to update the chart */
  const seriesInstanceRef = useRef<ISeriesApi<
    'Area' | 'Baseline',
    Time
  > | null>(null)
  /** to interpolate the points coordinates between an penultimate and last points */
  const lastPriceRef = useRef<ChartPoint | null>(null)
  /** to update new animation frames of the chart */
  const updateChartFrameRef = useRef<RAFCallback | null>(null)

  const newPriceSubscr = useReactiveVar(assetLastPriceVar)

  const { chartInstanceRef } = useDynamicChartInit(
    chartData,
    chartContainerRef,
    seriesInstanceRef,
    lastPriceRef,
    isNotNullOrUndef(basePrice)
  )

  useChartUpdating(
    newPriceSubscr,
    seriesInstanceRef,
    lastPriceRef,
    updateChartFrameRef,
    basePrice
  )

  useChartHistoricalData(chartInstanceRef, seriesInstanceRef, chartData.assetId)

  useChartAnnotations(chartInstanceRef, seriesInstanceRef, annotations)

  useChartBasePrice(seriesInstanceRef, basePrice)

  useAnimationFrame(updateChartFrameRef?.current)

  return (
    <div
      ref={chartContainerRef}
      className={styles.chart}
    />
  )
}
