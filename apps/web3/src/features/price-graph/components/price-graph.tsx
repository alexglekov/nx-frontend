import { DataTestIDs } from 'shared/constants'
import { useVisibilityChange } from 'shared/hooks/use-visibility-change'
import { Maybe, AssetId } from 'shared/types'
import { ChartType } from 'shared/types/chart'
import { PriceChart } from '../../price-chart'
import { ChartStyle, ResolutionString } from '../../price-chart/tradingview'
import { QUERY_DATA_SIZE } from '../constants'
import { useGraphDataLoader } from '../hooks/use-graph-data-loader'
import { ChartAnnotations } from '../types'
import { DynamicChart } from './dynamic-chart'
import { EmptyGraph } from './empty-graph'
import { GraphWrapper } from './graph-wrapper'
import { PriceGraphHeader } from './price-graph-header'

interface Props {
  assetId: AssetId[] | AssetId
  annotations?: Maybe<ChartAnnotations>
  withHeader?: boolean
  withPadding?: boolean
  isDark?: boolean
  startPrice?: Maybe<number>
  basePrice?: number | null
  chartType?: ChartType
  resolution?: ResolutionString
  chartLineType?: ChartStyle
  assetNameDataTestID?: DataTestIDs | ''
  priceAmountDataTestID?: DataTestIDs | ''
  setChartType?: (charType: ChartType) => void
}
export const PriceGraph: React.FC<Props> = ({
  assetId,
  startPrice,
  annotations = null,
  withHeader = false,
  withPadding = true,
  isDark = false,
  basePrice = null,
  resolution,
  chartLineType,
  chartType = 'gamified',
  assetNameDataTestID = '',
  priceAmountDataTestID = '',
  setChartType
}) => {
  const mainAssetId = Array.isArray(assetId) ? assetId[0] : assetId

  const { loading, chartData } = useGraphDataLoader(
    QUERY_DATA_SIZE,
    mainAssetId
  )

  const isAppVisible = useVisibilityChange()

  // TODO: add chart type switcher
  // const [chartType, setChartType] = useState<ChartType>('baseline')

  if (loading || !chartData || (chartType === 'gamified' && !isAppVisible)) {
    return (
      <GraphWrapper
        withPadding={withPadding}
        isDark={isDark}
      >
        <EmptyGraph loading={loading} />
      </GraphWrapper>
    )
  }

  return (
    <GraphWrapper
      withPadding={withPadding}
      isDark={isDark}
    >
      {withHeader ?
        <PriceGraphHeader
          startPrice={startPrice}
          assetNameDataTestID={assetNameDataTestID}
          priceAmountDataTestID={priceAmountDataTestID}
          setChartType={setChartType}
          chartType={chartType}
        />
      : null}

      {chartType === 'gamified' ?
        <DynamicChart
          chartData={chartData}
          annotations={annotations}
          basePrice={basePrice}
        />
      : <PriceChart
          annotations={annotations}
          assetId={assetId}
          resolution={resolution}
          chartLineType={chartLineType}
        />
      }
    </GraphWrapper>
  )
}
