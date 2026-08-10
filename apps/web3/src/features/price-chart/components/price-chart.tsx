import { useRef } from 'react'
import { AssetId, Maybe } from 'shared/types'
import { ChartAnnotations } from '../../price-graph/types'
import { useChartAnnotations } from '../hooks/use-chart-annotations'
import { useChartInit } from '../hooks/use-chart-init'
import { useChartRaceMachine } from '../hooks/use-chart-race-machine'
import { ChartStyle, ResolutionString } from '../tradingview'
import styles from './styles.module.scss'

interface Props {
  annotations?: Maybe<ChartAnnotations>
  assetId: AssetId[] | AssetId
  resolution?: ResolutionString
  chartLineType?: ChartStyle
}

const PriceChart: React.FC<Props> = ({
  annotations,
  assetId,
  resolution,
  chartLineType
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const mainAssetId = Array.isArray(assetId) ? assetId[0] : assetId

  const assets = Array.isArray(assetId) ? assetId : null

  const mode = Array.isArray(assetId) ? 'race' : 'default'

  const { chartInstanceRef } = useChartInit(
    chartContainerRef,
    mainAssetId,
    mode,
    resolution,
    chartLineType
  )
  useChartAnnotations(chartInstanceRef, annotations)

  useChartRaceMachine(chartInstanceRef, assets)

  return (
    <div
      ref={chartContainerRef}
      className={styles.chart}
    />
  )
}

export default PriceChart
