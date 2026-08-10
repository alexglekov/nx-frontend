import { useRef } from 'react'
import { useStaticChartInit } from '../hooks/use-static-chart-init'
import { MultiChartData } from '../types'
import styles from '../price-graph.module.scss'

interface Props {
  chartData: MultiChartData
  isPercentScale?: boolean
  height?: number
  isScalingEnabled?: boolean
}
export const StaticChart: React.FC<Props> = ({
  chartData,
  isPercentScale = false,
  height,
  isScalingEnabled = true
}) => {
  /** to create and define width and height of the chart */
  const chartContainerRef = useRef<HTMLDivElement | null>(null)

  useStaticChartInit(
    chartData,
    chartContainerRef,
    isPercentScale,
    height,
    isScalingEnabled
  )

  return (
    <div
      ref={chartContainerRef}
      className={styles.chart}
    />
  )
}
