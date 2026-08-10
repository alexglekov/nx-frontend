import { useReactiveVar } from '@apollo/client'
import PriceGraph from 'features/price-graph'
import { PriceGraphStub } from 'features/price-graph/components/price-graph-stub'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { AssetId } from 'shared/types'
import { oneVsOneChartTypeVar } from '../store/game-chart-type-store'

export const GameCreateDialogPriceGraph = () => {
  const selectedAsset = useReactiveVar(selectedAssetVar)
  const assetId = selectedAsset?.id ?? null

  const currentChartType = useReactiveVar(oneVsOneChartTypeVar)

  return (
    <>
      {assetId ?
        <PriceGraph
          assetId={assetId as AssetId}
          chartType={currentChartType}
          withHeader
          setChartType={() =>
            oneVsOneChartTypeVar(
              currentChartType === 'gamified' ? 'tradingview' : 'gamified'
            )
          }
        />
      : <PriceGraphStub />}
    </>
  )
}
